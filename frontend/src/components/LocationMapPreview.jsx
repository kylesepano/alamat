export function LocationMapPreview({ location }) {
  return (
    <section className="rounded border border-[#5f4528] bg-[#160f09] p-5">
      <div className="grid min-h-56 place-items-center rounded border border-[#7a5b2f] bg-[#110b07] text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{location.assets?.map_filename}</p>
          <p className="mt-2 text-lg font-semibold text-[#fff5d6]">{location.name}</p>
          <p className="mt-1 text-sm text-[#b8a986]">{location.default_terrain} · {location.default_weather}</p>
        </div>
      </div>
    </section>
  )
}
