import { Badge } from './Badge'

export function StoryChapterCard({ chapter }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Chapter {chapter.chapter_number}</Badge>
        <span className="text-xs text-[#b8a986]">{chapter.act?.title}</span>
      </div>
      <h3 className="mt-3 text-xl font-black text-[#fff6df]">{chapter.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{chapter.summary}</p>
      <p className="mt-3 text-sm text-[#f7d98b]">{chapter.emotional_climax}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(chapter.moral_choices ?? []).map((choice) => <Badge key={choice}>{choice}</Badge>)}
      </div>
    </article>
  )
}
