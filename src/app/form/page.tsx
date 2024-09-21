import { Header } from '@/components/header'

import { ListForm } from './_components/List_Form'

export default function FormsList() {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Registered Forms</h1>
          <ListForm />
        </main>
      </div>
    </div>
  )
}
