import { links } from '@/settings/nav-menu'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function Sidebar() {
  return (
    <aside className="w-16 bg-white shadow-md flex flex-col items-center py-4">
      <Button variant="ghost" className="mb-6">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
          <path
            fill="currentColor"
            d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"
          />
        </svg>
      </Button>
      {links.map((item, index) => (
        <Link key={index} href={item.href} className="mb-2 p-3">
          <item.icon className="w-6 h-6 text-gray-600" />
        </Link>
      ))}
      <Button variant="ghost" className="mt-auto p-3">
        <Settings className="w-6 h-6 text-gray-600" />
      </Button>
    </aside>
  )
}
