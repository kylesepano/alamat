import { Badge } from './Badge'

export function StoryActCard({ act }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{act.title}</Badge>
        <span className="text-xs text-[#b8a986]">Level {act.recommended_level}</span>
      </div>
      <h3 className="mt-3 text-xl font-black text-[#fff6df]">{act.theme}</h3>
      <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{act.summary}</p>
      <div className="mt-4 grid gap-2 text-xs text-[#b8a986] sm:grid-cols-2">
        <span>Opening: {act.opening_scene}</span>
        <span>Closing: {act.closing_scene}</span>
      </div>
    </article>
  )
}
