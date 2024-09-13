import { links } from '@/settings/nav-menu'
export function NavMenu() {
  return (
    <nav>
      <ul className="flex gap-3 flex-col">
        {links.map(({ href, name, icon: Icon }) => (
          <li
            key={href}
            className="active:bg-blue flex gap-2 p-3 border border-black/10 rounded-lg cursor-pointer hover:bg-black/5 items-center "
          >
            <Icon className="size-5" />
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
