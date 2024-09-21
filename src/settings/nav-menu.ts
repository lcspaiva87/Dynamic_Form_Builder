import {
  Calendar,
  Download,
  FileText,
  Grid,
  Home,
  HomeIcon,
  LayoutDashboard,
  Shield,
  Star,
} from 'lucide-react'
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
    href: '/form',
  },
  {
    icon: Home,
    name: 'Home',
    href: '',
  },
  {
    icon: Star,
    name: 'Favorites',
    href: '',
  },
  {
    icon: Grid,
    name: 'Dashboard',
    href: '',
  },
  {
    icon: Shield,
    name: 'Security',
    href: '',
  },
  {
    icon: Calendar,
    name: 'Calendar',
    href: '',
  },
  {
    icon: FileText,
    name: 'Documents',
    href: '',
  },
  {
    icon: Download,
    name: 'Downloads',
    href: '',
  },
]
