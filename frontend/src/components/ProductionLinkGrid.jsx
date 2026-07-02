import { Link } from 'react-router-dom'

export function ProductionLinkGrid() {
  const links = [
    ['Import Center', '/production/imports'],
    ['Validation Center', '/production/validation'],
    ['Asset Manager', '/production/assets'],
    ['Prompt Manager', '/production/prompts'],
    ['Localization', '/production/localization'],
    ['Save Inspector', '/production/saves'],
    ['QA Dashboard', '/production/qa'],
    ['Analytics', '/production/analytics'],
    ['Build Manager', '/production/builds'],
  ]

  return <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{links.map(([label, path]) => <Link key={path} className="rounded-lg border border-[#d8b765]/20 bg-[#d8b765]/10 p-4 font-bold text-[#f7d98b] hover:bg-[#d8b765]/20" to={path}>{label}</Link>)}</nav>
}
