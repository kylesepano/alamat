param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$gridSize = 15
$tileSize = 48
$outputSize = $gridSize * $tileSize

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

            for ($row = 0; $row -lt $gridSize; $row++) {
                $sourceY = [int][Math]::Round($row * $image.Height / $gridSize)
                $sourceBottom = [int][Math]::Round(($row + 1) * $image.Height / $gridSize)

                for ($column = 0; $column -lt $gridSize; $column++) {
                    $sourceX = [int][Math]::Round($column * $image.Width / $gridSize)
                    $sourceRight = [int][Math]::Round(($column + 1) * $image.Width / $gridSize)
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

Write-Output "Normalized tileset: $output (${outputSize}x${outputSize}, ${gridSize}x${gridSize} cells, ${tileSize}x${tileSize} per tile)"
