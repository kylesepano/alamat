export function PageHeader({ kicker, title, description }) {
  return (
    <header className="mb-8 max-w-4xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#d8b765]">{kicker}</p>
      <h1 className="text-4xl font-black text-[#fff6df] sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[#d9ceb7]">{description}</p>
    </header>
  )
}
