export function EquipmentUpgradePanel({ upgrades = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Upgrade Paths</h2>
      {upgrades.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {upgrades.map((upgrade) => (
            <div key={upgrade.upgrade_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
              <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{upgrade.upgrade_id}</p>
              <h3 className="mt-1 font-semibold text-[#fff5d6]">Level {upgrade.upgrade_level} Upgrade</h3>
              <p className="mt-2 text-sm text-[#d8c7a3]">{upgrade.description}</p>
              <p className="mt-2 text-sm text-[#f7d98b]">{upgrade.required_gold} gold · {upgrade.required_station?.replaceAll('_', ' ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#d8c7a3]">No upgrade path assigned yet.</p>
      )}
    </section>
  )
}
