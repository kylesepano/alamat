export function QuestPanel({ quests = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Quest Hooks</h2>
      {quests.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {quests.map((quest) => (
            <div key={quest.npc_quest_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
              <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{quest.quest_role} · {quest.quest_type}</p>
              <p className="mt-1 font-semibold text-[#fff5d6]">{quest.quest_id}</p>
            </div>
          ))}
        </div>
      ) : <p className="text-[#d8c7a3]">No quest hooks assigned.</p>}
    </section>
  )
}
