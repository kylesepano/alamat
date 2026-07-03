export const ITEM_DEFINITIONS = {
  healing_herb: {
    id: 'healing_herb',
    name: 'Healing Herb',
    category: 'Consumable',
    price: 14,
    sellPrice: 5,
    effect: { type: 'heal', amount: 32 },
    description: 'A wrapped leaf remedy used for basic healing.',
  },
  sacred_river_water: {
    id: 'sacred_river_water',
    name: 'Sacred River Water',
    category: 'Consumable',
    price: 26,
    sellPrice: 9,
    effect: { type: 'cleanse', amount: 0 },
    description: 'A clear vial used to calm harmful effects. Cleanse hook for future statuses.',
  },
  mound_pebble: {
    id: 'mound_pebble',
    name: 'Mound Pebble',
    category: 'Material',
    price: 0,
    sellPrice: 2,
    description: 'A small clay-stained stone found after a Duwende encounter.',
  },
  tiny_clay_charm: {
    id: 'tiny_clay_charm',
    name: 'Tiny Clay Charm',
    category: 'Material',
    price: 0,
    sellPrice: 4,
    description: 'A harmless field token left near mound paths.',
  },
  canopy_fur: {
    id: 'canopy_fur',
    name: 'Canopy Fur',
    category: 'Material',
    price: 0,
    sellPrice: 5,
    description: 'A tuft caught on high branches after an Ungo retreats.',
  },
  drum_bark: {
    id: 'drum_bark',
    name: 'Drum Bark',
    category: 'Material',
    price: 0,
    sellPrice: 6,
    description: 'Bark that keeps a faint hollow rhythm.',
  },
  leaf_basket_fiber: {
    id: 'leaf_basket_fiber',
    name: 'Leaf Basket Fiber',
    category: 'Material',
    price: 0,
    sellPrice: 3,
    description: 'A tiny woven strand from Aghoy pathwork.',
  },
  shortcut_twig: {
    id: 'shortcut_twig',
    name: 'Shortcut Twig',
    category: 'Material',
    price: 0,
    sellPrice: 3,
    description: 'A curved twig that seems to point toward safer paths.',
  },
  nightmare_bark: {
    id: 'nightmare_bark',
    name: 'Nightmare Bark',
    category: 'Material',
    price: 0,
    sellPrice: 10,
    description: 'A dark splinter of dream-heavy bark.',
  },
  old_housepost_splinter: {
    id: 'old_housepost_splinter',
    name: 'Old Housepost Splinter',
    category: 'Material',
    price: 0,
    sellPrice: 12,
    description: 'A brittle shard from an old nightmare post.',
  },
}

export const EQUIPMENT_DEFINITIONS = {
  training_bolo: {
    id: 'training_bolo',
    name: 'Training Bolo',
    slot: 'weapon',
    price: 45,
    sellPrice: 16,
    stats: { attack: 3 },
    description: 'A practical starter blade with a woven grip.',
  },
  woven_vest: {
    id: 'woven_vest',
    name: 'Woven Vest',
    slot: 'armor',
    price: 38,
    sellPrice: 14,
    stats: { defense: 2, maxHp: 6 },
    description: 'Light protective clothing for forest paths.',
  },
  river_charm: {
    id: 'river_charm',
    name: 'River Charm',
    slot: 'accessory',
    target: 'player',
    price: 30,
    sellPrice: 10,
    stats: { speed: 1 },
    description: 'A small charm that steadies movement.',
  },
  leaf_thread_charm: {
    id: 'leaf_thread_charm',
    name: 'Leaf-Thread Charm',
    slot: 'charm',
    target: 'companion',
    price: 34,
    sellPrice: 12,
    stats: { speed: 1, maxHp: 4 },
    description: 'A gentle companion charm woven from forest fibers.',
  },
  balete_keepsake: {
    id: 'balete_keepsake',
    name: 'Balete Keepsake',
    slot: 'keepsake',
    target: 'companion',
    price: 42,
    sellPrice: 15,
    stats: { defense: 2 },
    description: 'A small keepsake that helps a bonded Nilalang stand firm.',
  },
}

export const SHOP_DEFINITIONS = {
  starter_store: {
    id: 'starter_store',
    name: 'Barangay General Store',
    inventory: [
      { kind: 'item', id: 'healing_herb', price: 14 },
      { kind: 'item', id: 'sacred_river_water', price: 26 },
      { kind: 'equipment', id: 'training_bolo', price: 45 },
      { kind: 'equipment', id: 'woven_vest', price: 38 },
      { kind: 'equipment', id: 'river_charm', price: 30 },
      { kind: 'equipment', id: 'leaf_thread_charm', price: 34 },
      { kind: 'equipment', id: 'balete_keepsake', price: 42 },
    ],
  },
}

export const RECIPE_DEFINITIONS = {
  forest_poultice: {
    id: 'forest_poultice',
    name: 'Forest Poultice',
    station: 'Barangay Workbench',
    output: { kind: 'item', id: 'healing_herb', quantity: 2 },
    ingredients: [
      { id: 'leaf_basket_fiber', quantity: 1 },
      { id: 'shortcut_twig', quantity: 1 },
    ],
    cost: { pilak: 2 },
    description: 'Bundles forest fibers into extra healing herbs.',
  },
  clay_guard_charm: {
    id: 'clay_guard_charm',
    name: 'Clay Guard Charm',
    station: 'Barangay Workbench',
    output: { kind: 'equipment', id: 'river_charm', quantity: 1 },
    ingredients: [
      { id: 'mound_pebble', quantity: 1 },
      { id: 'tiny_clay_charm', quantity: 1 },
    ],
    cost: { pilak: 8 },
    description: 'A simple protective charm assembled from mound-path tokens.',
  },
  leaf_thread_charm: {
    id: 'leaf_thread_charm',
    name: 'Leaf-Thread Charm',
    station: 'Barangay Workbench',
    output: { kind: 'equipment', id: 'leaf_thread_charm', quantity: 1 },
    ingredients: [
      { id: 'leaf_basket_fiber', quantity: 2 },
      { id: 'shortcut_twig', quantity: 1 },
    ],
    cost: { pilak: 6 },
    description: 'Weaves Aghoy pathwork fibers into a gentle companion charm.',
  },
  balete_keepsake: {
    id: 'balete_keepsake',
    name: 'Balete Keepsake',
    station: 'Barangay Workbench',
    output: { kind: 'equipment', id: 'balete_keepsake', quantity: 1 },
    ingredients: [
      { id: 'nightmare_bark', quantity: 1 },
      { id: 'old_housepost_splinter', quantity: 1 },
      { id: 'drum_bark', quantity: 1 },
    ],
    cost: { pilak: 12 },
    description: 'Binds cleared shrine remnants into a keepsake for bonded Nilalang.',
  },
}

export function itemById(itemId) {
  return ITEM_DEFINITIONS[itemId] ?? null
}

export function equipmentById(equipmentId) {
  return EQUIPMENT_DEFINITIONS[equipmentId] ?? null
}

export function shopById(shopId) {
  return SHOP_DEFINITIONS[shopId] ?? null
}

export function recipeById(recipeId) {
  return RECIPE_DEFINITIONS[recipeId] ?? null
}

export function addInventoryItem(save, itemId, quantity = 1) {
  save.inventory.items[itemId] = (save.inventory.items[itemId] ?? 0) + quantity
  return save
}

export function removeInventoryItem(save, itemId, quantity = 1) {
  const current = save.inventory.items[itemId] ?? 0
  if (current < quantity) return false
  const next = current - quantity
  if (next <= 0) delete save.inventory.items[itemId]
  else save.inventory.items[itemId] = next
  return true
}

export function addEquipment(save, equipmentId) {
  if (!save.inventory.equipment.includes(equipmentId)) {
    save.inventory.equipment.push(equipmentId)
  }
  return save
}

export function equipItem(save, equipmentId) {
  const equipment = equipmentById(equipmentId)
  if (!equipment || equipment.target === 'companion' || !save.inventory.equipment.includes(equipmentId)) return false
  save.equipment.slots[equipment.slot] = equipmentId
  return true
}

export function unequipItem(save, slot) {
  if (!Object.hasOwn(save.equipment.slots, slot)) return false
  save.equipment.slots[slot] = null
  return true
}

export function equipmentStatTotals(save) {
  return Object.values(save.equipment.slots).reduce((stats, equipmentId) => {
    const equipment = equipmentById(equipmentId)
    if (!equipment) return stats
    for (const [stat, amount] of Object.entries(equipment.stats)) {
      stats[stat] = (stats[stat] ?? 0) + amount
    }
    return stats
  }, {})
}

export function buyShopEntry(save, shopId, entryIndex) {
  const shop = shopById(shopId)
  const entry = shop?.inventory[entryIndex]
  if (!entry) return { ok: false, message: 'Item unavailable.' }
  if ((save.progression.currencies.pilak ?? 0) < entry.price) return { ok: false, message: 'Not enough Pilak.' }
  save.progression.currencies.pilak -= entry.price
  if (entry.kind === 'item') addInventoryItem(save, entry.id, 1)
  if (entry.kind === 'equipment') addEquipment(save, entry.id)
  return { ok: true, message: `Purchased ${displayName(entry)}.` }
}

export function craftRecipe(save, recipeId) {
  const recipe = recipeById(recipeId)
  if (!recipe) return { ok: false, message: 'Recipe unavailable.' }
  if ((save.progression.currencies.pilak ?? 0) < (recipe.cost.pilak ?? 0)) return { ok: false, message: 'Not enough Pilak.' }
  for (const ingredient of recipe.ingredients) {
    if ((save.inventory.items[ingredient.id] ?? 0) < ingredient.quantity) {
      return { ok: false, message: `Missing ${itemById(ingredient.id)?.name ?? ingredient.id}.` }
    }
  }
  save.progression.currencies.pilak -= recipe.cost.pilak ?? 0
  for (const ingredient of recipe.ingredients) removeInventoryItem(save, ingredient.id, ingredient.quantity)
  if (recipe.output.kind === 'item') addInventoryItem(save, recipe.output.id, recipe.output.quantity)
  if (recipe.output.kind === 'equipment') addEquipment(save, recipe.output.id)
  return { ok: true, message: `Crafted ${displayName(recipe.output)}.` }
}

export function displayName(entry) {
  return entry.kind === 'equipment'
    ? equipmentById(entry.id)?.name ?? entry.id
    : itemById(entry.id)?.name ?? entry.id
}
