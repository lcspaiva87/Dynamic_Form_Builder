import { Bell, ChevronDown, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Header() {
  return (
    <header >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">SaaS Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Use (cmd + click) to open a tab"
              className="pl-10 pr-4 py-2 w-80"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Gene Russell</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  )
}
