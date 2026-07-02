import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { QuestBranchPreview } from '../components/QuestBranchPreview'
import { QuestDetailPanel } from '../components/QuestDetailPanel'
import { QuestMarker } from '../components/QuestMarker'
import { QuestRequirementPanel } from '../components/QuestRequirementPanel'
import { QuestRewardPanel } from '../components/QuestRewardPanel'
import { QuestStepTimeline } from '../components/QuestStepTimeline'
import { useQuest } from '../hooks/useQuests'

export function QuestDetailPage() {
  const { slug } = useParams()
  const quest = useQuest(slug)

  if (!quest) return <p className="text-[#f7d98b]">Loading quest...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={quest.quest_id} title={quest.title} description={quest.quest_type.replaceAll('_', ' ')} />
      <QuestDetailPanel quest={quest} />
      <QuestStepTimeline steps={quest.steps} />
      <QuestRequirementPanel requirements={quest.requirements} />
      <QuestRewardPanel rewards={quest.rewards} />
      <QuestBranchPreview branches={quest.branches} />
      <QuestMarker markers={quest.markers} />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#fff5d6]">Asset Prompt</h2>
        <pre className="whitespace-pre-wrap rounded border border-[#5f4528] bg-[#110b07] p-4 text-sm text-[#d8c7a3]">{quest.asset_prompts?.asset_prompt ?? quest.assets?.asset_prompt}</pre>
      </section>
    </div>
  )
}
