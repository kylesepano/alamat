export function DialogueViewer({ dialogue }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Dialogue</h2>
      <div className="space-y-2">
        {(dialogue?.nodes ?? []).map((node) => (
          <div key={node.id} className="rounded border border-[#5f4528] bg-[#160f09] p-3">
            <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{node.id}</p>
            <p className="mt-1 text-sm text-[#d8c7a3]">{node.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
