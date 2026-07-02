import { useParams } from 'react-router-dom'
import { CategoryBadge } from '../components/CategoryBadge'
import { EquipmentAssetPromptPanel } from '../components/EquipmentAssetPromptPanel'
import { EquipmentEffectPanel } from '../components/EquipmentEffectPanel'
import { EquipmentSetPanel } from '../components/EquipmentSetPanel'
import { EquipmentStatBlock } from '../components/EquipmentStatBlock'
import { EquipmentUpgradePanel } from '../components/EquipmentUpgradePanel'
import { PageHeader } from '../components/PageHeader'
import { RarityBadge } from '../components/RarityBadge'
import { SlotBadge } from '../components/SlotBadge'
import { useEquipmentItem } from '../hooks/useEquipment'

export function EquipmentDetailPage() {
  const { slug } = useParams()
  const equipment = useEquipmentItem(slug)

  if (!equipment) return <p className="text-[#f7d98b]">Loading equipment...</p>

  return (
    <div className="space-y-8">
      <PageHeader kicker={equipment.equipment_id} title={equipment.name} description={equipment.slot_type.replaceAll('_', ' ')} />
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <CategoryBadge category={equipment.category} />
          <RarityBadge rarity={equipment.rarity} />
          <SlotBadge slot={equipment.slot_type} />
        </div>
        <p className="text-[#d8c7a3]">{equipment.description}</p>
        <p className="text-[#d8c7a3]">{equipment.lore}</p>
      </section>
      <EquipmentStatBlock stats={equipment.stats} />
      <EquipmentEffectPanel equipment={equipment} />
      <EquipmentUpgradePanel upgrades={equipment.upgrades} />
      <EquipmentSetPanel sets={equipment.sets} />
      <EquipmentAssetPromptPanel equipment={equipment} />
    </div>
  )
}
