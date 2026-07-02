export function QuestRewardPanel({ rewards = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Rewards</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {rewards.map((reward) => (
          <div key={reward.reward_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{reward.reward_type.replaceAll('_', ' ')}</p>
            <p className="mt-1 text-sm text-[#d8c7a3]">Qty {reward.quantity ?? 1} · Gold {reward.gold ?? 0} · EXP {reward.experience ?? 0}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
