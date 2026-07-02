import { useEffect, useMemo, useState } from 'react'
import { AlamatGame } from '../game/AlamatGame'
import { gameBridge } from '../game/bridges/ReactPhaserBridge'
import { SaveSystem } from '../game/systems/SaveSystem'

const bodyOptions = ['body_01', 'body_02', 'body_03']
const hairOptions = ['hair_01', 'hair_02', 'hair_03']
const outfitOptions = ['forest', 'river', 'sunset']

export function PlayPage() {
  const [save, setSave] = useState(() => SaveSystem.load())
  const [started, setStarted] = useState(() => Boolean(SaveSystem.load().player.name))
  const [form, setForm] = useState(() => ({
    name: save.player.name,
    body: save.player.appearance.body,
    hair: save.player.appearance.hair,
    outfit: save.player.appearance.outfit,
  }))
  const [panel, setPanel] = useState(null)
  const [map, setMap] = useState(null)
  const [lastSaveMessage, setLastSaveMessage] = useState('')
  const [debug, setDebug] = useState(null)

  useEffect(() => {
    const cleanups = [
      gameBridge.on('dialogue:open', (payload) => setPanel({ type: 'dialogue', ...payload })),
      gameBridge.on('interaction:started', (payload) => setPanel({ type: 'interaction', ...payload })),
      gameBridge.on('encounter:preview', (payload) => setPanel({ type: 'encounter', ...payload })),
      gameBridge.on('save:complete', (payload) => {
        setSave(payload.save)
        setLastSaveMessage(payload.message)
        window.setTimeout(() => setLastSaveMessage(''), 2500)
      }),
      gameBridge.on('map:changed', setMap),
      gameBridge.on('debug:update', setDebug),
    ]
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  const companionState = useMemo(() => {
    if (save.companions.active_companion_id) return `Bonded: ${save.companions.active_companion_id}`
    return 'No companion yet'
  }, [save.companions.active_companion_id])

  function startGame(event) {
    event.preventDefault()
    const created = SaveSystem.createCharacter(form)
    setSave(created)
    setStarted(true)
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg border border-[#d8b765]/25 bg-[#151a13]/90 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-[#d8b765]">Milestone 1</p>
        <h1 className="mt-2 text-3xl font-black text-[#fff6df]">Create Your Protagonist</h1>
        <p className="mt-3 text-sm leading-6 text-[#d9ceb7]">
          ALAMAT begins without a bonded Nilalang. Your first companion must be earned through care, trust, and story progress.
        </p>
        <form onSubmit={startGame} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-[#f7d98b]">
            Name
            <input className="rounded-md border border-[#d8b765]/30 bg-[#0f140d] px-3 py-2 text-[#fff6df]" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Manlalakbay" />
          </label>
          <Select label="Body" value={form.body} options={bodyOptions} onChange={(body) => setForm({ ...form, body })} />
          <Select label="Hair" value={form.hair} options={hairOptions} onChange={(hair) => setForm({ ...form, hair })} />
          <Select label="Outfit Palette" value={form.outfit} options={outfitOptions} onChange={(outfit) => setForm({ ...form, outfit })} />
          <button className="rounded-md bg-[#d8b765] px-4 py-3 font-black text-[#151a13]" type="submit">Begin Arrival</button>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#d8b765]">Milestone 1 Core Engine</p>
          <h1 className="text-3xl font-black text-[#fff6df]">{map?.zone ?? 'Barangay San Isidro'}</h1>
          <p className="text-sm text-[#d9ceb7]">{map?.name ?? save.world.location_id} / {companionState}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:save')}>Save</button>
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:load')}>Load</button>
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:reset-save')}>Reset</button>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <AlamatGame save={save} />
        <aside className="space-y-4">
          <Panel title="Controls">
            <p>Move with WASD or arrow keys.</p>
            <p>Interact with E or Space.</p>
            <p>Toggle debug with F3. Quick save with F5.</p>
          </Panel>
          <Panel title="Player">
            <p>{save.player.name}</p>
            <p>{save.player.appearance.body} / {save.player.appearance.hair} / {save.player.appearance.outfit}</p>
          </Panel>
          <Panel title="Debug">
            <p>Map: {debug?.location_id ?? save.world.location_id}</p>
            <p>XY: {Math.round(debug?.x ?? save.world.x)}, {Math.round(debug?.y ?? save.world.y)}</p>
            <p>Facing: {debug?.facing ?? 'down'}</p>
            <p>Interactable: {debug?.active_interactable ?? 'none'}</p>
          </Panel>
          {lastSaveMessage ? <Panel title="Save">{lastSaveMessage}</Panel> : null}
        </aside>
      </div>
      {panel ? <InteractionModal panel={panel} onClose={() => setPanel(null)} /> : null}
    </div>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#f7d98b]">
      {label}
      <select className="rounded-md border border-[#d8b765]/30 bg-[#0f140d] px-3 py-2 text-[#fff6df]" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Panel({ title, children }) {
  return <section className="rounded-lg border border-[#d8b765]/20 bg-[#151a13]/90 p-4 text-sm leading-6 text-[#d9ceb7]"><h2 className="mb-2 font-black text-[#fff6df]">{title}</h2>{children}</section>
}

function InteractionModal({ panel, onClose }) {
  const title = panel.speaker ?? panel.title ?? panel.entity_id
  const body = panel.text ?? panel.body
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-3xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">{panel.type}</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#d9ceb7]">{body}</p>
          {panel.monster_id ? <p className="mt-2 text-xs text-[#b8a986]">Source: {panel.monster_id}</p> : null}
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
