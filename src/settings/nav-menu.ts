import { HomeIcon, LayoutDashboard } from 'lucide-react'
interface NavLink {
  icon: React.ComponentType<{ className?: string }>
  name: string
  href: string
}
export const links: NavLink[] = [
  {
    icon: HomeIcon,
    name: 'Inicio',
    href: '#',
  },
  {
    icon: LayoutDashboard,
    name: 'Dashboard',
    href: '#',
  },
]
