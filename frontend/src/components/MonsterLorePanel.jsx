export function MonsterLorePanel({ monster }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-5">
        <h3 className="text-xl font-black text-[#fff6df]">Documented Folklore</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#d9ceb7]">{monster.folklore_summary}</p>
      </section>
      <section className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-5">
        <h3 className="text-xl font-black text-[#fff6df]">Original ALAMAT Lore</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#d9ceb7]">{monster.alamat_lore}</p>
      </section>
    </div>
  )
}
