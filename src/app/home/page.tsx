import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ChevronRight } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

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
