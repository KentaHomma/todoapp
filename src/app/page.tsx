import { Favorites } from '@/components/dashboard/favorites'
import MainNav from '@/components/dashboard/navigation/main-nav'

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <MainNav />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>TODOダッシュボード</h1>
        </header>
        
        <div className="dashboard-content">
          <Favorites />
          {/* 他のコンポーネントをここに追加 */}
        </div>
      </div>
    </div>
  )
}
