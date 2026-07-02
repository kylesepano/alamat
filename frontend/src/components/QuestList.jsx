import { QuestCard } from './QuestCard'

export function QuestList({ quests }) {
  if (!quests.length) return <p className="text-[#f7d98b]">No quests match these filters.</p>
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{quests.map((quest) => <QuestCard key={quest.quest_id} quest={quest} />)}</div>
}
