import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlamatGame } from '../game/AlamatGame'
import { gameBridge } from '../game/bridges/ReactPhaserBridge'
import { COMPANION_DEFINITIONS, COMPANION_STAT_POINT_VALUES, companionActiveSkills, companionBondState, companionEquipmentStatTotals, companionProgressionState, companionStatsForSave, nextCompanionLevelThreshold } from '../game/data/companionRuntimeData'
import { ACTIVE_SKILL_SLOT_LIMIT, skillById, statusById } from '../game/data/combatRuntimeData'
import { EQUIPMENT_DEFINITIONS, ITEM_DEFINITIONS, RECIPE_DEFINITIONS, SHOP_DEFINITIONS, displayName, equipmentById, equipmentStatTotals, itemById } from '../game/data/inventoryRuntimeData'
import { PLAYER_STAT_POINT_VALUES, classTrackForProgression, nextLevelThreshold, playerActiveSkills, playerStatsForProgression } from '../game/data/progressionRuntimeData'
import { QUEST_DEFINITIONS, questProgress, trackedQuest } from '../game/data/questRuntimeData'
import { STORY_SCENES } from '../game/data/storyRuntimeData'
import { SaveSystem } from '../game/systems/SaveSystem'
import { dialoguePortraitPath, equipmentIconPath, itemIconPath } from '../game/data/verticalSliceAssets'

const bodyOptions = ['body_01', 'body_02', 'body_03']
const hairOptions = ['hair_01', 'hair_02', 'hair_03']
const outfitOptions = ['forest', 'river', 'sunset']
const infoTabs = [
  { id: 'progression', label: 'Progression', hotkey: 'P' },
  { id: 'quests', label: 'Quests', hotkey: 'Q' },
  { id: 'inventory', label: 'Inventory', hotkey: 'E' },
  { id: 'equipment', label: 'Equipment', hotkey: 'G' },
  { id: 'companion', label: 'Companion', hotkey: 'C' },
  { id: 'skills', label: 'Skills', hotkey: 'K' },
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
      gameBridge.on('battle:started', () => {
        setPanel(null)
        setActiveInfo(null)
      }),
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
    gameBridge.emit('ui:interaction-panel', { open: Boolean(panel || shopPanel || craftingPanel || storyScene || battleResult) })
  }, [battleResult, craftingPanel, panel, shopPanel, storyScene])

  useEffect(() => {
    function handleHotkeys(event) {
      const tagName = event.target?.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return
      const key = event.key.toLowerCase()
      if (event.key === 'Escape') {
        if (battleResult) setBattleResult(null)
        else if (storyScene) setStoryScene(null)
        else if (shopPanel) setShopPanel(null)
        else if (craftingPanel) setCraftingPanel(null)
        else if (panel) setPanel(null)
        else if (activeInfo) setActiveInfo(null)
        return
      }
      if (event.code === 'Space' || key === ' ') {
        if (panel) {
          event.preventDefault()
          setPanel((current) => advanceDialogue(current))
          return
        }
      }
      if (battle && battle.state?.phase !== 'ended') return
      const tab = infoTabs.find((item) => item.hotkey.toLowerCase() === key)
      if (tab) {
        event.preventDefault()
        setActiveInfo((current) => current === tab.id ? null : tab.id)
        return
      }
    }
    window.addEventListener('keydown', handleHotkeys)
    return () => window.removeEventListener('keydown', handleHotkeys)
  }, [activeInfo, battle, battleResult, craftingPanel, panel, shopPanel, storyScene])

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
      <div className="space-y-3">
        <main className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <AlamatGame save={save} />
            {!battle ? <HealthHud save={save} /> : null}
            {!battle ? <HotkeyLegend activeInfo={activeInfo} onToggle={(tabId) => setActiveInfo((current) => current === tabId ? null : tabId)} /> : null}
            {!battle ? <ActiveInfoPanel activeInfo={activeInfo} save={save} debug={debug} onClose={() => setActiveInfo(null)} /> : null}
            {battle ? (
              <div className="absolute inset-x-3 bottom-3 z-30">
                <BattleCommandBar battle={battle} />
              </div>
            ) : null}
            {panel ? (
              <InteractionModal
                panel={panel}
                onAdvance={() => setPanel((current) => advanceDialogue(current))}
                onChoose={(choice) => {
                  gameBridge.emit('command:dialogue-choice', { entity_id: panel.entity_id, choice })
                  setPanel((current) => ({ ...current, selectedChoice: choice }))
                }}
                onClose={() => setPanel(null)}
              />
            ) : null}
          </div>
        </main>
        <aside className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Controls">
            <p>Move with WASD or arrow keys.</p>
            <p>Interact with Space. Press Space again to close dialogue.</p>
            <p>Esc closes open panels.</p>
            <p>Toggle debug with F3. Quick save with F5.</p>
            <p>Battle: 1-6 skills, Pots, F flee.</p>
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
      {shopPanel ? <ShopModal panel={shopPanel} save={save} onClose={() => setShopPanel(null)} /> : null}
      {craftingPanel ? <CraftingModal panel={craftingPanel} save={save} onClose={() => setCraftingPanel(null)} /> : null}
      {storyScene ? <StorySceneModal scene={storyScene} onClose={() => setStoryScene(null)} /> : null}
      {battleResult ? <BattleResultModal result={battleResult} onClose={() => setBattleResult(null)} /> : null}
    </div>
  )
}

function HotkeyLegend({ activeInfo, onToggle }) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-3 z-10 rounded-lg border border-[#d8b765]/25 bg-[#11180f]/88 px-3 py-2 shadow-xl backdrop-blur">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {infoTabs.map((tab) => (
          <button
            key={tab.id}
            className={`rounded-md border px-2 py-1 text-xs font-black ${activeInfo === tab.id ? 'border-[#d8b765] bg-[#d8b765] text-[#11180f]' : 'border-[#d8b765]/25 text-[#f7d98b]'}`}
            onClick={() => onToggle(tab.id)}
          >
            {tab.hotkey} / {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function HealthHud({ save }) {
  const playerStats = playerStatsForProgression(save.progression, equipmentStatTotals(save))
  const playerHp = Math.max(0, Math.min(playerStats.maxHp, save.player_state.hp ?? playerStats.maxHp))
  const companionId = save.companions.active_companion_id
  const companionDefinition = companionId ? COMPANION_DEFINITIONS[companionId] : null
  const companionStats = companionId && companionDefinition ? companionStatsForSave(structuredClone(save), companionId) : null
  const companionHp = companionId && companionStats ? Math.max(0, Math.min(companionStats.maxHp, save.companions.runtime?.[companionId]?.hp ?? companionStats.maxHp)) : null

  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 grid w-[min(280px,calc(100%-1.5rem))] gap-2">
      <HealthBar label={save.player.name || 'Player'} hp={playerHp} maxHp={playerStats.maxHp} tone="player" />
      {companionId && companionDefinition && companionStats ? (
        <HealthBar label={companionDefinition.name} hp={companionHp} maxHp={companionStats.maxHp} tone="companion" />
      ) : null}
    </div>
  )
}

function HealthBar({ label, hp, maxHp, tone }) {
  const percent = maxHp > 0 ? Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100))) : 0
  const fill = tone === 'companion' ? 'from-[#78d7a3] to-[#d8b765]' : 'from-[#bd4c5f] to-[#f0c36a]'
  return (
    <div className="rounded-lg border border-[#d8b765]/25 bg-[#11180f]/88 px-3 py-2 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-wide text-[#fff6df]">
        <span className="truncate">{label}</span>
        <span className="text-[#f7d98b]">{hp}/{maxHp}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#050805]">
        <div className={`h-full rounded-full bg-gradient-to-r ${fill}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function ActorToggle({ value, onChange, companionDisabled = false }) {
  return (
    <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg border border-[#d8b765]/15 bg-[#0f140d] p-1">
      {[
        ['character', 'Character'],
        ['companion', 'Companion'],
      ].map(([id, label]) => (
        <button
          key={id}
          className={`rounded-md px-3 py-2 text-xs font-black ${value === id ? 'bg-[#d8b765] text-[#11180f]' : 'text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45'}`}
          disabled={id === 'companion' && companionDisabled}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ProgressionPanel({ save }) {
  const [actorView, setActorView] = useState('character')
  const activeCompanionId = save.companions.active_companion_id
  const activeCompanionDefinition = activeCompanionId ? COMPANION_DEFINITIONS[activeCompanionId] : null
  const showingCompanion = actorView === 'companion' && activeCompanionId && activeCompanionDefinition
  const next = nextLevelThreshold(save.progression.level)
  const fieldLog = save.progression.field_log.slice(-3).reverse()
  const track = classTrackForProgression(save.progression)
  const equipmentStats = equipmentStatTotals(save)
  const stats = playerStatsForProgression(save.progression, equipmentStats)
  const allocated = save.progression.allocated_stats ?? {}
  if (showingCompanion) {
    return <CompanionProgressionPanel save={save} monsterId={activeCompanionId} onActorChange={setActorView} actorView={actorView} />
  }
  return (
    <Panel title="Progression">
      <ActorToggle value={actorView} onChange={setActorView} companionDisabled={!activeCompanionId} />
      <p>Level {save.progression.level}</p>
      <p>Class {track.name}</p>
      <p>XP {save.progression.total_xp}{next ? ` / ${next.totalXp}` : ''}</p>
      <p>Pilak {save.progression.currencies.pilak ?? 0}</p>
      <p className="text-xs text-[#b8a986]">Turn flow: Player, companion, then enemies. Speed is available for stats and future initiative tuning.</p>
      <div className="mt-3 rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
        <p className="font-bold text-[#fff6df]">Character Stats</p>
        <DetailRows rows={[
          ['HP', `${save.player_state.hp ?? stats.maxHp}/${stats.maxHp}`],
          ['Attack', stats.attack],
          ['Defense', stats.defense],
          ['Speed', stats.speed],
          ['Equipment', formatStats(equipmentStats)],
        ]} />
      </div>
      <div className="mt-3 rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-[#fff6df]">Stat Points</p>
          <span className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]">{save.progression.stat_points ?? 0} available</span>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            ['maxHp', 'HP', `+${PLAYER_STAT_POINT_VALUES.maxHp}`],
            ['attack', 'Attack', `+${PLAYER_STAT_POINT_VALUES.attack}`],
            ['defense', 'Defense', `+${PLAYER_STAT_POINT_VALUES.defense}`],
            ['speed', 'Speed', `+${PLAYER_STAT_POINT_VALUES.speed}`],
          ].map(([stat, label, value]) => (
            <button
              key={stat}
              className="rounded border border-[#d8b765]/20 bg-[#151a13] px-2 py-2 text-left text-xs font-bold text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={(save.progression.stat_points ?? 0) <= 0}
              onClick={() => gameBridge.emit('command:allocate-player-stat', { stat })}
            >
              {label} {value} <span className="text-[#b8a986]">/ spent {allocated[stat] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-[#b8a986]">Skills learned: {(save.progression.unlocked_skills ?? []).length} / active slots {Math.min((save.progression.unlocked_skills ?? []).length, ACTIVE_SKILL_SLOT_LIMIT)}/{ACTIVE_SKILL_SLOT_LIMIT}</p>
      {fieldLog.length ? (
        <div className="mt-2 text-xs text-[#b8a986]">
          {fieldLog.map((entry) => <p key={`${entry.source_id}-${entry.name}-${entry.acquired_at}`}>{entry.name}</p>)}
        </div>
      ) : <p className="text-xs text-[#b8a986]">No field rewards logged yet.</p>}
    </Panel>
  )
}

function CompanionProgressionPanel({ save, monsterId, actorView, onActorChange }) {
  const definition = COMPANION_DEFINITIONS[monsterId]
  const progression = companionProgressionState(structuredClone(save), monsterId)
  const stats = companionStatsForSave(structuredClone(save), monsterId)
  const equipmentStats = companionEquipmentStatTotals(save, monsterId)
  const next = nextCompanionLevelThreshold(progression.level)
  const runtime = save.companions.runtime?.[monsterId]
  const allocated = progression.allocated_stats ?? {}
  return (
    <Panel title="Progression">
      <ActorToggle value={actorView} onChange={onActorChange} />
      <p>{definition.name}</p>
      <p>Level {progression.level}</p>
      <p>XP {progression.total_xp}{next ? ` / ${next.totalXp}` : ''}</p>
      <div className="mt-3 rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
        <p className="font-bold text-[#fff6df]">Nilalang Stats</p>
        <DetailRows rows={[
          ['HP', `${runtime?.hp ?? stats.maxHp}/${stats.maxHp}`],
          ['Attack', stats.attack],
          ['Defense', stats.defense],
          ['Speed', stats.speed],
          ['Equipment', formatStats(equipmentStats)],
        ]} />
      </div>
      <div className="mt-3 rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-[#fff6df]">Stat Points</p>
          <span className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]">{progression.stat_points ?? 0} available</span>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            ['maxHp', 'HP', `+${COMPANION_STAT_POINT_VALUES.maxHp}`],
            ['attack', 'Attack', `+${COMPANION_STAT_POINT_VALUES.attack}`],
            ['defense', 'Defense', `+${COMPANION_STAT_POINT_VALUES.defense}`],
            ['speed', 'Speed', `+${COMPANION_STAT_POINT_VALUES.speed}`],
          ].map(([stat, label, value]) => (
            <button
              key={stat}
              className="rounded border border-[#d8b765]/20 bg-[#151a13] px-2 py-2 text-left text-xs font-bold text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={(progression.stat_points ?? 0) <= 0}
              onClick={() => gameBridge.emit('command:allocate-companion-stat', { monster_id: monsterId, stat })}
            >
              {label} {value} <span className="text-[#b8a986]">/ spent {allocated[stat] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function ActiveInfoPanel({ activeInfo, save, debug, onClose }) {
  if (!activeInfo) return null
  const title = infoTabs.find((tab) => tab.id === activeInfo)?.label ?? 'Panel'
  return (
    <div className="absolute left-4 top-4 z-10 max-h-[calc(84vh-2rem)] w-[min(440px,calc(100%-2rem))] overflow-auto rounded-lg border border-[#d8b765]/35 bg-[#11180f]/95 p-4 shadow-2xl backdrop-blur">
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
        {activeInfo === 'skills' ? <SkillTreePanel save={save} /> : null}
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

function AssetIcon({ src, alt, size = 'md' }) {
  const sizeClass = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  }[size]
  if (!src) {
    return <span className={`${sizeClass} shrink-0 rounded-md border border-[#d8b765]/20 bg-[#d8b765]/10`} aria-hidden="true" />
  }
  return (
    <span className={`${sizeClass} flex shrink-0 items-center justify-center rounded-md border border-[#d8b765]/20 bg-[#070b07]/70 p-1`}>
      <img className="max-h-full max-w-full object-contain" src={src} alt={alt} draggable="false" />
    </span>
  )
}

function InventoryPanel({ save }) {
  const [selectedItemId, setSelectedItemId] = useState(null)
  const entries = Object.entries(save.inventory.items)
    .map(([itemId, quantity]) => ({ item: itemById(itemId), itemId, quantity }))
    .filter((entry) => entry.quantity > 0)
  const selectedEntry = entries.find((entry) => entry.itemId === selectedItemId) ?? entries[0]
  const selectedItem = selectedEntry?.item
  return (
    <Panel title="Inventory">
      {entries.length ? (
        <>
          <div className="space-y-2">
            {entries.map(({ item, itemId, quantity }) => (
              <button
                key={itemId}
                className={`flex w-full items-start justify-between gap-3 rounded-md border p-2 text-left ${selectedEntry?.itemId === itemId ? 'border-[#d8b765]/60 bg-[#1d2418]' : 'border-[#d8b765]/15 bg-[#0f140d]'}`}
                onClick={() => setSelectedItemId((current) => current === itemId ? null : itemId)}
              >
                <div className="flex items-center gap-3">
                  <AssetIcon src={itemIconPath(itemId)} alt={item?.name ?? itemId} />
                  <div>
                    <p className="font-bold text-[#fff6df]">{item?.name ?? itemId}</p>
                    <p className="text-xs text-[#b8a986]">{item?.category ?? 'Item'}</p>
                  </div>
                </div>
                <span className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]">x{quantity}</span>
              </button>
            ))}
          </div>
          {selectedItem ? (
            <DetailBox title={selectedItem.name}>
              <div className="mb-2 flex items-center gap-3">
                <AssetIcon src={itemIconPath(selectedEntry.itemId)} alt={selectedItem.name} size="lg" />
                <p>{selectedItem.description}</p>
              </div>
              <DetailRows rows={[
                ['Category', selectedItem.category],
                ['Quantity', selectedEntry.quantity],
                ['Buy', selectedItem.price ? `${selectedItem.price} Pilak` : 'Not sold'],
                ['Sell', `${selectedItem.sellPrice ?? 0} Pilak`],
                ['Effect', formatEffect(selectedItem.effect)],
              ]} />
              {selectedItem.category === 'Consumable' ? <FieldUseButtons save={save} itemId={selectedEntry.itemId} /> : null}
            </DetailBox>
          ) : null}
        </>
      ) : <p className="text-xs text-[#b8a986]">No items yet.</p>}
    </Panel>
  )
}

function EquipmentPanel({ save }) {
  const [actorView, setActorView] = useState('character')
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null)
  const activeCompanionId = save.companions.active_companion_id
  if (actorView === 'companion' && activeCompanionId) {
    return <CompanionEquipmentPanel save={save} monsterId={activeCompanionId} actorView={actorView} onActorChange={setActorView} />
  }
  const totals = equipmentStatTotals(save)
  const slots = Object.entries(save.equipment.slots)
  const ownedEquipment = save.inventory.equipment.map((equipmentId) => equipmentById(equipmentId)).filter(Boolean)
  const equippedIds = Object.values(save.equipment.slots).filter(Boolean)
  const playerEquipment = ownedEquipment.filter((equipment) => equipment.target !== 'companion')
  const selectedEquipment = equipmentById(selectedEquipmentId) ?? playerEquipment[0] ?? equipmentById(equippedIds[0])
  return (
    <Panel title="Equipment">
      <ActorToggle value={actorView} onChange={setActorView} companionDisabled={!activeCompanionId} />
      <div className="space-y-2">
        {slots.map(([slot, equipmentId]) => {
          const equipment = equipmentById(equipmentId)
          return (
            <div
              key={slot}
              className={`w-full rounded-md border p-2 text-left ${selectedEquipment?.id === equipmentId ? 'border-[#d8b765]/60 bg-[#1d2418]' : 'border-[#d8b765]/15 bg-[#0f140d]'}`}
            >
              <button
                className="w-full text-left"
                disabled={!equipment}
                onClick={() => setSelectedEquipmentId((current) => current === equipmentId ? null : equipmentId)}
              >
                <p className="text-xs font-bold uppercase text-[#b8a986]">{slot}</p>
                <span className="mt-1 flex items-center gap-2">
                  {equipment ? <AssetIcon src={equipmentIconPath(equipment.id)} alt={equipment.name} size="sm" /> : null}
                  <span className="font-bold text-[#fff6df]">{equipment?.name ?? 'Empty'}</span>
                </span>
              </button>
              {equipment ? (
                <button
                  className="mt-2 rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]"
                  onClick={() => gameBridge.emit('command:unequip-item', { slot })}
                >
                  Unequip
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-[#b8a986]">
        Stats: HP +{totals.maxHp ?? 0}, ATK +{totals.attack ?? 0}, DEF +{totals.defense ?? 0}, SPD +{totals.speed ?? 0}
      </p>
      {ownedEquipment.length ? (
        <div className="mt-3 grid gap-2">
          {ownedEquipment.map((equipment) => {
            const equipped = equippedIds.includes(equipment.id)
            const companionOnly = equipment.target === 'companion'
            return (
              <div key={equipment.id} className={`rounded-md border p-2 ${selectedEquipment?.id === equipment.id ? 'border-[#d8b765]/60 bg-[#1d2418]' : 'border-[#d8b765]/20 bg-[#0f140d]'}`}>
                <button
                  className="flex w-full items-center gap-3 text-left text-xs font-bold text-[#f7d98b]"
                  onClick={() => setSelectedEquipmentId((current) => current === equipment.id ? null : equipment.id)}
                >
                  <AssetIcon src={equipmentIconPath(equipment.id)} alt={equipment.name} />
                  <span>{equipment.name} {equipped ? '/ Equipped' : companionOnly ? '/ Companion' : ''}</span>
                </button>
                {!companionOnly ? (
                  <button
                    className="mt-2 rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]"
                    onClick={() => gameBridge.emit('command:equip-item', { equipment_id: equipment.id })}
                  >
                    Equip
                  </button>
                ) : <p className="mt-2 text-xs text-[#b8a986]">Equip from Companion panel.</p>}
              </div>
            )
          })}
        </div>
      ) : null}
      {selectedEquipment ? (
        <DetailBox title={selectedEquipment.name}>
          <div className="mb-2 flex items-center gap-3">
            <AssetIcon src={equipmentIconPath(selectedEquipment.id)} alt={selectedEquipment.name} size="lg" />
            <p>{selectedEquipment.description}</p>
          </div>
          <DetailRows rows={[
            ['Slot', selectedEquipment.slot],
            ['Stats', formatStats(selectedEquipment.stats)],
            ['Buy', `${selectedEquipment.price ?? 0} Pilak`],
            ['Sell', `${selectedEquipment.sellPrice ?? 0} Pilak`],
            ['Target', selectedEquipment.target === 'companion' ? 'Companion' : 'Player'],
            ['State', equippedIds.includes(selectedEquipment.id) ? 'Equipped' : 'Owned'],
          ]} />
        </DetailBox>
      ) : null}
      <FieldPotsPanel save={save} />
    </Panel>
  )
}

function CompanionEquipmentPanel({ save, monsterId, actorView, onActorChange }) {
  const definition = COMPANION_DEFINITIONS[monsterId]
  const equipment = save.companions.equipment?.[monsterId] ?? {}
  const equipmentTotals = companionEquipmentStatTotals(save, monsterId)
  const compatibleEquipment = save.inventory.equipment
    .map((equipmentId) => equipmentById(equipmentId))
    .filter((item) => item?.target === 'companion' && definition.equipmentSlots.includes(item.slot))
  return (
    <Panel title="Equipment">
      <ActorToggle value={actorView} onChange={onActorChange} />
      <p className="font-bold text-[#fff6df]">{definition.name}</p>
      <p className="text-xs text-[#b8a986]">Gear bonuses: {formatStats(equipmentTotals)}</p>
      <div className="mt-3 space-y-2">
        {definition.equipmentSlots.map((slot) => {
          const equipmentId = equipment[slot]
          const item = equipmentById(equipmentId)
          return (
            <div key={slot} className="rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
              <p className="text-xs font-bold uppercase text-[#b8a986]">{slot}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item ? <AssetIcon src={equipmentIconPath(item.id)} alt={item.name} size="sm" /> : null}
                  <span className="font-bold text-[#fff6df]">{item?.name ?? 'Empty'}</span>
                </div>
                {item ? (
                  <button
                    className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]"
                    onClick={() => gameBridge.emit('command:unequip-companion-item', { monster_id: monsterId, slot })}
                  >
                    Unequip
                  </button>
                ) : null}
              </div>
              {item ? <p className="mt-1 text-xs text-[#b8a986]">{formatStats(item.stats)}</p> : null}
            </div>
          )
        })}
      </div>
      <div className="mt-3 grid gap-2">
        {compatibleEquipment.length ? compatibleEquipment.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-2 rounded border border-[#d8b765]/20 bg-[#151a13] px-2 py-2 text-left text-xs font-bold text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={equipment[item.slot] === item.id}
            onClick={() => gameBridge.emit('command:equip-companion-item', { monster_id: monsterId, equipment_id: item.id })}
          >
            <AssetIcon src={equipmentIconPath(item.id)} alt={item.name} size="sm" />
            <span>{equipment[item.slot] === item.id ? 'Equipped' : 'Equip'} {item.name} / {item.slot} / {formatStats(item.stats)}</span>
          </button>
        )) : <p className="text-xs text-[#b8a986]">No compatible companion gear owned.</p>}
      </div>
      <FieldPotsPanel save={save} />
    </Panel>
  )
}

function FieldPotsPanel({ save }) {
  const consumables = Object.entries(save.inventory.items)
    .map(([itemId, quantity]) => ({ itemId, quantity, item: itemById(itemId) }))
    .filter((entry) => entry.quantity > 0 && entry.item?.category === 'Consumable')
  if (!consumables.length) return null
  return (
    <DetailBox title="Field Pots">
      <div className="grid gap-2">
        {consumables.map(({ itemId, quantity, item }) => (
          <div key={`field-pot-${itemId}`} className="rounded-md border border-[#d8b765]/15 bg-[#0f140d] p-2">
            <div className="flex items-center gap-2">
              <AssetIcon src={itemIconPath(itemId)} alt={item.name} size="sm" />
              <div>
                <p className="font-black text-[#fff6df]">{item.name} x{quantity}</p>
                <p className="text-xs text-[#b8a986]">{formatEffect(item.effect)}</p>
              </div>
            </div>
            <FieldUseButtons save={save} itemId={itemId} compact />
          </div>
        ))}
      </div>
    </DetailBox>
  )
}

function FieldUseButtons({ save, itemId, compact = false }) {
  const item = itemById(itemId)
  const companionId = save.companions.active_companion_id
  const companion = companionId ? COMPANION_DEFINITIONS[companionId] : null
  if (!item || item.category !== 'Consumable') return null
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? 'mt-2' : 'mt-3'}`}>
      <button
        className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b] disabled:opacity-45"
        disabled={item.effect?.type !== 'heal'}
        onClick={() => gameBridge.emit('command:use-field-item', { item_id: itemId, target: 'player' })}
      >
        Use on Player
      </button>
      <button
        className="rounded bg-[#78d7a3]/15 px-2 py-1 text-xs font-black text-[#bdf5d2] disabled:opacity-45"
        disabled={!companion || item.effect?.type !== 'heal'}
        onClick={() => gameBridge.emit('command:use-field-item', { item_id: itemId, target: 'companion' })}
      >
        Use on {companion?.name ?? 'Companion'}
      </button>
    </div>
  )
}

function SkillTreePanel({ save }) {
  const [actorView, setActorView] = useState('character')
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const activeCompanionId = save.companions.active_companion_id
  if (actorView === 'companion' && activeCompanionId) {
    return <CompanionSkillPanel save={save} monsterId={activeCompanionId} actorView={actorView} onActorChange={setActorView} />
  }
  const track = classTrackForProgression(save.progression)
  const unlocked = save.progression.unlocked_skills ?? []
  const activeSkills = playerActiveSkills(structuredClone(save))
  const selectedUnlock = track.skillUnlocks.find((unlock) => unlock.skillId === selectedSkillId) ?? track.skillUnlocks.find((unlock) => unlocked.includes(unlock.skillId)) ?? track.skillUnlocks[0]
  const selectedSkill = selectedUnlock ? skillById(selectedUnlock.skillId) : null
  const selectedStatus = selectedSkill?.statusEffectId ? statusById(selectedSkill.statusEffectId) : null
  return (
    <Panel title="Skills & Class">
      <ActorToggle value={actorView} onChange={setActorView} companionDisabled={!activeCompanionId} />
      <p className="font-bold text-[#fff6df]">{track.name}</p>
      <p className="text-xs text-[#b8a986]">{track.description}</p>
      <p className="mt-2 text-xs text-[#d8b765]">Choose up to {ACTIVE_SKILL_SLOT_LIMIT} active skills for battle. Learned skills can stay in reserve.</p>
      <div className="mt-4 space-y-2">
        {track.skillUnlocks.map((unlock) => {
          const skill = skillById(unlock.skillId)
          const isUnlocked = unlocked.includes(unlock.skillId)
          const activeSlot = isUnlocked ? activeSkills.indexOf(unlock.skillId) + 1 : null
          return (
            <div
              key={unlock.skillId}
              className={`w-full rounded-md border p-3 text-left ${selectedSkill?.id === unlock.skillId ? 'border-[#d8b765]/70 bg-[#1d2418]' : isUnlocked ? 'border-[#61c47c]/35 bg-[#102014]' : 'border-[#d8b765]/15 bg-[#0f140d]'}`}
              onClick={() => setSelectedSkillId((current) => current === unlock.skillId ? null : unlock.skillId)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[#fff6df]">{skill.name}</p>
                  <p className="text-xs text-[#b8a986]">Level {unlock.level} / {skill.category} / {skill.damageType}{activeSlot > 0 ? ` / Slot ${activeSlot}` : isUnlocked ? ' / Reserve' : ''}</p>
                </div>
                <span className={`rounded px-2 py-1 text-xs font-black ${isUnlocked ? 'bg-[#61c47c]/20 text-[#61c47c]' : 'bg-[#d8b765]/10 text-[#b8a986]'}`}>
                  {isUnlocked ? activeSlot > 0 ? 'Active' : 'Reserve' : 'Locked'}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#d9ceb7]">{skill.description}</p>
              {isUnlocked ? (
                <button
                  className="mt-2 rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={activeSlot <= 0 && activeSkills.length >= ACTIVE_SKILL_SLOT_LIMIT}
                  onClick={(event) => {
                    event.stopPropagation()
                    gameBridge.emit('command:toggle-player-skill', { skill_id: unlock.skillId })
                  }}
                >
                  {activeSlot > 0 ? 'Move to Reserve' : 'Set Active'}
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
      {selectedSkill ? (
        <DetailBox title={selectedSkill.name}>
          <p>{selectedSkill.description}</p>
          <DetailRows rows={[
            ['Unlock', `Level ${selectedUnlock.level}`],
            ['State', activeSkills.includes(selectedSkill.id) ? 'Active' : unlocked.includes(selectedSkill.id) ? 'Reserve' : 'Locked'],
            ['Category', selectedSkill.category],
            ['Type', selectedSkill.type],
            ['Damage', selectedSkill.damageType],
            ['Target', selectedSkill.targetType],
            ['Power', selectedSkill.power],
            ['Accuracy', `${selectedSkill.accuracy}%`],
            ['Cooldown', selectedSkill.cooldown ? `${selectedSkill.cooldown} turn(s)` : 'None'],
            ['Status', selectedStatus ? `${selectedStatus.name} (${selectedSkill.statusChance}%)` : 'None'],
          ]} />
          {selectedStatus ? (
            <p className="mt-2 text-xs text-[#b8a986]">{selectedStatus.description}</p>
          ) : null}
        </DetailBox>
      ) : null}
    </Panel>
  )
}

function CompanionSkillPanel({ save, monsterId, actorView, onActorChange }) {
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const definition = COMPANION_DEFINITIONS[monsterId]
  const progression = companionProgressionState(structuredClone(save), monsterId)
  const activeSkills = companionActiveSkills(structuredClone(save), monsterId)
  const selectedUnlock = definition.skillTree.find((unlock) => unlock.skillId === selectedSkillId) ?? definition.skillTree.find((unlock) => progression.unlocked_skills.includes(unlock.skillId)) ?? definition.skillTree[0]
  const selectedSkill = selectedUnlock ? skillById(selectedUnlock.skillId) : null
  const selectedStatus = selectedSkill?.statusEffectId ? statusById(selectedSkill.statusEffectId) : null
  return (
    <Panel title="Skills & Class">
      <ActorToggle value={actorView} onChange={onActorChange} />
      <p className="font-bold text-[#fff6df]">{definition.name}</p>
      <p className="text-xs text-[#b8a986]">{definition.role} companion path</p>
      <p className="mt-2 text-xs text-[#d8b765]">Choose up to {ACTIVE_SKILL_SLOT_LIMIT} active companion skills for battle.</p>
      <div className="mt-4 space-y-2">
        {definition.skillTree.map((unlock) => {
          const skill = skillById(unlock.skillId)
          const learned = progression.unlocked_skills.includes(unlock.skillId)
          const activeSlot = learned ? activeSkills.indexOf(unlock.skillId) + 1 : null
          return (
            <div
              key={unlock.skillId}
              className={`w-full rounded-md border p-3 text-left ${selectedSkill?.id === unlock.skillId ? 'border-[#d8b765]/70 bg-[#1d2418]' : learned ? 'border-[#61c47c]/35 bg-[#102014]' : 'border-[#d8b765]/15 bg-[#0f140d]'}`}
              onClick={() => setSelectedSkillId((current) => current === unlock.skillId ? null : unlock.skillId)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[#fff6df]">{skill.name}</p>
                  <p className="text-xs text-[#b8a986]">Level {unlock.level} / {skill.category} / {skill.damageType}{activeSlot > 0 ? ` / Slot ${activeSlot}` : learned ? ' / Reserve' : ''}</p>
                </div>
                <span className={`rounded px-2 py-1 text-xs font-black ${learned ? 'bg-[#61c47c]/20 text-[#61c47c]' : 'bg-[#d8b765]/10 text-[#b8a986]'}`}>
                  {learned ? activeSlot > 0 ? 'Active' : 'Reserve' : 'Locked'}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#d9ceb7]">{skill.description}</p>
              {learned ? (
                <button
                  className="mt-2 rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={activeSlot <= 0 && activeSkills.length >= ACTIVE_SKILL_SLOT_LIMIT}
                  onClick={(event) => {
                    event.stopPropagation()
                    gameBridge.emit('command:toggle-companion-skill', { monster_id: monsterId, skill_id: unlock.skillId })
                  }}
                >
                  {activeSlot > 0 ? 'Move to Reserve' : 'Set Active'}
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
      {selectedSkill ? (
        <DetailBox title={selectedSkill.name}>
          <p>{selectedSkill.description}</p>
          <DetailRows rows={[
            ['Unlock', `Level ${selectedUnlock.level}`],
            ['State', activeSkills.includes(selectedSkill.id) ? 'Active' : progression.unlocked_skills.includes(selectedSkill.id) ? 'Reserve' : 'Locked'],
            ['Category', selectedSkill.category],
            ['Type', selectedSkill.type],
            ['Damage', selectedSkill.damageType],
            ['Target', selectedSkill.targetType],
            ['Power', selectedSkill.power],
            ['Accuracy', `${selectedSkill.accuracy}%`],
            ['Cooldown', selectedSkill.cooldown ? `${selectedSkill.cooldown} turn(s)` : 'None'],
            ['Status', selectedStatus ? `${selectedStatus.name} (${selectedSkill.statusChance}%)` : 'None'],
          ]} />
          {selectedStatus ? <p className="mt-2 text-xs text-[#b8a986]">{selectedStatus.description}</p> : null}
        </DetailBox>
      ) : null}
    </Panel>
  )
}

function DetailBox({ title, children }) {
  return (
    <div className="mt-4 rounded-md border border-[#d8b765]/25 bg-[#0f140d] p-3">
      <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#d8b765]">{title}</p>
      <div className="space-y-2 text-xs text-[#d9ceb7]">{children}</div>
    </div>
  )
}

function DetailRows({ rows }) {
  return (
    <dl className="grid grid-cols-[92px_1fr] gap-x-3 gap-y-1">
      {rows.filter(([, value]) => value !== undefined && value !== null && value !== '').map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="font-bold text-[#b8a986]">{label}</dt>
          <dd className="text-[#fff6df]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function formatStats(stats = {}) {
  const entries = Object.entries(stats)
  if (!entries.length) return 'None'
  return entries.map(([stat, amount]) => `${stat} +${amount}`).join(', ')
}

function formatEffect(effect) {
  if (!effect) return 'None'
  if (effect.type === 'heal') return `Heal ${effect.amount} HP`
  if (effect.type === 'cleanse') return 'Cleanse status effects'
  return effect.type
}

function BattleCommandBar({ battle }) {
  const [potsOpen, setPotsOpen] = useState(false)
  const [pendingSkill, setPendingSkill] = useState(null)
  const state = battle.state
  const playerCanAct = state.turn === 'player' && state.phase !== 'ended'
  const companionCanAct = state.turn === 'companion' && state.phase !== 'ended' && state.companion?.hp > 0
  const consumables = Object.entries(state.inventory?.items ?? {})
    .filter(([itemId, quantity]) => quantity > 0 && ITEM_DEFINITIONS[itemId]?.category === 'Consumable')
  const activeActor = state.turn === 'companion' && state.companion ? state.companion : state.player
  const skillPrefix = state.turn === 'companion' ? 'companion-skill' : 'skill'
  const canUseSkill = state.turn === 'companion' ? companionCanAct : playerCanAct
  const livingEnemies = (state.enemies?.length ? state.enemies : [state.enemy]).filter((enemy) => enemy.hp > 0)
  const friendlyTargets = [
    { id: 'player', name: state.player.name, hp: state.player.hp, maxHp: state.player.maxHp },
    state.companion?.hp > 0 ? { id: 'companion', name: state.companion.name, hp: state.companion.hp, maxHp: state.companion.maxHp } : null,
  ].filter(Boolean)
  const enemySummary = (state.enemies?.length ? state.enemies : [state.enemy])
    .map((enemy) => `${enemy.name} ${enemy.hp}/${enemy.maxHp} HP`)
    .join(' / ')
  const chooseSkill = useCallback((skillId) => {
    const skill = skillById(skillId)
    if (skill.targetType === 'Ally') {
      setPotsOpen(false)
      if (friendlyTargets.length > 1) {
        setPendingSkill({ prefix: skillPrefix, skillId, targetKind: 'ally' })
        return
      }
      setPendingSkill(null)
      gameBridge.emit('command:battle-action', { action: `${skillPrefix}:${skillId}:${friendlyTargets[0]?.id ?? 'player'}` })
      return
    }
    if (skill.targetType === 'Single Enemy' && livingEnemies.length > 1) {
      setPotsOpen(false)
      setPendingSkill({ prefix: skillPrefix, skillId, targetKind: 'enemy' })
      return
    }
    setPendingSkill(null)
    gameBridge.emit('command:battle-action', { action: `${skillPrefix}:${skillId}` })
  }, [friendlyTargets, livingEnemies, skillPrefix])
  const chooseTarget = useCallback((targetId) => {
    if (!pendingSkill) return
    gameBridge.emit('command:battle-action', { action: `${pendingSkill.prefix}:${pendingSkill.skillId}:${targetId}` })
    setPendingSkill(null)
  }, [pendingSkill])
  useEffect(() => {
    setPendingSkill(null)
  }, [state.turn, state.phase])
  useEffect(() => {
    if (pendingSkill || !canUseSkill) return undefined
    function handleSkillHotkeys(event) {
      if (event.repeat) return
      const tagName = event.target?.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return
      const skillIndex = Number(event.key) - 1
      const skillId = activeActor.skills[skillIndex]
      if (!skillId) return
      event.preventDefault()
      event.stopImmediatePropagation()
      chooseSkill(skillId)
    }
    window.addEventListener('keydown', handleSkillHotkeys, { capture: true })
    return () => window.removeEventListener('keydown', handleSkillHotkeys, { capture: true })
  }, [activeActor.skills, canUseSkill, chooseSkill, pendingSkill])
  useEffect(() => {
    if (!pendingSkill) return undefined
    function handleTargetHotkeys(event) {
      if (event.repeat) return
      const targetIndex = Number(event.key) - 1
      const targets = pendingSkill.targetKind === 'ally' ? friendlyTargets : livingEnemies
      const target = targets[targetIndex]
      if (!target) return
      event.preventDefault()
      event.stopImmediatePropagation()
      chooseTarget(target.id)
    }
    window.addEventListener('keydown', handleTargetHotkeys, { capture: true })
    return () => window.removeEventListener('keydown', handleTargetHotkeys, { capture: true })
  }, [pendingSkill, friendlyTargets, livingEnemies, chooseTarget])
  return (
    <div className="rounded-lg border border-[#bd4c5f]/45 bg-[#11180f]/95 p-3 shadow-2xl">
      <div className="grid gap-3 lg:grid-cols-[220px_1fr]">
        <div className="text-sm text-[#d9ceb7]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#f7d98b]">Battle Commands</p>
          <p className="font-black text-[#fff6df]">{battle.monsters?.length > 1 ? 'Wild Nilalang Pair' : battle.monster.name}</p>
          <p className="text-xs text-[#b8a986]">{enemySummary}</p>
          <p>{state.player.hp}/{state.player.maxHp} HP / {state.turn === 'player' ? 'Your turn' : state.turn === 'companion' ? `${state.companion.name}'s turn` : 'Waiting'}</p>
          {state.companion ? <p>{state.companion.name} {state.companion.hp}/{state.companion.maxHp} HP</p> : null}
        </div>
        <div className="space-y-2">
          {!pendingSkill ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {activeActor.skills.map((skillId, index) => {
                const skill = skillById(skillId)
                const cooldown = activeActor.cooldowns[skillId] ?? 0
                return (
                  <BattleButton
                    key={`${activeActor.id}-${skillId}`}
                    disabled={!canUseSkill || cooldown > 0}
                    onClick={() => chooseSkill(skillId)}
                  >
                    <span>{index + 1}. {skill.name}</span>
                    <small>{cooldown > 0 ? `Cooldown ${cooldown}` : `${skill.category} / ${skill.damageType}`}</small>
                  </BattleButton>
                )
              })}
              <BattleButton disabled={!playerCanAct || consumables.length === 0} onClick={() => setPotsOpen((current) => !current)}>
                <span>Pots</span>
                <small>{consumables.length ? 'Open items panel' : 'No usable pots'}</small>
              </BattleButton>
              <BattleButton disabled={!playerCanAct} onClick={() => gameBridge.emit('command:battle-action', { action: 'flee' })}>
                <span>Flee</span>
                <small>{battle.monster.fleeBlocked ? 'Blocked here' : 'Return to map'}</small>
              </BattleButton>
            </div>
          ) : (
            <div className="rounded-md border border-[#d8b765]/25 bg-[#0f140d] p-2">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#d8b765]">Choose Target</p>
                  <p className="text-xs text-[#b8a986]">
                    Press 1-{pendingSkill.targetKind === 'ally' ? friendlyTargets.length : livingEnemies.length} or click a {pendingSkill.targetKind === 'ally' ? 'friendly target' : 'Nilalang'}.
                  </p>
                </div>
                <button className="rounded border border-[#d8b765]/30 px-2 py-1 text-xs font-bold text-[#f7d98b]" onClick={() => setPendingSkill(null)}>Close</button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {(pendingSkill.targetKind === 'ally' ? friendlyTargets : livingEnemies).map((target, index) => (
                  <BattleButton key={`target-${target.id}`} disabled={!canUseSkill} onClick={() => chooseTarget(target.id)}>
                    <span>{index + 1}. {target.name}</span>
                    <small>{target.hp}/{target.maxHp} HP</small>
                  </BattleButton>
                ))}
              </div>
            </div>
          )}
          {!pendingSkill && potsOpen ? (
            <div className="rounded-md border border-[#d8b765]/25 bg-[#0f140d] p-2">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-wide text-[#d8b765]">Potions</p>
                <button className="rounded border border-[#d8b765]/30 px-2 py-1 text-xs font-bold text-[#f7d98b]" onClick={() => setPotsOpen(false)}>Close</button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {consumables.map(([itemId, quantity]) => {
                  const item = itemById(itemId)
                  return (
                    <div key={`pot-${itemId}`} className="rounded-md border border-[#d8b765]/15 p-2 text-xs text-[#d9ceb7]">
                      <div className="flex items-center gap-2">
                        <AssetIcon src={itemIconPath(itemId)} alt={item?.name ?? itemId} size="sm" />
                        <p className="font-black text-[#fff6df]">{item?.name ?? itemId} x{quantity}</p>
                      </div>
                      <p className="text-[#b8a986]">{formatEffect(item?.effect)}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b] disabled:opacity-45"
                          disabled={!playerCanAct}
                          onClick={() => {
                            setPotsOpen(false)
                            gameBridge.emit('command:battle-action', { action: `item:${itemId}:player` })
                          }}
                        >
                          Use on Player
                        </button>
                        {state.companion ? (
                          <button
                            className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b] disabled:opacity-45"
                            disabled={!playerCanAct || state.companion.hp <= 0}
                            onClick={() => {
                              setPotsOpen(false)
                              gameBridge.emit('command:battle-action', { action: `item:${itemId}:companion` })
                            }}
                          >
                            Use on {state.companion.name}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}
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
      <p className="mt-2 text-xs text-[#b8a986]">Use Progression for stats, Equipment for companion gear, and Skills for companion loadout details.</p>
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
                  {!bonded && !state.eligible ? (
                    <p className="mt-1 text-xs text-[#d8b765]">
                      Win more Aghoy encounters, then bond after the Batibat story gate.
                    </p>
                  ) : null}
                </div>
                {state.eligible ? (
                  <button className="rounded-md bg-[#d8b765] px-3 py-2 text-xs font-black text-[#11180f]" onClick={() => gameBridge.emit('command:bond-companion', { monster_id: monsterId })}>
                    Bond
                  </button>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-[#d9ceb7]">{definition.bondPrompt}</p>
              {bonded ? <p className="mt-2 text-xs font-bold text-[#61c47c]">Bonded and ready for party systems.</p> : null}
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

function InteractionModal({ panel, onAdvance, onChoose, onClose }) {
  const title = panel.speaker ?? panel.title ?? panel.entity_id
  const pageIndex = panel.pageIndex ?? 0
  const pages = panel.pages ?? [panel.text ?? panel.body]
  const isDialogue = panel.type === 'dialogue'
  const isLastPage = pageIndex >= pages.length - 1
  const showChoices = isDialogue && isLastPage && panel.choices?.length && !panel.selectedChoice
  const body = panel.selectedChoice?.response ?? pages[pageIndex]
  const portrait = dialoguePortraitPath(panel.entity_id)
  return (
    <div className="absolute inset-x-6 bottom-6 z-50 mx-auto max-w-4xl rounded-lg border border-[#d8b765]/45 bg-[#11180f]/98 p-4 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-4">
          {isDialogue && portrait ? (
            <img className="h-20 w-20 shrink-0 rounded-md border border-[#d8b765]/35 object-cover" src={portrait} alt="" />
          ) : isDialogue ? (
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8b765]/35 bg-[#253322] font-black text-[#f7d98b]">
              {String(title).split(/\s+/).map((part) => part[0]).join('').slice(0, 2)}
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">{panel.type}</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{title}</h2>
          {panel.context ? <p className="mt-1 text-xs italic text-[#9ea88e]">{panel.context}</p> : null}
          <p className="mt-3 text-sm leading-6 text-[#d9ceb7]">{body}</p>
          {showChoices ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {panel.choices.map((choice) => (
                <button
                  key={choice.label}
                  className="rounded-md border border-[#d8b765]/35 bg-[#182117] px-3 py-2 text-left text-sm font-bold text-[#f7d98b] hover:border-[#d8b765]"
                  onClick={() => onChoose(choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          ) : null}
          {isDialogue ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-[#8f987f]">
                {panel.selectedChoice ? 'Response' : `${Math.min(pageIndex + 1, pages.length)} / ${pages.length}`}
              </span>
              {!showChoices ? (
                <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onAdvance}>
                  {isLastPage || panel.selectedChoice ? 'Close' : 'Continue'}
                </button>
              ) : null}
            </div>
          ) : null}
          {panel.monster_id ? <p className="mt-2 text-xs text-[#b8a986]">Source: {panel.monster_id}</p> : null}
          </div>
        </div>
        <button aria-label="Close dialogue" className="rounded-md border border-[#d8b765]/35 px-3 py-2 text-sm font-bold text-[#f7d98b]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function advanceDialogue(panel) {
  if (!panel) return null
  if (panel.type !== 'dialogue') return null
  const pageIndex = panel.pageIndex ?? 0
  const pages = panel.pages ?? [panel.text ?? panel.body]
  const isLastPage = pageIndex >= pages.length - 1
  if (isLastPage && panel.choices?.length && !panel.selectedChoice) return panel
  if (panel.selectedChoice || isLastPage) return null
  return { ...panel, pageIndex: pageIndex + 1 }
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
              const icon = entry.kind === 'equipment' ? equipmentIconPath(entry.id) : itemIconPath(entry.id)
              return (
                <button
                  key={`${entry.kind}-${entry.id}`}
                  className="rounded-md border border-[#d8b765]/20 bg-[#151a13] p-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={pilak < entry.price}
                  onClick={() => gameBridge.emit('command:buy-shop-entry', { shop_id: shop.id, entry_index: index })}
                >
                  <span className="flex items-center gap-3">
                    <AssetIcon src={icon} alt={displayName(entry)} />
                    <span>
                      <span className="block font-black text-[#fff6df]">{displayName(entry)} / {entry.price} Pilak</span>
                      <span className="text-xs text-[#b8a986]">{item?.description}{owned ? ' / Owned' : ''}</span>
                    </span>
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
              const output = recipe.output.kind === 'equipment' ? equipmentById(recipe.output.id) : itemById(recipe.output.id)
              const outputTarget = recipe.output.kind === 'equipment' && output?.target === 'companion' ? 'Companion Gear' : recipe.output.kind === 'equipment' ? 'Player Gear' : 'Item'
              const outputIcon = recipe.output.kind === 'equipment' ? equipmentIconPath(recipe.output.id) : itemIconPath(recipe.output.id)
              return (
                <button
                  key={recipe.id}
                  className="rounded-md border border-[#d8b765]/20 bg-[#151a13] p-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={missing || pilakMissing}
                  onClick={() => gameBridge.emit('command:craft-recipe', { recipe_id: recipe.id })}
                >
                  <span className="mb-2 flex items-center gap-3">
                    <AssetIcon src={outputIcon} alt={output?.name ?? recipe.output.id} />
                    <span>
                      <span className="block font-black text-[#fff6df]">{recipe.name}</span>
                      <span className="block text-xs text-[#d8b765]">Creates: {output?.name ?? recipe.output.id} / {outputTarget}</span>
                    </span>
                  </span>
                  <span className="block text-xs text-[#b8a986]">{recipe.description}</span>
                  <span className="mt-2 flex flex-wrap gap-2 text-xs text-[#f7d98b]">
                    {recipe.ingredients.map((ingredient) => (
                      <span key={`${recipe.id}-${ingredient.id}`} className="inline-flex items-center gap-1 rounded bg-[#d8b765]/10 px-2 py-1">
                        <AssetIcon src={itemIconPath(ingredient.id)} alt={itemById(ingredient.id)?.name ?? ingredient.id} size="sm" />
                        <span>{itemById(ingredient.id)?.name ?? ingredient.id} {save.inventory.items[ingredient.id] ?? 0}/{ingredient.quantity}</span>
                      </span>
                    ))}
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
  const skillUnlocks = rewards.skillUnlocks ?? []
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-3xl rounded-lg border border-[#d8b765]/40 bg-[#11180f] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#d8b765]">Battle Result</p>
          <h2 className="mt-1 text-xl font-black text-[#fff6df]">{result.name} / {result.result}</h2>
          <div className="mt-3 grid gap-1 text-sm leading-6 text-[#d9ceb7]">
            <p>XP gained: {rewards.xp ?? 0}{rewards.levelUp ? ` / Level ${rewards.levelAfter}` : ''}</p>
            {rewards.statPointsGained ? <p>Stat points gained: +{rewards.statPointsGained}</p> : null}
            {rewards.companion?.xp ? <p>Companion XP gained: {rewards.companion.xp}{rewards.companion.levelUp ? ` / Level ${rewards.companion.levelAfter}` : ''}</p> : null}
            {rewards.companion?.statPointsGained ? <p>Companion stat points gained: +{rewards.companion.statPointsGained}</p> : null}
            {currencies.map(([currency, amount]) => <p key={currency}>{currency}: +{amount}</p>)}
            {(rewards.fieldDrops ?? []).map((drop) => <p key={drop}>Field note: {drop}</p>)}
            {skillUnlocks.map((skill) => <p key={skill.skill_id}>Skill learned: {skill.name}</p>)}
            <p className="text-xs text-[#b8a986]">{rewards.notes}</p>
          </div>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
