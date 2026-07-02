import { Badge } from './Badge'

export function DialogueNodeCard({ node }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{node.emotion}</Badge>
        <span className="text-sm font-semibold text-[#fff6df]">{node.speaker}</span>
        <span className="text-xs text-[#b8a986]">{node.locale_key}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#d9ceb7]">{node.text}</p>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {(node.choices ?? []).map((choice) => (
          <div key={choice.choice_id} className="rounded-md border border-[#d8b765]/15 bg-black/15 p-3 text-sm text-[#d9ceb7]">
            <span className="font-semibold text-[#f7d98b]">{choice.value_axis}: </span>{choice.choice_text}
          </div>
        ))}
      </div>
    </article>
  )
}
