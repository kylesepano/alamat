import { AppRoutes } from './routes/AppRoutes'
import { useFoundationData } from './hooks/useFoundationData'
import './App.css'

function App() {
  const { foundation, source, isLoading } = useFoundationData()

  if (isLoading) {
    return <div className="grid min-h-screen place-items-center bg-[#171b16] text-[#f7d98b]">Loading ALAMAT...</div>
  }

  return <AppRoutes foundation={foundation} dataSource={source} />
}

export default App
