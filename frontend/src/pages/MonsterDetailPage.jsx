import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MonsterAssetPromptPanel } from '../components/MonsterAssetPromptPanel'
import { MonsterBadgeList } from '../components/MonsterBadgeList'
import { MonsterLorePanel } from '../components/MonsterLorePanel'
import { MonsterSkillCard } from '../components/MonsterSkillCard'
import { MonsterStatBlock } from '../components/MonsterStatBlock'
import { MonsterVariantPanel } from '../components/MonsterVariantPanel'
import { PageHeader } from '../components/PageHeader'
import { MonsterService } from '../services/MonsterService'

const tabs = ['Overview', 'Lore', 'Skills', 'Stats', 'Habitat', 'Trust Method', 'Assets', 'Design Notes']

export function MonsterDetailPage() {
  const { slug } = useParams()
  const [monster, setMonster] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => {
    let isMounted = true
    MonsterService.getMonsterBySlug(slug).then((data) => {
      if (isMounted) {
        setMonster(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [slug])

  const content = useMemo(() => {
    if (!monster) return null

    switch (activeTab) {
      case 'Lore':
        return <MonsterLorePanel monster={monster} />
      case 'Skills':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {[...(monster.unique_skills ?? []), ...(monster.common_skills ?? [])].map((skill) => (
              <MonsterSkillCard key={`${skill.skill_slug}-${skill.id}`} skill={skill} />
            ))}
          </div>
        )
      case 'Stats':
        return <MonsterStatBlock stats={monster.stats} />
      case 'Habitat':
        return (
          <div className="space-y-5">
            <Panel title="Habitats"><MonsterBadgeList items={monster.habitats} /></Panel>
            <Panel title="Weather Preferences"><MonsterBadgeList items={monster.weather_types} /></Panel>
            <Panel title="Active Times"><MonsterBadgeList items={monster.active_times} /></Panel>
          </div>
        )
      case 'Trust Method':
        return (
          <Panel title={monster.trust_method?.name ?? 'Trust Method Pending'}>
            <p>{monster.trust_method?.description ?? 'No trust method assigned yet.'}</p>
            <p className="mt-3"><strong className="text-[#f7d98b]">Favorite offering:</strong> {monster.favorite_food_offering ?? 'None listed'}</p>
          </Panel>
        )
      case 'Assets':
        return (
          <div className="space-y-5">
            <Panel title="Asset Filenames">
              <p>Sprite: {monster.assets.sprite_filename}</p>
              <p>Portrait: {monster.assets.battle_portrait_filename}</p>
              <p>Overworld: {monster.assets.overworld_sprite_filename}</p>
              <p>Voice: {monster.assets.cry_voice_description ?? 'No voice notes yet.'}</p>
            </Panel>
            <MonsterAssetPromptPanel monster={monster} />
          </div>
        )
      case 'Design Notes':
        return (
          <div className="space-y-5">
            <MonsterVariantPanel variants={monster.variants} />
            <Panel title="Design Notes"><p>{monster.design_notes ?? 'No design notes yet.'}</p></Panel>
          </div>
        )
      default:
        return (
          <div className="space-y-5">
            <Panel title="Overview">
              <p>{monster.lore_and_backstory}</p>
              <p className="mt-3"><strong className="text-[#f7d98b]">Passive:</strong> {monster.passive_ability}</p>
            </Panel>
            <Panel title="Affiliations"><MonsterBadgeList items={monster.affiliations} /></Panel>
          </div>
        )
    }
  }, [activeTab, monster])

  if (!monster) {
    return <p className="text-[#f7d98b]">Loading Nilalang entry...</p>
  }

  return (
    <div className="space-y-8">
      <Link className="text-sm font-bold text-[#f7d98b]" to="/codex">Back to Codex</Link>
      <PageHeader
        kicker={`${monster.monster_id} / ${monster.nilalang_order?.name ?? 'Nilalang'}`}
        title={monster.filipino_name}
        description={`${monster.english_name} from ${monster.region_of_origin}. Trust difficulty ${monster.stats.trust_difficulty}.`}
      />
      <div className="flex flex-wrap gap-2 rounded-lg border border-[#d8b765]/20 bg-[#121610]/80 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              'rounded-md px-3 py-2 text-sm font-bold',
              activeTab === tab ? 'bg-[#d8b765] text-[#171b16]' : 'text-[#e7dcc4] hover:bg-white/10',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>
      {content}
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <section className="rounded-lg border border-[#d8b765]/20 bg-[#222819] p-5 text-sm leading-7 text-[#d9ceb7]">
      <h3 className="mb-3 text-xl font-black text-[#fff6df]">{title}</h3>
      {children}
    </section>
  )
}
