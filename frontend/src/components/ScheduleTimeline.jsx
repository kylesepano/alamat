const periods = ['morning', 'afternoon', 'evening', 'night', 'late_night']

export function ScheduleTimeline({ schedule }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Schedule</h2>
      <div className="grid gap-3 md:grid-cols-5">
        {periods.map((period) => {
          const block = schedule?.[period]
          return (
            <div key={period} className="rounded border border-[#5f4528] bg-[#160f09] p-3">
              <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{period.replaceAll('_', ' ')}</p>
              <p className="mt-1 text-sm text-[#fff5d6]">{block?.activity?.replaceAll('_', ' ') ?? 'unknown'}</p>
              <p className="text-xs text-[#b8a986]">{block?.start} - {block?.end}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
