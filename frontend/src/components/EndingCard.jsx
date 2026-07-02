import { Badge } from './Badge'

export function EndingCard({ ending }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
      <div className="flex flex-wrap gap-2"><Badge>{ending.ending_type}</Badge>{ending.is_canonical_optional ? <Badge>Optional Canon</Badge> : null}</div>
      <h3 className="mt-3 text-xl font-black text-[#fff6df]">{ending.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{ending.summary}</p>
      <div className="mt-4 space-y-2">
        {(ending.epilogues ?? []).map((epilogue) => (
          <p key={epilogue.epilogue_id} className="rounded-md bg-black/15 p-3 text-xs text-[#b8a986]">{epilogue.title}</p>
        ))}
      </div>
    </article>
  )
}
