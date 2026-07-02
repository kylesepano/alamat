export function QuestStepTimeline({ steps = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Steps</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.step_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">Step {step.step_order} · {step.objective_type.replaceAll('_', ' ')}</p>
            <h3 className="mt-1 font-semibold text-[#fff5d6]">{step.title}</h3>
            <p className="mt-2 text-sm text-[#d8c7a3]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
