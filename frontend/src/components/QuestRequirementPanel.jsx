export function QuestRequirementPanel({ requirements = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Requirements</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {requirements.map((requirement) => (
          <div key={requirement.requirement_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{requirement.requirement_type.replaceAll('_', ' ')}</p>
            <p className="mt-1 text-sm text-[#d8c7a3]">{requirement.failure_message}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
