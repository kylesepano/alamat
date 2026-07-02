import { Badge } from './Badge'

export function ProductionJobTable({ rows = [], columns = [] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-black/20 text-xs uppercase tracking-wide text-[#b8a986]">
          <tr>{columns.map((column) => <th key={column.key} className="px-4 py-3">{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.job_id ?? row.report_id ?? row.asset_id ?? row.translation_key ?? index} className="border-t border-[#d8b765]/10 text-[#d9ceb7]">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3">
                  {column.badge ? <Badge>{row[column.key] ?? 'none'}</Badge> : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
