import { Badge } from '../components/Badge'
import { DataCard, Tags } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function GameBiblePage({ foundation }) {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Game Bible"
        title="Phase A Foundation"
        description="A compact reference for the universe, data categories, and future-facing rules established in this first phase."
      />
      <section className="grid gap-5 lg:grid-cols-2">
        <DataCard title="Project Identity" eyebrow={foundation.meta.genre}>
          <p>{foundation.meta.scope_note}</p>
          <div className="flex flex-wrap gap-2">
            {foundation.themes.map((theme) => <Badge key={theme.slug}>{theme.name}</Badge>)}
          </div>
        </DataCard>
        <DataCard title="Growth System" eyebrow="Ranks and Awakening">
          <p>{foundation.growth_system.principle}</p>
          <div>
            <p className="mb-2 font-bold text-[#f7d98b]">Growth ranks</p>
            <Tags items={foundation.growth_system.growth_ranks.map((rank) => rank.rank)} />
          </div>
          <div>
            <p className="mb-2 font-bold text-[#f7d98b]">Awakening stars</p>
            <Tags items={foundation.growth_system.awakening_levels.map((level) => `${level.stars} Star`)} />
          </div>
        </DataCard>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-black text-[#fff6df]">Initial Combat Classes</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {foundation.combat_classes.map((combatClass) => (
            <DataCard key={combatClass.slug} title={combatClass.name} eyebrow={combatClass.battle_role} footer={<Tags items={combatClass.stat_focus} />}>
              <p>{combatClass.description}</p>
            </DataCard>
          ))}
        </div>
      </section>
    </div>
  )
}
