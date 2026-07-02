import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { DataCard } from '../components/DataCard'

export function HomePage({ foundation }) {
  const stats = [
    ['Realms', foundation.realms.length],
    ['Ages', foundation.ages.length],
    ['Nilalang Orders', foundation.nilalang_orders.length],
    ['Affiliations', foundation.affiliations.length],
  ]

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge>{foundation.meta.phase}</Badge>
          <h1 className="mt-5 text-5xl font-black leading-tight text-[#fff6df] sm:text-7xl">ALAMAT</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#e3d5ba]">
            A story-rich Filipino mythology-inspired Nilalang collector RPG where players earn trust and restore balance between humanity and the Spirit Realm.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-md bg-[#d8b765] px-5 py-3 font-bold text-[#171b16]" to="/game-bible">
              Open Game Bible
            </Link>
            <Link className="rounded-md border border-[#d8b765]/40 px-5 py-3 font-bold text-[#f7d98b]" to="/nilalang-orders">
              View Orders
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-[#d8b765]/25 bg-[#222819]/80 p-6 shadow-2xl shadow-black/30">
          <div className="aspect-[4/3] rounded-md border border-[#d8b765]/20 bg-[linear-gradient(135deg,#2f7d46,#176b87_45%,#7a2435)] p-6">
            <div className="flex h-full flex-col justify-between rounded-md border border-white/20 bg-black/20 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-[#ffe6a3]">Kapuluan</p>
              <p className="max-w-sm text-2xl font-black text-white">Islands where mortal roads bend toward spirit paths.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#d8b765]/20 bg-[#1c2118] p-5">
            <p className="text-3xl font-black text-[#f7d98b]">{value}</p>
            <p className="mt-1 text-sm uppercase tracking-wide text-[#b8a986]">{label}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        {foundation.realms.map((realm) => (
          <DataCard key={realm.slug} title={realm.name} eyebrow={realm.type}>
            <p>{realm.description}</p>
          </DataCard>
        ))}
      </section>
    </div>
  )
}
