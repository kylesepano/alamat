export function MapTransitionPanel({ transitions = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Map Transitions</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {transitions.map((transition) => (
          <div key={transition.transition_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{transition.transition_type}</p>
            <p className="mt-1 text-sm text-[#d8c7a3]">{transition.transition_id}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
