export function EquipmentEffectPanel({ equipment }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Effects</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{equipment.effects?.passive_id ?? 'No passive'}</code>
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{equipment.effects?.skill_id ?? 'No skill'}</code>
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{equipment.effects?.status_effect?.name ?? 'No status effect'}</code>
      </div>
      <pre className="overflow-auto rounded border border-[#5f4528] bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(equipment.effects?.effect_payload ?? {}, null, 2)}</pre>
    </section>
  )
}
