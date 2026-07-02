import { DataCard } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function WorldPage({ foundation }) {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="World"
        title={foundation.world.name}
        description={foundation.world.summary}
      />
      <section>
        <h2 className="mb-4 text-2xl font-black text-[#fff6df]">Great Regions</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {foundation.world.regions.map((region) => (
            <DataCard key={region.slug} title={region.name}>
              <p>{region.description}</p>
            </DataCard>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-black text-[#fff6df]">Three Realms</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {foundation.realms.map((realm) => (
            <DataCard key={realm.slug} title={realm.name} eyebrow={realm.type}>
              <p>{realm.description}</p>
            </DataCard>
          ))}
        </div>
      </section>
      <DataCard title="Present Conflict" eyebrow="Story Frame">
        <p>{foundation.world.present_conflict}</p>
      </DataCard>
    </div>
  )
}
