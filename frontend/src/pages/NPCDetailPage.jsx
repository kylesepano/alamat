import { useParams } from 'react-router-dom'
import { CategoryBadge } from '../components/CategoryBadge'
import { DialogueViewer } from '../components/DialogueViewer'
import { FactionBadge } from '../components/FactionBadge'
import { NPCPortrait } from '../components/NPCPortrait'
import { QuestPanel } from '../components/QuestPanel'
import { RelationshipMeter } from '../components/RelationshipMeter'
import { ScheduleTimeline } from '../components/ScheduleTimeline'
import { ShopPanel } from '../components/ShopPanel'
import { TrainerPanel } from '../components/TrainerPanel'
import { VoiceProfile } from '../components/VoiceProfile'
import { PageHeader } from '../components/PageHeader'
import { useNPC } from '../hooks/useNPCs'

export function NPCDetailPage() {
  const { npcId } = useParams()
  const npc = useNPC(npcId)

  if (!npc) return <p className="text-[#f7d98b]">Loading NPC...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={npc.npc_id} title={npc.full_name} description={npc.title ?? npc.role?.name} />
      <section className="flex flex-col gap-4 rounded border border-[#5f4528] bg-[#160f09] p-5 md:flex-row">
        <NPCPortrait npc={npc} />
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category={npc.category} />
            <FactionBadge faction={npc.faction} />
            {npc.recruitable ? <span className="rounded border border-[#7a5b2f]/50 bg-[#21170d] px-2 py-1 text-xs text-[#f7d98b]">companion</span> : null}
          </div>
          <p className="text-[#d8c7a3]">{npc.biography}</p>
          <p className="text-sm text-[#b8a986]">{npc.origin?.hometown}, {npc.origin?.province}, {npc.origin?.region} · {npc.origin?.language}</p>
        </div>
      </section>
      <RelationshipMeter npc={npc} />
      <ScheduleTimeline schedule={npc.schedule} />
      <DialogueViewer dialogue={npc.dialogue} />
      <ShopPanel shop={npc.shop} />
      <TrainerPanel training={npc.training} />
      <QuestPanel quests={npc.quests} />
      <VoiceProfile voice={npc.voice_profile} />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#fff5d6]">Asset Prompts</h2>
        <pre className="whitespace-pre-wrap rounded border border-[#5f4528] bg-[#110b07] p-4 text-sm text-[#d8c7a3]">{npc.asset_prompts?.portrait_prompt}</pre>
      </section>
    </div>
  )
}
