export function NPCPortrait({ npc }) {
  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center rounded border border-[#7a5b2f] bg-[#2a1b10] text-xs text-[#f7d98b]">
      {npc.full_name?.slice(0, 2).toUpperCase()}
    </div>
  )
}
