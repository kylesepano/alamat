export function VoiceProfile({ voice }) {
  if (!voice) return null

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Voice Profile</h2>
      <div className="rounded border border-[#5f4528] bg-[#160f09] p-4 text-sm text-[#d8c7a3]">
        <p>{voice.voice_type} · {voice.accent} · {voice.speaking_speed}</p>
        <p className="mt-2">Vocabulary: {voice.vocabulary}</p>
        <p className="mt-2">Greeting: {voice.greeting_style}</p>
      </div>
    </section>
  )
}
