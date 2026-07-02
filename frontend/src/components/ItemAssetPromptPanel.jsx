export function ItemAssetPromptPanel({ item }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Asset Prompts</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{item.assets?.icon_filename}</code>
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{item.assets?.sprite_filename}</code>
        <code className="rounded border border-[#5f4528] bg-[#110b07] p-2 text-xs text-[#f7d98b]">{item.assets?.thumbnail_filename}</code>
      </div>
      <pre className="whitespace-pre-wrap rounded border border-[#5f4528] bg-[#110b07] p-4 text-sm text-[#d8c7a3]">{item.assets?.asset_prompt}</pre>
    </section>
  )
}
