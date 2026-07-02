import { DataCard, Tags } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function NilalangOrdersPage({ foundation }) {
  return (
    <div>
      <PageHeader
        kicker="Nilalang"
        title="Six Orders"
        description="Nilalang are guardians, spirits, cursed humans, beasts, ancestors, tricksters, and divine beings. They are allies whose bonds are earned through trust."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {foundation.nilalang_orders.map((order) => (
          <DataCard key={order.slug} title={order.name} eyebrow="Order" footer={<Tags items={order.examples} />}>
            <p>{order.description}</p>
            <p>
              <span className="font-bold text-[#f7d98b]">Gameplay role:</span> {order.gameplay_role}
            </p>
          </DataCard>
        ))}
      </div>
    </div>
  )
}
