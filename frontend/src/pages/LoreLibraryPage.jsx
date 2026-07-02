import { Badge } from '../components/Badge'
import { PageHeader } from '../components/PageHeader'
import { useStoryLore } from '../hooks/useStory'

export function LoreLibraryPage() {
  const { data: lore } = useStoryLore()
  const books = lore.books ?? []
  const tales = lore.folk_tales ?? []
  const songs = lore.songs ?? []
  const poems = lore.poems ?? []

  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase K" title="Lore Library" description="Optional story collectibles, folk tales, songs, poems, field notes, and records that enrich the world without blocking progression." />
      <section className="grid gap-4 lg:grid-cols-2">
        {books.slice(0, 16).map((book) => (
          <article key={book.lore_book_id} className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5">
            <Badge>{book.collectible_type}</Badge>
            <h3 className="mt-3 text-lg font-black text-[#fff6df]">{book.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{book.excerpt}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <MiniList title="Folk Tales" rows={tales} field="title" />
        <MiniList title="Songs" rows={songs} field="title" />
        <MiniList title="Poems" rows={poems} field="title" />
      </section>
    </div>
  )
}

function MiniList({ title, rows, field }) {
  return <div className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/80 p-5"><h2 className="text-lg font-black text-[#fff6df]">{title}</h2><div className="mt-3 space-y-2">{rows.slice(0, 8).map((row, index) => <p key={`${title}-${index}`} className="text-sm text-[#d9ceb7]">{row[field]}</p>)}</div></div>
}
