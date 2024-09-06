import { HomeIcon, LayoutDashboard } from 'lucide-react'

export function NavMenu() {
  const links = [
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
  return (
    <nav>
      <ul className="flex gap-3 flex-col">
        {links.map(({ href, name, icon: Icon }) => (
          <li
            key={href}
            className="flex gap-2 p-3 border border-black/10 rounded-lg cursor-pointer hover:bg-black/5 items-center "
          >
            <Icon className="size-5" />
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
