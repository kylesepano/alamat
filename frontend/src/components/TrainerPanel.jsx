export function TrainerPanel({ training = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Training</h2>
      {training.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {training.map((lesson) => (
            <div key={lesson.training_id} className="rounded border border-[#5f4528] bg-[#160f09] p-4">
              <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{lesson.lesson_type}</p>
              <h3 className="mt-1 font-semibold text-[#fff5d6]">{lesson.lesson_key.replaceAll('_', ' ')}</h3>
              <pre className="mt-3 overflow-auto rounded bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(lesson.requirements_payload ?? {}, null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : <p className="text-[#d8c7a3]">No training lessons assigned.</p>}
    </section>
  )
}
