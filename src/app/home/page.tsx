import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { links } from '@/settings/nav-menu'
import { Bell, ChevronDown, ChevronRight, Search, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Acquisition Overview */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Acquisition Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for the chart */}
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </CardContent>
            </Card>

            {/* Latest Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mt-4">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Onboarding Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">32.79%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    'Add your personal information',
                    'Verify your phone',
                    'Verify your Face ID',
                    'Give permissions for personal data',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trials Leads By Role */}
            <Card>
              <CardHeader>
                <CardTitle>Trials Leads By Role</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            {/* Leads By Region */}
            <Card>
              <CardHeader>
                <CardTitle>Leads By Region</CardTitle>
              </CardHeader>
            </Card>

            {/* Recent Blog Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="font-medium">What is the Customer Journey?</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
