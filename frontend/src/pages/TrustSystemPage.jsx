import { DataCard } from '../components/DataCard'
import { PageHeader } from '../components/PageHeader'

export function TrustSystemPage({ foundation }) {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Trust System"
        title="Bond Through Trust"
        description={foundation.meta.recruitment_principle}
      />
      <section className="grid gap-5 md:grid-cols-2">
        {foundation.trust_methods.map((method) => (
          <DataCard key={method.slug} title={method.name} eyebrow="Trust Method">
            <p>{method.description}</p>
            <p>
              <span className="font-bold text-[#f7d98b]">Example:</span> {method.example_use_case}
            </p>
          </DataCard>
        ))}
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-black text-[#fff6df]">Growth Without Evolution</h2>
        <DataCard title="Growth Principle" eyebrow="Identity Preserved">
          <p>{foundation.growth_system.principle}</p>
        </DataCard>
      </section>
    </div>
  )
}
