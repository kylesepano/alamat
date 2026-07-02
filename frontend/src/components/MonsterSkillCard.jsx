export function MonsterSkillCard({ skill }) {
  return (
    <article className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#c7a563]">{skill.category?.name ?? 'Skill'}</p>
      <h3 className="mt-1 text-xl font-black text-[#fff6df]">{skill.skill_name}</h3>
      <p className="mt-2 text-sm leading-6 text-[#d9ceb7]">{skill.description ?? skill.notes}</p>
      {skill.lore ? <p className="mt-2 text-sm italic text-[#b8a986]">{skill.lore}</p> : null}
    </article>
  )
}
