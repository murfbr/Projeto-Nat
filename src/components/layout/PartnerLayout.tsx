import { Outlet, Navigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import useUserStore from '@/stores/useUserStore'

export default function PartnerLayout() {
  const { isAuthenticated, user } = useUserStore()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (user?.role !== 'partner') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
