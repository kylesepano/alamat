import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { AccessoryCodexPage } from '../pages/AccessoryCodexPage'
import { ActiveQuestsPage } from '../pages/ActiveQuestsPage'
import { AffiliationsPage } from '../pages/AffiliationsPage'
import { ArmorCodexPage } from '../pages/ArmorCodexPage'
import { EquipmentCodexPage } from '../pages/EquipmentCodexPage'
import { EquipmentDetailPage } from '../pages/EquipmentDetailPage'
import { EquipmentSetDetailPage, EquipmentSetsPage } from '../pages/EquipmentSetPage'
import { CompanionDirectoryPage } from '../pages/CompanionDirectoryPage'
import { DungeonCodexPage } from '../pages/DungeonCodexPage'
import { FactionDirectoryPage } from '../pages/FactionDirectoryPage'
import { FactionQuestsPage } from '../pages/FactionQuestsPage'
import { GameBiblePage } from '../pages/GameBiblePage'
import { HomePage } from '../pages/HomePage'
import { CraftingMaterialsPage } from '../pages/CraftingMaterialsPage'
import { ItemCategoryPage } from '../pages/ItemCategoryPage'
import { ItemCodexPage } from '../pages/ItemCodexPage'
import { ItemDetailPage } from '../pages/ItemDetailPage'
import { LegendaryQuestsPage } from '../pages/LegendaryQuestsPage'
import { LibrariesPage } from '../pages/LibrariesPage'
import { LocationDetailPage } from '../pages/LocationDetailPage'
import { LorePage } from '../pages/LorePage'
import { MonsterCodexPage } from '../pages/MonsterCodexPage'
import { MonsterDetailPage } from '../pages/MonsterDetailPage'
import { MonsterDropsPage } from '../pages/MonsterDropsPage'
import { MonsterGearPage } from '../pages/MonsterGearPage'
import { MonsterTrustQuestsPage } from '../pages/MonsterTrustQuestsPage'
import { NPCCodexPage } from '../pages/NPCCodexPage'
import { NPCDetailPage } from '../pages/NPCDetailPage'
import { NPCRelationshipPage } from '../pages/NPCRelationshipPage'
import { NPCSchedulePage } from '../pages/NPCSchedulePage'
import { NPCSearchPage } from '../pages/NPCSearchPage'
import { NPCShopsPage } from '../pages/NPCShopsPage'
import { NPCTrainersPage } from '../pages/NPCTrainersPage'
import { NilalangOrdersPage } from '../pages/NilalangOrdersPage'
import { OfferingsPage } from '../pages/OfferingsPage'
import { QuestItemsPage } from '../pages/QuestItemsPage'
import { QuestChainPage, QuestChainsPage } from '../pages/QuestChainPage'
import { QuestCodexPage } from '../pages/QuestCodexPage'
import { QuestDetailPage } from '../pages/QuestDetailPage'
import { FastTravelPage } from '../pages/FastTravelPage'
import { RegionDetailPage } from '../pages/RegionDetailPage'
import { ProvinceDetailPage } from '../pages/ProvinceDetailPage'
import { RouteMapPage } from '../pages/RouteMapPage'
import { SpawnZonePage } from '../pages/SpawnZonePage'
import { TrustSystemPage } from '../pages/TrustSystemPage'
import { WeaponCodexPage } from '../pages/WeaponCodexPage'
import { WorldCodexPage } from '../pages/WorldCodexPage'

export function AppRoutes({ foundation, dataSource }) {
  return (
    <Routes>
      <Route element={<MainLayout dataSource={dataSource} />}>
        <Route index element={<HomePage foundation={foundation} />} />
        <Route path="lore" element={<LorePage foundation={foundation} />} />
        <Route path="world" element={<WorldCodexPage />} />
        <Route path="world/regions" element={<RegionDetailPage />} />
        <Route path="world/provinces" element={<ProvinceDetailPage />} />
        <Route path="world/routes" element={<RouteMapPage />} />
        <Route path="world/dungeons" element={<DungeonCodexPage />} />
        <Route path="world/spawns" element={<SpawnZonePage />} />
        <Route path="world/fast-travel" element={<FastTravelPage />} />
        <Route path="world/locations/:slug" element={<LocationDetailPage />} />
        <Route path="nilalang-orders" element={<NilalangOrdersPage foundation={foundation} />} />
        <Route path="affiliations" element={<AffiliationsPage foundation={foundation} />} />
        <Route path="trust-system" element={<TrustSystemPage foundation={foundation} />} />
        <Route path="game-bible" element={<GameBiblePage foundation={foundation} />} />
        <Route path="libraries" element={<LibrariesPage />} />
        <Route path="codex" element={<MonsterCodexPage />} />
        <Route path="codex/:slug" element={<MonsterDetailPage />} />
        <Route path="items" element={<ItemCodexPage />} />
        <Route path="items/category/:category" element={<ItemCategoryPage />} />
        <Route path="items/crafting-materials" element={<CraftingMaterialsPage />} />
        <Route path="items/monster-drops" element={<MonsterDropsPage />} />
        <Route path="items/offerings" element={<OfferingsPage />} />
        <Route path="items/quest-items" element={<QuestItemsPage />} />
        <Route path="items/:slug" element={<ItemDetailPage />} />
        <Route path="equipment" element={<EquipmentCodexPage />} />
        <Route path="equipment/sets" element={<EquipmentSetsPage />} />
        <Route path="equipment/sets/:setId" element={<EquipmentSetDetailPage />} />
        <Route path="equipment/weapons" element={<WeaponCodexPage />} />
        <Route path="equipment/armor" element={<ArmorCodexPage />} />
        <Route path="equipment/accessories" element={<AccessoryCodexPage />} />
        <Route path="equipment/monster-gear" element={<MonsterGearPage />} />
        <Route path="equipment/:slug" element={<EquipmentDetailPage />} />
        <Route path="npcs" element={<NPCCodexPage />} />
        <Route path="npcs/search" element={<NPCSearchPage />} />
        <Route path="npcs/relationships" element={<NPCRelationshipPage />} />
        <Route path="npcs/schedules" element={<NPCSchedulePage />} />
        <Route path="npcs/shops" element={<NPCShopsPage />} />
        <Route path="npcs/trainers" element={<NPCTrainersPage />} />
        <Route path="npcs/factions" element={<FactionDirectoryPage />} />
        <Route path="npcs/companions" element={<CompanionDirectoryPage />} />
        <Route path="npcs/:npcId" element={<NPCDetailPage />} />
        <Route path="quests" element={<QuestCodexPage />} />
        <Route path="quests/active" element={<ActiveQuestsPage />} />
        <Route path="quests/chains" element={<QuestChainsPage />} />
        <Route path="quests/chains/:chainId" element={<QuestChainPage />} />
        <Route path="quests/faction" element={<FactionQuestsPage />} />
        <Route path="quests/nilalang-trust" element={<MonsterTrustQuestsPage />} />
        <Route path="quests/legendary" element={<LegendaryQuestsPage />} />
        <Route path="quests/:slug" element={<QuestDetailPage />} />
      </Route>
    </Routes>
  )
}
