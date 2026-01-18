import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Home, ClipboardList, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import useUserStore from '@/stores/useUserStore'

export default function EmployeeLayout() {
  const { isAuthenticated, user } = useUserStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (user?.role !== 'employee') {
    return <Navigate to="/" replace />
  }

  const navItems = [
    { href: '/employee', label: 'Início', icon: Home },
    {
      href: '/employee/questionnaire',
      label: 'Questionário',
      icon: ClipboardList,
    },
    { href: '/employee/library', label: 'Biblioteca', icon: BookOpen },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      <TopNav />
      <main className="container mx-auto max-w-4xl flex-1 px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 block border-t bg-white px-6 pb-safe pt-2 md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-900',
                )}
              >
                <Icon
                  className={cn('mb-1 h-6 w-6', isActive && 'fill-current/20')}
                />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
