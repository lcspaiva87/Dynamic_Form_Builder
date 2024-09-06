import { Plus } from 'lucide-react'
import { Button } from '../button'
import { Input } from '../input'
import { NavMenu } from './nav-menu'

export function SideBar() {
  return (
    <main className="    bg-white flex flex-col w-96 border-r-2 border-black/5 h-dvh ">
      <section className="p-3 gap-7 flex flex-col">
        <h1 className="text-lg font-bold">Dynamic Form Builder</h1>

        <div className="flex gap-3">
          <Input placeholder="Search" />
          <Button className="flex gap-1 ">
            <Plus className="size-4" />
            Novo
          </Button>
        </div>
        <NavMenu />
      </section>
    </main>
  )
}
