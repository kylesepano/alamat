import { Badge } from './Badge'

export function DataCard({ title, eyebrow, children, footer, color }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#222819]/90 p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#c7a563]">{eyebrow}</p> : null}
          <h3 className="text-xl font-bold text-[#fff6df]">{title}</h3>
        </div>
        {color ? <span className="h-4 w-4 rounded-full border border-white/40" style={{ background: color }} /> : null}
      </div>
      <div className="space-y-3 text-sm leading-6 text-[#d9ceb7]">{children}</div>
      {footer ? <div className="mt-4 flex flex-wrap gap-2">{footer}</div> : null}
    </article>
  )
}

export function Tags({ items = [] }) {
  return items.map((item) => <Badge key={item}>{item}</Badge>)
}
