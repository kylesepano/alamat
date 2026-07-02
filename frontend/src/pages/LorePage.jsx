import { DataCard } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function LorePage({ foundation }) {
  return (
    <div>
      <PageHeader
        kicker="Lore"
        title="Five Ages of ALAMAT"
        description="Kapuluan's history moves from first covenants to fractured memory and the Present Age, where the player helps repair broken bonds."
      />
      <div className="grid gap-5">
        {foundation.ages.map((age, index) => (
          <DataCard key={age.slug} title={age.title} eyebrow={`Age ${index + 1}`}>
            <p className="font-semibold text-[#f0dfbd]">{age.short_description}</p>
            <p>{age.long_description}</p>
          </DataCard>
        ))}
      </div>
    </div>
  )
}
