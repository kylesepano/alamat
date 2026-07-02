export function LibraryCategory({ title, count }) {
  return (
    <div className="rounded-lg border border-[#d8b765]/20 bg-[#171b16]/80 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#b8a986]">{title}</p>
      <p className="mt-1 text-2xl font-black text-[#f7d98b]">{count}</p>
    </div>
  )
}
