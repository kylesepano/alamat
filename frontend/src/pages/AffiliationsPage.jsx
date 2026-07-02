import { DataCard } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function AffiliationsPage({ foundation }) {
  return (
    <div>
      <PageHeader
        kicker="Affiliations"
        title="Elemental, Cultural, and Spiritual Tags"
        description="Affiliations describe where a Nilalang draws identity, power, story logic, and visual language. They are not a full combat system yet."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foundation.affiliations.map((affiliation) => (
          <DataCard
            key={affiliation.slug}
            title={affiliation.name}
            eyebrow={affiliation.theme}
            color={affiliation.color_hint}
          >
            <p>{affiliation.description}</p>
            <p className="text-xs uppercase tracking-wide text-[#b8a986]">Icon hint: {affiliation.icon_hint}</p>
          </DataCard>
        ))}
      </div>
    </div>
  )
}
