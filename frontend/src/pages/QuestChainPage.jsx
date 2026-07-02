import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { QuestList } from '../components/QuestList'
import { useQuestChain, useQuestChains } from '../hooks/useQuests'

export function QuestChainsPage() {
  const chains = useQuestChains()
  return (
    <div className="space-y-8">
      <PageHeader kicker="Phase H" title="Quest Chains" description="Progression arcs connecting story, trust, faction, legendary, and companion quest templates." />
      <div className="grid gap-4 md:grid-cols-2">
        {chains.map((chain) => (
          <Link key={chain.chain_id} to={`/quests/chains/${chain.slug}`} className="rounded border border-[#5f4528] bg-[#1a120b] p-5 transition hover:border-[#f7d98b]">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{chain.chain_id}</p>
            <h2 className="mt-1 text-xl font-semibold text-[#fff5d6]">{chain.name}</h2>
            <p className="mt-3 text-sm text-[#d8c7a3]">{chain.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function QuestChainPage() {
  const { chainId } = useParams()
  const payload = useQuestChain(chainId)
  const chain = payload?.chain
  const quests = payload?.quests ?? []

  if (!payload) return <p className="text-[#f7d98b]">Loading quest chain...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={chain?.chain_id} title={chain?.name} description={chain?.description} />
      <QuestList quests={quests} />
    </div>
  )
}
