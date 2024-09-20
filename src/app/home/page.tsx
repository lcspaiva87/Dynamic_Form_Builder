import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, ChevronDown, Search } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      <aside className="w-20 bg-white shadow-md relative z-10">
        <div className="flex flex-col items-center py-4">
          <Button variant="ghost" className="mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
              <path
                fill="currentColor"
                d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"
              />
            </svg>
          </Button>
          {/* {sidebarIcons.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`mb-2 p-3 ${activeTab === item.name ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon className="w-6 h-6 text-gray-600" />
            </Button>
          ))} */}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm relative z-20">
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
                <img
                  src="/placeholder.svg"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Gene Russell</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
          {/* Curved edge between header and sidebar */}
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#eff3f8] p-4 border border-t-[#eff3f8] rounded-l-2xl shadow-content overflow-hidden">
          {/* Acquisition Overview Chart */}
          <span>oie</span>
        </main>
      </div>
    </div>
  )
}
