import { Badge } from '../components/Badge'
import { PageHeader } from '../components/PageHeader'
import { useStoryMythology } from '../hooks/useStory'

export function MythologyEncyclopediaPage() {
  const { data: entries } = useStoryMythology()
  return (
    <div className="space-y-5">
      <PageHeader kicker="Phase K" title="Mythology Encyclopedia" description="Fictional ALAMAT mythology rules for creation stories, realms, sacred places, Nilalang origins, settlements, and balance." />
      <section className="grid gap-4 lg:grid-cols-2">
        {entries.map((entry) => (
          <article key={entry.mythology_id} className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
            <Badge>{entry.narrative_use}</Badge>
            <h3 className="mt-3 text-xl font-black text-[#fff6df]">{entry.topic}</h3>
            <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{entry.summary}</p>
            <ul className="mt-4 space-y-2 text-xs text-[#b8a986]">
              {(entry.rules ?? []).map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}
