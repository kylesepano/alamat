import { lazy, Suspense } from 'react'
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
import { CraftingCodexPage } from '../pages/CraftingCodexPage'
import { EconomyDashboardPage } from '../pages/EconomyDashboardPage'
import { ActViewerPage } from '../pages/ActViewerPage'
import { AnalyticsDashboardPage } from '../pages/AnalyticsDashboardPage'
import { AssetManagerPage } from '../pages/AssetManagerPage'
import { BuildManagerPage } from '../pages/BuildManagerPage'
import { ItemCategoryPage } from '../pages/ItemCategoryPage'
import { ItemCodexPage } from '../pages/ItemCodexPage'
import { ItemDetailPage } from '../pages/ItemDetailPage'
import { LegendaryQuestsPage } from '../pages/LegendaryQuestsPage'
import { LibrariesPage } from '../pages/LibrariesPage'
import { LocationDetailPage } from '../pages/LocationDetailPage'
import { LorePage } from '../pages/LorePage'
import { ChapterViewerPage } from '../pages/ChapterViewerPage'
import { DialogueBrowserPage } from '../pages/DialogueBrowserPage'
import { DeveloperDashboardPage } from '../pages/DeveloperDashboardPage'
import { EndingGalleryPage } from '../pages/EndingGalleryPage'
import { ImportCenterPage } from '../pages/ImportCenterPage'
import { LocalizationManagerPage } from '../pages/LocalizationManagerPage'
import { LoreLibraryPage } from '../pages/LoreLibraryPage'
import { MonsterCodexPage } from '../pages/MonsterCodexPage'
import { MonsterDetailPage } from '../pages/MonsterDetailPage'
import { MonsterDropsPage } from '../pages/MonsterDropsPage'
import { MonsterGearPage } from '../pages/MonsterGearPage'
import { MythologyEncyclopediaPage } from '../pages/MythologyEncyclopediaPage'
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
import { FestivalMarketPage } from '../pages/FestivalMarketPage'
import { RegionDetailPage } from '../pages/RegionDetailPage'
import { ProvinceDetailPage } from '../pages/ProvinceDetailPage'
import { RouteMapPage } from '../pages/RouteMapPage'
import { RecipeDetailPage } from '../pages/RecipeDetailPage'
import { ShopDetailPage } from '../pages/ShopDetailPage'
import { ShopDirectoryPage } from '../pages/ShopDirectoryPage'
import { SpawnZonePage } from '../pages/SpawnZonePage'
import { RelationshipGraphPage } from '../pages/RelationshipGraphPage'
import { PromptManagerPage } from '../pages/PromptManagerPage'
import { QADashboardPage } from '../pages/QADashboardPage'
import { SaveInspectorPage } from '../pages/SaveInspectorPage'
import { StoryCodexPage } from '../pages/StoryCodexPage'
import { TimelineViewerPage } from '../pages/TimelineViewerPage'
import { TradeRoutePage } from '../pages/TradeRoutePage'
import { TrustSystemPage } from '../pages/TrustSystemPage'
import { ValidationCenterPage } from '../pages/ValidationCenterPage'
import { WeaponCodexPage } from '../pages/WeaponCodexPage'
import { WorldCodexPage } from '../pages/WorldCodexPage'

const PlayPage = lazy(() => import('../pages/PlayPage').then((module) => ({ default: module.PlayPage })))

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
        <Route path="play" element={<Suspense fallback={<div className="text-[#f7d98b]">Loading gameplay...</div>}><PlayPage /></Suspense>} />
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
        <Route path="economy" element={<EconomyDashboardPage />} />
        <Route path="economy/crafting" element={<CraftingCodexPage />} />
        <Route path="economy/recipes/:recipeId" element={<RecipeDetailPage />} />
        <Route path="economy/shops" element={<ShopDirectoryPage />} />
        <Route path="economy/shops/:shopId" element={<ShopDetailPage />} />
        <Route path="economy/trade-routes" element={<TradeRoutePage />} />
        <Route path="economy/festival-markets" element={<FestivalMarketPage />} />
        <Route path="story" element={<StoryCodexPage />} />
        <Route path="story/acts" element={<ActViewerPage />} />
        <Route path="story/chapters" element={<ChapterViewerPage />} />
        <Route path="story/timeline" element={<TimelineViewerPage />} />
        <Route path="story/lore" element={<LoreLibraryPage />} />
        <Route path="story/dialogues" element={<DialogueBrowserPage />} />
        <Route path="story/relationships" element={<RelationshipGraphPage />} />
        <Route path="story/endings" element={<EndingGalleryPage />} />
        <Route path="story/mythology" element={<MythologyEncyclopediaPage />} />
        <Route path="production" element={<DeveloperDashboardPage />} />
        <Route path="production/imports" element={<ImportCenterPage />} />
        <Route path="production/validation" element={<ValidationCenterPage />} />
        <Route path="production/assets" element={<AssetManagerPage />} />
        <Route path="production/prompts" element={<PromptManagerPage />} />
        <Route path="production/localization" element={<LocalizationManagerPage />} />
        <Route path="production/saves" element={<SaveInspectorPage />} />
        <Route path="production/qa" element={<QADashboardPage />} />
        <Route path="production/analytics" element={<AnalyticsDashboardPage />} />
        <Route path="production/builds" element={<BuildManagerPage />} />
      </Route>
    </Routes>
  )
}
