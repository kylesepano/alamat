import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from '../constants/navigation'

export function MainLayout({ dataSource }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#354124_0,#171b16_38%,#10130f_100%)]">
      <header className="sticky top-0 z-20 border-b border-[#d8b765]/20 bg-[#121610]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#d8b765]/50 bg-[#d8b765]/15 text-lg font-black text-[#f7d98b]">
              A
            </span>
            <span>
              <span className="block text-xl font-black text-[#fff6df]">ALAMAT</span>
              <span className="block text-xs uppercase tracking-wide text-[#b8a986]">Universe Foundation</span>
            </span>
          </NavLink>
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-semibold transition',
                    isActive ? 'bg-[#d8b765] text-[#171b16]' : 'text-[#e7dcc4] hover:bg-white/10',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-[#d8b765]/20 px-4 py-6 text-center text-sm text-[#b8a986]">
        Data source: {dataSource === 'api' ? 'Laravel API' : dataSource === 'static' ? 'static fallback JSON' : 'loading'}
      </footer>
    </div>
  )
}
