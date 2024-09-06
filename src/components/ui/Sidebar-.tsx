import { Plus } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'

export function SideBar() {
  return (
    <main className="border-l-2  border-b-red-300  bg-red-600 flex flex-col w-96 ">
      <section className="p-3 gap-7 flex flex-col">
        <h1 className="text-lg font-bold">Dynamic Form Builder</h1>

        <div className="flex gap-3">
          <Input placeholder="Search" />
          <Button className="flex gap-1 ">
            <Plus className="size-4" />
            Cria um Novo
          </Button>
        </div>
      </section>
    </main>
  )
}
