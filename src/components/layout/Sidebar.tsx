import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Building2,
  Users,
  Activity,
  Library,
  Briefcase,
  Handshake,
} from 'lucide-react'
import useUserStore from '@/stores/useUserStore'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation()
  const { user } = useUserStore()
  const role = user?.role

  const superAdminLinks = [
    { href: '/super-admin', label: 'Painel', icon: LayoutDashboard },
    { href: '/super-admin/companies', label: 'Parceiros', icon: Handshake },
    { href: '/super-admin/content', label: 'Conteúdo', icon: Library },
    { href: '/super-admin/clinical', label: 'Clínico', icon: Activity },
  ]

  const partnerLinks = [
    { href: '/partner', label: 'Painel', icon: LayoutDashboard },
    // Partner doesn't have other direct links as navigation is hierarchical from Dashboard,
    // but we can add a direct link to the Dashboard which lists companies.
    // The requirement says "Partner-Specific Sidebar... focused on company management"
  ]

  const companyAdminLinks = [
    { href: '/company-admin', label: 'Painel HR', icon: LayoutDashboard },
    { href: '/company-admin/sectors', label: 'Setores', icon: Briefcase },
    { href: '/company-admin/employees', label: 'Colaboradores', icon: Users },
  ]

  let links = companyAdminLinks
  if (role === 'super_admin') links = superAdminLinks
  if (role === 'partner') links = partnerLinks

  return (
    <aside
      className={cn(
        'hidden w-64 flex-col border-r bg-sidebar md:flex',
        className,
      )}
    >
      <div className="flex flex-1 flex-col py-6">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const Icon = link.icon
            // Strict check for partner dashboard to avoid highlighting on sub-routes if needed,
            // but usually we want highlight if we are inside that section.
            // For partner, '/partner' is the root.
            const isActive =
              location.pathname === link.href ||
              (link.href !== '/' &&
                location.pathname.startsWith(link.href) &&
                location.pathname !== '/super-admin' &&
                location.pathname !== '/company-admin' &&
                location.pathname !== '/partner')

            // Fix for specific layouts matching
            const isExactMatch = location.pathname === link.href
            const isSubRoute =
              location.pathname.startsWith(link.href + '/') ||
              location.pathname.startsWith(link.href + '?')

            const activeState =
              role === 'partner'
                ? link.href === '/partner' // Partner only has one main link for now
                : isExactMatch || isSubRoute

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  activeState
                    ? 'border-r-4 border-secondary bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                )}
              >
                <Icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    activeState
                      ? 'text-primary'
                      : 'text-gray-400 group-hover:text-gray-500',
                  )}
                />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
