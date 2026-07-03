import { useEffect, useMemo, useState } from 'react'
import { AlamatGame } from '../game/AlamatGame'
import { gameBridge } from '../game/bridges/ReactPhaserBridge'
import { COMPANION_DEFINITIONS, companionBondState } from '../game/data/companionRuntimeData'
import { skillById } from '../game/data/combatRuntimeData'
import { EQUIPMENT_DEFINITIONS, ITEM_DEFINITIONS, RECIPE_DEFINITIONS, SHOP_DEFINITIONS, displayName, equipmentById, equipmentStatTotals, itemById } from '../game/data/inventoryRuntimeData'
import { nextLevelThreshold } from '../game/data/progressionRuntimeData'
import { QUEST_DEFINITIONS, questProgress, trackedQuest } from '../game/data/questRuntimeData'
import { STORY_SCENES } from '../game/data/storyRuntimeData'
import { SaveSystem } from '../game/systems/SaveSystem'

const bodyOptions = ['body_01', 'body_02', 'body_03']
const hairOptions = ['hair_01', 'hair_02', 'hair_03']
const outfitOptions = ['forest', 'river', 'sunset']
const infoTabs = [
  { id: 'progression', label: 'Progression', hotkey: 'P' },
  { id: 'quests', label: 'Quests', hotkey: 'Q' },
  { id: 'inventory', label: 'Inventory', hotkey: 'I' },
  { id: 'equipment', label: 'Equipment', hotkey: 'E' },
  { id: 'companion', label: 'Companion', hotkey: 'C' },
  { id: 'story', label: 'Story', hotkey: 'T' },
]

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
  const [battle, setBattle] = useState(null)
  const [battleResult, setBattleResult] = useState(null)
  const [shopPanel, setShopPanel] = useState(null)
  const [craftingPanel, setCraftingPanel] = useState(null)
  const [questChanges, setQuestChanges] = useState([])
  const [storyScene, setStoryScene] = useState(null)
  const [activeInfo, setActiveInfo] = useState(null)
  const [map, setMap] = useState(null)
  const [lastSaveMessage, setLastSaveMessage] = useState('')
  const [debug, setDebug] = useState(null)

  useEffect(() => {
    const cleanups = [
      gameBridge.on('dialogue:open', (payload) => setPanel({ type: 'dialogue', ...payload })),
      gameBridge.on('interaction:started', (payload) => setPanel({ type: 'interaction', ...payload })),
      gameBridge.on('shop:open', (payload) => setShopPanel(payload)),
      gameBridge.on('crafting:open', (payload) => setCraftingPanel(payload)),
      gameBridge.on('encounter:preview', (payload) => setPanel({ type: 'encounter', ...payload })),
      gameBridge.on('battle:started', () => setPanel(null)),
      gameBridge.on('battle:update', (payload) => setBattle(payload)),
      gameBridge.on('battle:ended', () => {
        window.setTimeout(() => setBattle(null), 900)
      }),
      gameBridge.on('battle:ended', (payload) => setBattleResult(payload)),
      gameBridge.on('save:complete', (payload) => {
        setSave(payload.save)
        setLastSaveMessage(payload.message)
        window.setTimeout(() => setLastSaveMessage(''), 2500)
      }),
      gameBridge.on('quest:update', (payload) => {
        setSave((current) => ({ ...current, quests: payload.quests }))
        setQuestChanges(payload.changes ?? [])
        window.setTimeout(() => setQuestChanges([]), 3000)
      }),
      gameBridge.on('story:scene', (payload) => setStoryScene(payload)),
      gameBridge.on('map:changed', setMap),
      gameBridge.on('debug:update', setDebug),
    ]
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => {
    gameBridge.emit('ui:interaction-panel', { open: Boolean(panel) })
  }, [panel])

  useEffect(() => {
    function handleHotkeys(event) {
      const tagName = event.target?.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return
      const key = event.key.toLowerCase()
      if (event.code === 'Space' || key === ' ') {
        if (panel) {
          event.preventDefault()
          setPanel(null)
          return
        }
      }
      const tab = infoTabs.find((item) => item.hotkey.toLowerCase() === key)
      if (tab) {
        event.preventDefault()
        setActiveInfo((current) => current === tab.id ? null : tab.id)
        return
      }
      if (battle?.state?.turn === 'player' && battle.state.phase !== 'ended') {
        if (event.repeat) return
        const firstSkill = battle.state.player.skills.find((skillId) => skillId !== 'steady_guard')
        const firstItem = Object.entries(battle.state.inventory?.items ?? {}).find(([itemId, quantity]) => quantity > 0 && ITEM_DEFINITIONS[itemId]?.category === 'Consumable')
        if (key === '1' && firstSkill) gameBridge.emit('command:battle-action', { action: `skill:${firstSkill}` })
        if (key === '2') gameBridge.emit('command:battle-action', { action: 'guard' })
        if (key === '3' && firstItem) gameBridge.emit('command:battle-action', { action: `item:${firstItem[0]}` })
        if (key === 'f') gameBridge.emit('command:battle-action', { action: 'flee' })
      }
    }
    window.addEventListener('keydown', handleHotkeys)
    return () => window.removeEventListener('keydown', handleHotkeys)
  }, [battle, panel])

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
          <p className="text-sm font-bold uppercase tracking-wide text-[#d8b765]">Milestone 3 Inventory, Equipment & Economy</p>
          <h1 className="text-3xl font-black text-[#fff6df]">{map?.zone ?? 'Barangay San Isidro'}</h1>
          <p className="text-sm text-[#d9ceb7]">{map?.name ?? save.world.location_id} / {companionState}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:save')}>Save</button>
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:load')}>Load</button>
          <button className="rounded-md border border-[#d8b765]/30 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={() => gameBridge.emit('command:reset-save')}>Reset</button>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
        <main className="relative space-y-4">
          <AlamatGame save={save} />
          <ActiveInfoPanel activeInfo={activeInfo} save={save} debug={debug} onClose={() => setActiveInfo(null)} />
        </main>
        <aside className="space-y-3">
          <Panel title="Controls">
            <p>Move with WASD or arrow keys.</p>
            <p>Interact with Space. Press Space again to close dialogue.</p>
            <p>E also works for interaction.</p>
            <p>Toggle debug with F3. Quick save with F5.</p>
            <p>Battle: 1 attack, 2 guard, 3 item, F flee.</p>
          </Panel>
          <Panel title="Legend">
            <div className="grid gap-2">
              {infoTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`rounded-md border px-3 py-2 text-left text-xs font-black ${activeInfo === tab.id ? 'border-[#d8b765] bg-[#d8b765] text-[#11180f]' : 'border-[#d8b765]/25 text-[#f7d98b]'}`}
                  onClick={() => setActiveInfo((current) => current === tab.id ? null : tab.id)}
                >
                  {tab.hotkey} / {tab.label}
                </button>
              ))}
            </div>
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
          {questChanges.length ? (
            <Panel title="Quest Update">
              {questChanges.slice(-2).map((change) => <p key={`${change.quest_id}-${change.type}`}>{change.title}: {change.type}</p>)}
            </Panel>
          ) : null}
        </aside>
      </div>
      {battle ? <BattleCommandBar battle={battle} /> : null}
      {panel ? <InteractionModal panel={panel} onClose={() => setPanel(null)} /> : null}
      {shopPanel ? <ShopModal panel={shopPanel} save={save} onClose={() => setShopPanel(null)} /> : null}
      {craftingPanel ? <CraftingModal panel={craftingPanel} save={save} onClose={() => setCraftingPanel(null)} /> : null}
      {storyScene ? <StorySceneModal scene={storyScene} onClose={() => setStoryScene(null)} /> : null}
      {battleResult ? <BattleResultModal result={battleResult} onClose={() => setBattleResult(null)} /> : null}
    </div>
  )
}

function ProgressionPanel({ save }) {
  const next = nextLevelThreshold(save.progression.level)
  const fieldLog = save.progression.field_log.slice(-3).reverse()
  return (
    <Panel title="Progression">
      <p>Level {save.progression.level}</p>
      <p>XP {save.progression.total_xp}{next ? ` / ${next.totalXp}` : ''}</p>
      <p>Pilak {save.progression.currencies.pilak ?? 0}</p>
      {fieldLog.length ? (
        <div className="mt-2 text-xs text-[#b8a986]">
          {fieldLog.map((entry) => <p key={`${entry.source_id}-${entry.name}-${entry.acquired_at}`}>{entry.name}</p>)}
        </div>
      ) : <p className="text-xs text-[#b8a986]">No field rewards logged yet.</p>}
    </Panel>
  )
}

function ActiveInfoPanel({ activeInfo, save, debug, onClose }) {
  if (!activeInfo) return null
  const title = infoTabs.find((tab) => tab.id === activeInfo)?.label ?? 'Panel'
  return (
    <div className="absolute left-4 top-4 z-40 max-h-[calc(78vh-2rem)] w-[min(440px,calc(100%-2rem))] overflow-auto rounded-lg border border-[#d8b765]/35 bg-[#11180f]/95 p-4 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black uppercase tracking-wide text-[#fff6df]">{title}</h2>
        <button className="rounded-md border border-[#d8b765]/35 px-2 py-1 text-xs font-black text-[#f7d98b]" onClick={onClose}>Close</button>
      </div>
      <div className="[&_section]:border-0 [&_section]:bg-transparent [&_section]:p-0">
        {activeInfo === 'progression' ? <ProgressionPanel save={save} /> : null}
        {activeInfo === 'quests' ? <QuestTracker save={save} /> : null}
        {activeInfo === 'inventory' ? <InventoryPanel save={save} /> : null}
        {activeInfo === 'equipment' ? <EquipmentPanel save={save} /> : null}
        {activeInfo === 'companion' ? <CompanionPanel save={save} /> : null}
        {activeInfo === 'story' ? <StoryPanel save={save} /> : null}
        {activeInfo === 'debug' ? (
          <Panel title="Debug">
            <p>Map: {debug?.location_id ?? save.world.location_id}</p>
            <p>XY: {Math.round(debug?.x ?? save.world.x)}, {Math.round(debug?.y ?? save.world.y)}</p>
            <p>Facing: {debug?.facing ?? 'down'}</p>
            <p>Interactable: {debug?.active_interactable ?? 'none'}</p>
          </Panel>
        ) : null}
      </div>
    </div>
  )
}

function QuestTracker({ save }) {
  const tracked = trackedQuest(save)
  const active = Object.keys(save.quests?.active ?? {})
  if (!tracked) {
    return (
      <Panel title="Quests">
        <p className="text-xs text-[#b8a986]">No active quests.</p>
      </Panel>
    )
  }
  const { quest, state } = tracked
  const progress = questProgress(quest, state)
  return (
    <Panel title="Quest Tracker">
      <p className="font-bold text-[#fff6df]">{quest.title}</p>
      <p className="text-xs text-[#b8a986]">{quest.category} / {progress.done} of {progress.total}</p>
      <div className="mt-3 space-y-2">
        {quest.objectives.map((objective) => {
          const done = state.objectives[objective.id] >= 1
          return (
            <p key={objective.id} className={done ? 'text-[#61c47c]' : 'text-[#d9ceb7]'}>
              {done ? 'Done: ' : 'Next: '}{objective.label}
            </p>
          )
        })}
      </div>
      {active.length > 1 ? (
        <div className="mt-3 grid gap-2">
          {active.map((questId) => {
            const activeQuest = QUEST_DEFINITIONS[questId]
            return (
              <button
                key={questId}
                className="rounded-md border border-[#d8b765]/20 px-2 py-1 text-left text-xs font-bold text-[#f7d98b]"
                onClick={() => gameBridge.emit('command:track-quest', { quest_id: questId })}
              >
                Track {activeQuest?.title ?? questId}
              </button>
            )
          })}
        </div>
      ) : null}
    </Panel>
  )
}

function StoryPanel({ save }) {
  const seenScenes = Object.values(STORY_SCENES).filter((scene) => save.world.story_flags.includes(scene.triggerFlag))
  return (
    <Panel title="Story">
      {seenScenes.length ? (
        <div className="space-y-2">
          {seenScenes.map((scene) => (
            <div key={scene.id} className="rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
              <p className="font-bold text-[#fff6df]">{scene.title}</p>
              <p className="text-xs text-[#b8a986]">{scene.chapter}</p>
            </div>
          ))}
        </div>
      ) : <p className="text-xs text-[#b8a986]">Story scenes will appear as you explore.</p>}
    </Panel>
  )
}

function InventoryPanel({ save }) {
  const entries = Object.entries(save.inventory.items)
    .map(([itemId, quantity]) => ({ item: itemById(itemId), itemId, quantity }))
    .filter((entry) => entry.quantity > 0)
  return (
    <Panel title="Inventory">
      {entries.length ? (
        <div className="space-y-2">
          {entries.map(({ item, itemId, quantity }) => (
            <div key={itemId} className="flex items-start justify-between gap-3 rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
              <div>
                <p className="font-bold text-[#fff6df]">{item?.name ?? itemId}</p>
                <p className="text-xs text-[#b8a986]">{item?.category ?? 'Item'}</p>
              </div>
              <span className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]">x{quantity}</span>
            </div>
          ))}
        </div>
      ) : <p className="text-xs text-[#b8a986]">No items yet.</p>}
    </Panel>
  )
}

function EquipmentPanel({ save }) {
  const totals = equipmentStatTotals(save)
  const slots = Object.entries(save.equipment.slots)
  return (
    <Panel title="Equipment">
      <div className="space-y-2">
        {slots.map(([slot, equipmentId]) => {
          const equipment = equipmentById(equipmentId)
          return (
            <div key={slot} className="rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
              <p className="text-xs font-bold uppercase text-[#b8a986]">{slot}</p>
              <p className="font-bold text-[#fff6df]">{equipment?.name ?? 'Empty'}</p>
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-[#b8a986]">
        Stats: HP +{totals.maxHp ?? 0}, ATK +{totals.attack ?? 0}, DEF +{totals.defense ?? 0}, SPD +{totals.speed ?? 0}
      </p>
      {save.inventory.equipment.length ? (
        <div className="mt-3 grid gap-2">
          {save.inventory.equipment.map((equipmentId) => {
            const equipment = equipmentById(equipmentId)
            return (
              <button
                key={equipmentId}
                className="rounded-md border border-[#d8b765]/30 px-2 py-2 text-left text-xs font-bold text-[#f7d98b]"
                onClick={() => gameBridge.emit('command:equip-item', { equipment_id: equipmentId })}
              >
                Equip {equipment?.name ?? equipmentId}
              </button>
            )
          })}
        </div>
      ) : null}
    </Panel>
  )
}

function BattleCommandBar({ battle }) {
  const state = battle.state
  const canAct = state.turn === 'player' && state.phase !== 'ended'
  const consumables = Object.entries(state.inventory?.items ?? {})
    .filter(([itemId, quantity]) => quantity > 0 && ITEM_DEFINITIONS[itemId]?.category === 'Consumable')
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-6xl rounded-lg border border-[#bd4c5f]/45 bg-[#11180f]/95 p-3 shadow-2xl backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[220px_1fr]">
        <div className="text-sm text-[#d9ceb7]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#f7d98b]">Battle Commands</p>
          <p className="font-black text-[#fff6df]">{battle.monster.name}</p>
          <p>{state.player.hp}/{state.player.maxHp} HP / {state.turn === 'player' ? 'Your turn' : 'Waiting'}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {state.player.skills.filter((skillId) => skillId !== 'steady_guard').map((skillId, index) => {
            const skill = skillById(skillId)
            const cooldown = state.player.cooldowns[skillId] ?? 0
            return (
              <BattleButton
                key={skillId}
                disabled={!canAct || cooldown > 0}
                onClick={() => gameBridge.emit('command:battle-action', { action: `skill:${skillId}` })}
              >
                <span>{index + 1}. {skill.name}</span>
                <small>{cooldown > 0 ? `Cooldown ${cooldown}` : `${skill.category} / ${skill.damageType}`}</small>
              </BattleButton>
            )
          })}
          <BattleButton disabled={!canAct} onClick={() => gameBridge.emit('command:battle-action', { action: 'guard' })}>
            <span>2. Guard</span>
            <small>Reduce incoming pressure</small>
          </BattleButton>
          {consumables.slice(0, 2).map(([itemId, quantity], index) => {
            const item = itemById(itemId)
            return (
              <BattleButton
                key={`bar-${itemId}`}
                disabled={!canAct}
                onClick={() => gameBridge.emit('command:battle-action', { action: `item:${itemId}` })}
              >
                <span>{index + 3}. {item?.name ?? itemId} x{quantity}</span>
                <small>{item?.effect?.type ?? 'item'}</small>
              </BattleButton>
            )
          })}
          <BattleButton disabled={!canAct} onClick={() => gameBridge.emit('command:battle-action', { action: 'flee' })}>
            <span>F. Flee</span>
            <small>{battle.monster.fleeBlocked ? 'Blocked here' : 'Return to map'}</small>
          </BattleButton>
        </div>
      </div>
    </div>
  )
}

function CompanionPanel({ save }) {
  const companionIds = Object.keys(COMPANION_DEFINITIONS)
  const activeId = save.companions.active_companion_id
  return (
    <Panel title="Companion">
      <p>{activeId ? `Active: ${COMPANION_DEFINITIONS[activeId]?.name ?? activeId}` : 'No companion yet'}</p>
      <div className="mt-3 space-y-3">
        {companionIds.map((monsterId) => {
          const definition = COMPANION_DEFINITIONS[monsterId]
          const state = companionBondState(save, monsterId)
          const bonded = save.companions.collection.includes(monsterId)
          return (
            <div key={monsterId} className="rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[#fff6df]">{definition.name}</p>
                  <p className="text-xs text-[#b8a986]">Trust {state.trust}/100 / {bonded ? 'Bonded' : state.eligible ? 'Ready' : 'Story gated'}</p>
                </div>
                {state.eligible ? (
                  <button className="rounded-md bg-[#d8b765] px-3 py-2 text-xs font-black text-[#11180f]" onClick={() => gameBridge.emit('command:bond-companion', { monster_id: monsterId })}>
                    Bond
                  </button>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-[#d9ceb7]">{definition.bondPrompt}</p>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function BattleButton({ disabled, onClick, children }) {
  return (
    <button
      className="flex flex-col rounded-md border border-[#d8b765]/30 px-2 py-2 text-left font-bold text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45 [&_small]:font-normal [&_small]:text-[#b8a986]"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
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

function ShopModal({ panel, save, onClose }) {
  const shop = SHOP_DEFINITIONS[panel.shop_id]
  const pilak = save.progression.currencies.pilak ?? 0
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-4xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">Shop / Pilak {pilak}</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{shop?.name ?? panel.speaker}</h2>
          <p className="mt-2 text-sm text-[#d9ceb7]">{panel.text}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {(shop?.inventory ?? []).map((entry, index) => {
              const item = entry.kind === 'equipment' ? equipmentById(entry.id) : itemById(entry.id)
              const owned = entry.kind === 'equipment' && save.inventory.equipment.includes(entry.id)
              return (
                <button
                  key={`${entry.kind}-${entry.id}`}
                  className="rounded-md border border-[#d8b765]/20 bg-[#151a13] p-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={pilak < entry.price}
                  onClick={() => gameBridge.emit('command:buy-shop-entry', { shop_id: shop.id, entry_index: index })}
                >
                  <span className="block font-black text-[#fff6df]">{displayName(entry)} / {entry.price} Pilak</span>
                  <span className="text-xs text-[#b8a986]">{item?.description}{owned ? ' / Owned' : ''}</span>
                </button>
              )
            })}
          </div>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function CraftingModal({ panel, save, onClose }) {
  const recipes = Object.values(RECIPE_DEFINITIONS)
  const equipmentCount = save.inventory.equipment.filter((equipmentId) => EQUIPMENT_DEFINITIONS[equipmentId]).length
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-4xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">Crafting / Gear owned {equipmentCount}</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{panel.speaker}</h2>
          <p className="mt-2 text-sm text-[#d9ceb7]">{panel.text}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {recipes.map((recipe) => {
              const missing = recipe.ingredients.some((ingredient) => (save.inventory.items[ingredient.id] ?? 0) < ingredient.quantity)
              const pilakMissing = (save.progression.currencies.pilak ?? 0) < (recipe.cost.pilak ?? 0)
              return (
                <button
                  key={recipe.id}
                  className="rounded-md border border-[#d8b765]/20 bg-[#151a13] p-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={missing || pilakMissing}
                  onClick={() => gameBridge.emit('command:craft-recipe', { recipe_id: recipe.id })}
                >
                  <span className="block font-black text-[#fff6df]">{recipe.name}</span>
                  <span className="block text-xs text-[#b8a986]">{recipe.description}</span>
                  <span className="mt-2 block text-xs text-[#f7d98b]">
                    {recipe.ingredients.map((ingredient) => `${itemById(ingredient.id)?.name ?? ingredient.id} ${save.inventory.items[ingredient.id] ?? 0}/${ingredient.quantity}`).join(' / ')}
                    {recipe.cost.pilak ? ` / ${recipe.cost.pilak} Pilak` : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function StorySceneModal({ scene, onClose }) {
  return (
    <div className="fixed inset-x-4 top-20 z-50 mx-auto max-w-3xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">{scene.chapter}</p>
          <h2 className="mt-1 text-2xl font-black text-[#fff6df]">{scene.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#d9ceb7]">{scene.body}</p>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Continue</button>
      </div>
    </div>
  )
}

function BattleResultModal({ result, onClose }) {
  const rewards = result.rewards ?? {}
  const currencies = Object.entries(rewards.currencies ?? {})
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-3xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">Battle Result</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{result.name} / {result.result}</h2>
          <div className="mt-3 grid gap-1 text-sm leading-6 text-[#d9ceb7]">
            <p>XP gained: {rewards.xp ?? 0}{rewards.levelUp ? ` / Level ${rewards.levelAfter}` : ''}</p>
            {currencies.map(([currency, amount]) => <p key={currency}>{currency}: +{amount}</p>)}
            {(rewards.fieldDrops ?? []).map((drop) => <p key={drop}>Field note: {drop}</p>)}
            <p className="text-xs text-[#b8a986]">{rewards.notes}</p>
          </div>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
