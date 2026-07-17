param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [ValidateSet('Auto', '15', '16')]
    [string]$GridSize = 'Auto'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$tileSize = 48

$source = [System.IO.Path]::GetFullPath($SourcePath)
$output = [System.IO.Path]::GetFullPath($OutputPath)

if (-not (Test-Path -LiteralPath $source)) {
    throw "Tileset source not found: $source"
}

$image = [System.Drawing.Image]::FromFile($source)
try {
    if ($image.Width -ne 1254 -or $image.Height -ne 1254) {
        throw "Expected a 1254x1254 source image, received $($image.Width)x$($image.Height)."
    }

    $selectedGridSize = if ($GridSize -eq 'Auto') {
        function Get-BoundaryScore([System.Drawing.Bitmap]$Bitmap, [int]$Candidate, [int]$Offset) {
            $difference = 0.0
            $samples = 0
            $sampleStep = 4

            for ($index = 1; $index -lt $Candidate; $index++) {
                $boundaryX = [Math]::Max(1, [Math]::Min($Bitmap.Width - 1, [int][Math]::Round($index * $Bitmap.Width / $Candidate) + $Offset))
                for ($y = 0; $y -lt $Bitmap.Height; $y += $sampleStep) {
                    $left = $Bitmap.GetPixel($boundaryX - 1, $y)
                    $right = $Bitmap.GetPixel($boundaryX, $y)
                    $difference += [Math]::Abs($left.R - $right.R) + [Math]::Abs($left.G - $right.G) + [Math]::Abs($left.B - $right.B)
                    $samples += 3
                }

                $boundaryY = [Math]::Max(1, [Math]::Min($Bitmap.Height - 1, [int][Math]::Round($index * $Bitmap.Height / $Candidate) + $Offset))
                for ($x = 0; $x -lt $Bitmap.Width; $x += $sampleStep) {
                    $above = $Bitmap.GetPixel($x, $boundaryY - 1)
                    $below = $Bitmap.GetPixel($x, $boundaryY)
                    $difference += [Math]::Abs($above.R - $below.R) + [Math]::Abs($above.G - $below.G) + [Math]::Abs($above.B - $below.B)
                    $samples += 3
                }
            }

            return $difference / [Math]::Max(1, $samples)
        }

        function Get-GridConfidence([System.Drawing.Bitmap]$Bitmap, [int]$Candidate) {
            $boundary = Get-BoundaryScore $Bitmap $Candidate 0
            $nearby = ((Get-BoundaryScore $Bitmap $Candidate -4) +
                (Get-BoundaryScore $Bitmap $Candidate -2) +
                (Get-BoundaryScore $Bitmap $Candidate 2) +
                (Get-BoundaryScore $Bitmap $Candidate 4)) / 4
            return $boundary / [Math]::Max(0.001, $nearby)
        }

        $bitmap = [System.Drawing.Bitmap]$image
        $score15 = Get-GridConfidence $bitmap 15
        $score16 = Get-GridConfidence $bitmap 16
        $winner = if ($score15 -gt $score16) { 15 } else { 16 }
        $winnerScore = [Math]::Max($score15, $score16)
        $separation = [Math]::Abs($score15 - $score16) / [Math]::Max(0.001, $winnerScore)

        if ($winnerScore -lt 0.98 -or $separation -lt 0.02) {
            throw ('Grid detection is ambiguous (15x15 score {0:N4}, 16x16 score {1:N4}). Re-run with -GridSize 15 or -GridSize 16.' -f $score15, $score16)
        }

        Write-Host ('Detected {0}x{0} source grid (15x15 score {1:N4}, 16x16 score {2:N4}).' -f $winner, $score15, $score16)
        $winner
    }
    else {
        [int]$GridSize
    }

    $outputSize = $selectedGridSize * $tileSize

    $directory = [System.IO.Path]::GetDirectoryName($output)
    if (-not (Test-Path -LiteralPath $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    $normalized = New-Object System.Drawing.Bitmap $outputSize, $outputSize
    try {
        $graphics = [System.Drawing.Graphics]::FromImage($normalized)
        try {
            $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

            for ($row = 0; $row -lt $selectedGridSize; $row++) {
                $sourceY = [int][Math]::Round($row * $image.Height / $selectedGridSize)
                $sourceBottom = [int][Math]::Round(($row + 1) * $image.Height / $selectedGridSize)

                for ($column = 0; $column -lt $selectedGridSize; $column++) {
                    $sourceX = [int][Math]::Round($column * $image.Width / $selectedGridSize)
                    $sourceRight = [int][Math]::Round(($column + 1) * $image.Width / $selectedGridSize)
                    $sourceRect = New-Object System.Drawing.Rectangle `
                        $sourceX, $sourceY, ($sourceRight - $sourceX), ($sourceBottom - $sourceY)
                    $destinationRect = New-Object System.Drawing.Rectangle `
                        ($column * $tileSize), ($row * $tileSize), $tileSize, $tileSize

                    $graphics.DrawImage($image, $destinationRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
                }
            }
        }
        finally {
            $graphics.Dispose()
        }

        $normalized.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $normalized.Dispose()
    }
}
finally {
    $image.Dispose()
}

$check = [System.Drawing.Image]::FromFile($output)
try {
    if ($check.Width -ne $outputSize -or $check.Height -ne $outputSize) {
        throw "Normalization failed: output is $($check.Width)x$($check.Height)."
    }
}
finally {
    $check.Dispose()
}

Write-Output "Normalized tileset: $output (${outputSize}x${outputSize}, ${selectedGridSize}x${selectedGridSize} cells, ${tileSize}x${tileSize} per tile)"
