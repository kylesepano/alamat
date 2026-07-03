import { useEffect, useMemo, useState } from 'react'
import { AlamatGame } from '../game/AlamatGame'
import { gameBridge } from '../game/bridges/ReactPhaserBridge'
import { COMPANION_DEFINITIONS, companionActiveSkills, companionBondState, companionEquipmentStatTotals, companionProgressionState, companionStatsForSave, nextCompanionLevelThreshold } from '../game/data/companionRuntimeData'
import { ACTIVE_SKILL_SLOT_LIMIT, skillById, statusById } from '../game/data/combatRuntimeData'
import { EQUIPMENT_DEFINITIONS, ITEM_DEFINITIONS, RECIPE_DEFINITIONS, SHOP_DEFINITIONS, displayName, equipmentById, equipmentStatTotals, itemById } from '../game/data/inventoryRuntimeData'
import { classTrackForProgression, nextLevelThreshold, playerActiveSkills } from '../game/data/progressionRuntimeData'
import { QUEST_DEFINITIONS, questProgress, trackedQuest } from '../game/data/questRuntimeData'
import { STORY_SCENES } from '../game/data/storyRuntimeData'
import { SaveSystem } from '../game/systems/SaveSystem'

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
          setPanel(null)
          return
        }
      }
      if (battle?.state?.turn === 'player' && battle.state.phase !== 'ended') {
        if (event.repeat) return
        const skillId = battle.state.player.skills[Number(key) - 1]
        if (skillId) {
          event.preventDefault()
          gameBridge.emit('command:battle-action', { action: `skill:${skillId}` })
        }
        return
      }
      if (battle?.state?.turn === 'companion' && battle.state.phase !== 'ended') {
        if (event.repeat) return
        const skillId = battle.state.companion?.skills[Number(key) - 1]
        if (skillId) {
          event.preventDefault()
          gameBridge.emit('command:battle-action', { action: `companion-skill:${skillId}` })
        }
        return
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
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_200px]">
        <main className="space-y-4">
          <div className="relative">
            <AlamatGame save={save} />
            <ActiveInfoPanel activeInfo={activeInfo} save={save} debug={debug} onClose={() => setActiveInfo(null)} />
            {panel ? <InteractionModal panel={panel} onClose={() => setPanel(null)} /> : null}
          </div>
        </main>
        <aside className="space-y-3">
          <Panel title="Controls">
            <p>Move with WASD or arrow keys.</p>
            <p>Interact with Space. Press Space again to close dialogue.</p>
            <p>Esc closes open panels.</p>
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
  const track = classTrackForProgression(save.progression)
  return (
    <Panel title="Progression">
      <p>Level {save.progression.level}</p>
      <p>Class {track.name}</p>
      <p>XP {save.progression.total_xp}{next ? ` / ${next.totalXp}` : ''}</p>
      <p>Pilak {save.progression.currencies.pilak ?? 0}</p>
      <p className="text-xs text-[#b8a986]">Skills learned: {(save.progression.unlocked_skills ?? []).length} / active slots {Math.min((save.progression.unlocked_skills ?? []).length, ACTIVE_SKILL_SLOT_LIMIT)}/{ACTIVE_SKILL_SLOT_LIMIT}</p>
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
    <div className="absolute left-4 top-4 z-40 max-h-[calc(84vh-2rem)] w-[min(440px,calc(100%-2rem))] overflow-auto rounded-lg border border-[#d8b765]/35 bg-[#11180f]/95 p-4 shadow-2xl backdrop-blur">
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
                <div>
                  <p className="font-bold text-[#fff6df]">{item?.name ?? itemId}</p>
                  <p className="text-xs text-[#b8a986]">{item?.category ?? 'Item'}</p>
                </div>
                <span className="rounded bg-[#d8b765]/15 px-2 py-1 text-xs font-black text-[#f7d98b]">x{quantity}</span>
              </button>
            ))}
          </div>
          {selectedItem ? (
            <DetailBox title={selectedItem.name}>
              <p>{selectedItem.description}</p>
              <DetailRows rows={[
                ['Category', selectedItem.category],
                ['Quantity', selectedEntry.quantity],
                ['Buy', selectedItem.price ? `${selectedItem.price} Pilak` : 'Not sold'],
                ['Sell', `${selectedItem.sellPrice ?? 0} Pilak`],
                ['Effect', formatEffect(selectedItem.effect)],
              ]} />
            </DetailBox>
          ) : null}
        </>
      ) : <p className="text-xs text-[#b8a986]">No items yet.</p>}
    </Panel>
  )
}

function EquipmentPanel({ save }) {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null)
  const totals = equipmentStatTotals(save)
  const slots = Object.entries(save.equipment.slots)
  const ownedEquipment = save.inventory.equipment.map((equipmentId) => equipmentById(equipmentId)).filter(Boolean)
  const equippedIds = Object.values(save.equipment.slots).filter(Boolean)
  const playerEquipment = ownedEquipment.filter((equipment) => equipment.target !== 'companion')
  const selectedEquipment = equipmentById(selectedEquipmentId) ?? playerEquipment[0] ?? equipmentById(equippedIds[0])
  return (
    <Panel title="Equipment">
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
                <p className="font-bold text-[#fff6df]">{equipment?.name ?? 'Empty'}</p>
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
                  className="w-full text-left text-xs font-bold text-[#f7d98b]"
                  onClick={() => setSelectedEquipmentId((current) => current === equipment.id ? null : equipment.id)}
                >
                  {equipment.name} {equipped ? '/ Equipped' : companionOnly ? '/ Companion' : ''}
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
          <p>{selectedEquipment.description}</p>
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
    </Panel>
  )
}

function SkillTreePanel({ save }) {
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const track = classTrackForProgression(save.progression)
  const unlocked = save.progression.unlocked_skills ?? []
  const activeSkills = playerActiveSkills(structuredClone(save))
  const selectedUnlock = track.skillUnlocks.find((unlock) => unlock.skillId === selectedSkillId) ?? track.skillUnlocks.find((unlock) => unlocked.includes(unlock.skillId)) ?? track.skillUnlocks[0]
  const selectedSkill = selectedUnlock ? skillById(selectedUnlock.skillId) : null
  const selectedStatus = selectedSkill?.statusEffectId ? statusById(selectedSkill.statusEffectId) : null
  return (
    <Panel title="Skills & Class">
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
  const state = battle.state
  const playerCanAct = state.turn === 'player' && state.phase !== 'ended'
  const companionCanAct = state.turn === 'companion' && state.phase !== 'ended' && state.companion?.hp > 0
  const consumables = Object.entries(state.inventory?.items ?? {})
    .filter(([itemId, quantity]) => quantity > 0 && ITEM_DEFINITIONS[itemId]?.category === 'Consumable')
  const activeActor = state.turn === 'companion' && state.companion ? state.companion : state.player
  const skillPrefix = state.turn === 'companion' ? 'companion-skill' : 'skill'
  const canUseSkill = state.turn === 'companion' ? companionCanAct : playerCanAct
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-6xl rounded-lg border border-[#bd4c5f]/45 bg-[#11180f]/95 p-3 shadow-2xl backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[220px_1fr]">
        <div className="text-sm text-[#d9ceb7]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#f7d98b]">Battle Commands</p>
          <p className="font-black text-[#fff6df]">{battle.monster.name}</p>
          <p>{state.player.hp}/{state.player.maxHp} HP / {state.turn === 'player' ? 'Your turn' : state.turn === 'companion' ? `${state.companion.name}'s turn` : 'Waiting'}</p>
          {state.companion ? <p>{state.companion.name} {state.companion.hp}/{state.companion.maxHp} HP</p> : null}
        </div>
        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {activeActor.skills.map((skillId, index) => {
            const skill = skillById(skillId)
            const cooldown = activeActor.cooldowns[skillId] ?? 0
            return (
              <BattleButton
                key={`${activeActor.id}-${skillId}`}
                disabled={!canUseSkill || cooldown > 0}
                onClick={() => gameBridge.emit('command:battle-action', { action: `${skillPrefix}:${skillId}` })}
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
          {potsOpen ? (
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
                      <p className="font-black text-[#fff6df]">{item?.name ?? itemId} x{quantity}</p>
                      <p className="text-[#b8a986]">{formatEffect(item?.effect)}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b] disabled:opacity-45"
                          disabled={!playerCanAct}
                          onClick={() => gameBridge.emit('command:battle-action', { action: `item:${itemId}:player` })}
                        >
                          Use on Player
                        </button>
                        {state.companion ? (
                          <button
                            className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b] disabled:opacity-45"
                            disabled={!playerCanAct || state.companion.hp <= 0}
                            onClick={() => gameBridge.emit('command:battle-action', { action: `item:${itemId}:companion` })}
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
      <div className="mt-3 space-y-3">
        {companionIds.map((monsterId) => {
          const definition = COMPANION_DEFINITIONS[monsterId]
          const state = companionBondState(save, monsterId)
          const bonded = save.companions.collection.includes(monsterId)
          const progression = bonded ? companionProgressionState(save, monsterId) : null
          const stats = bonded ? companionStatsForSave(save, monsterId) : null
          const next = progression ? nextCompanionLevelThreshold(progression.level) : null
          const runtime = save.companions.runtime?.[monsterId]
          const equipment = save.companions.equipment?.[monsterId] ?? {}
          const equipmentTotals = bonded ? companionEquipmentStatTotals(save, monsterId) : {}
          const activeSkills = bonded ? companionActiveSkills(structuredClone(save), monsterId) : []
          const compatibleEquipment = save.inventory.equipment
            .map((equipmentId) => equipmentById(equipmentId))
            .filter((item) => item?.target === 'companion' && definition.equipmentSlots.includes(item.slot))
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
              {bonded && progression && stats ? (
                <div className="mt-3 rounded-md border border-[#d8b765]/15 bg-[#151a13] p-2 text-xs">
                  <p className="font-bold text-[#fff6df]">Level {progression.level} / HP {runtime?.hp ?? stats.maxHp}/{stats.maxHp}</p>
                  <p className="text-[#b8a986]">XP {progression.total_xp}{next ? ` / ${next.totalXp}` : ''}</p>
                  <p className="text-[#b8a986]">Stats: HP {stats.maxHp}, ATK {stats.attack}, DEF {stats.defense}, SPD {stats.speed}</p>
                  <p className="text-[#b8a986]">Active skills {activeSkills.length}/{ACTIVE_SKILL_SLOT_LIMIT}</p>
                  <div className="mt-2">
                    <p className="font-bold text-[#f7d98b]">Skill Tree</p>
                    {definition.skillTree.map((unlock) => {
                      const skill = skillById(unlock.skillId)
                      const learned = progression.unlocked_skills.includes(unlock.skillId)
                      const activeSlot = learned ? activeSkills.indexOf(unlock.skillId) + 1 : null
                      return (
                        <div key={unlock.skillId} className="mt-1 flex items-center justify-between gap-2">
                          <p className={learned ? 'text-[#61c47c]' : 'text-[#b8a986]'}>
                            Lv {unlock.level}: {skill.name} / {learned ? activeSlot > 0 ? `Slot ${activeSlot}` : 'Reserve' : 'Locked'}
                          </p>
                          {learned ? (
                            <button
                              className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b] disabled:cursor-not-allowed disabled:opacity-45"
                              disabled={activeSlot <= 0 && activeSkills.length >= ACTIVE_SKILL_SLOT_LIMIT}
                              onClick={() => gameBridge.emit('command:toggle-companion-skill', { monster_id: monsterId, skill_id: unlock.skillId })}
                            >
                              {activeSlot > 0 ? 'Reserve' : 'Active'}
                            </button>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-[#f7d98b]">Equipment</p>
                    <p className="text-[#b8a986]">Gear bonuses: {formatStats(equipmentTotals)}</p>
                    {definition.equipmentSlots.map((slot) => (
                      <div key={slot} className="mt-1 flex items-center justify-between gap-2 text-[#b8a986]">
                        <p>{slot}: {equipmentById(equipment[slot])?.name ?? 'Empty'}</p>
                        {equipment[slot] ? (
                          <button
                            className="rounded bg-[#d8b765]/15 px-2 py-1 font-black text-[#f7d98b]"
                            onClick={() => gameBridge.emit('command:unequip-companion-item', { monster_id: monsterId, slot })}
                          >
                            Unequip
                          </button>
                        ) : null}
                      </div>
                    ))}
                    {compatibleEquipment.length ? (
                      <div className="mt-2 grid gap-2">
                        {compatibleEquipment.map((item) => (
                          <button
                            key={item.id}
                            className="rounded border border-[#d8b765]/20 px-2 py-1 text-left font-bold text-[#f7d98b]"
                            disabled={equipment[item.slot] === item.id}
                            onClick={() => gameBridge.emit('command:equip-companion-item', { monster_id: monsterId, equipment_id: item.id })}
                          >
                            {equipment[item.slot] === item.id ? 'Equipped' : 'Equip'} {item.name} / {item.slot} / {formatStats(item.stats)}
                          </button>
                        ))}
                      </div>
                    ) : <p className="text-[#b8a986]">No companion gear owned.</p>}
                  </div>
                </div>
              ) : null}
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
    <div className="absolute inset-x-6 bottom-6 z-50 mx-auto max-w-4xl rounded-lg border border-[#d8b765]/45 bg-[#11180f]/98 p-4 shadow-2xl">
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
              const output = recipe.output.kind === 'equipment' ? equipmentById(recipe.output.id) : itemById(recipe.output.id)
              const outputTarget = recipe.output.kind === 'equipment' && output?.target === 'companion' ? 'Companion Gear' : recipe.output.kind === 'equipment' ? 'Player Gear' : 'Item'
              return (
                <button
                  key={recipe.id}
                  className="rounded-md border border-[#d8b765]/20 bg-[#151a13] p-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={missing || pilakMissing}
                  onClick={() => gameBridge.emit('command:craft-recipe', { recipe_id: recipe.id })}
                >
                  <span className="block font-black text-[#fff6df]">{recipe.name}</span>
                  <span className="block text-xs text-[#d8b765]">Creates: {output?.name ?? recipe.output.id} / {outputTarget}</span>
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
  const skillUnlocks = rewards.skillUnlocks ?? []
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
            {skillUnlocks.map((skill) => <p key={skill.skill_id}>Skill learned: {skill.name}</p>)}
            <p className="text-xs text-[#b8a986]">{rewards.notes}</p>
          </div>
        </div>
        <button className="rounded-md bg-[#d8b765] px-3 py-2 text-sm font-bold text-[#11180f]" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
