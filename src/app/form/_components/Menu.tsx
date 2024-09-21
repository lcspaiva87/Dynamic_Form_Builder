'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisIcon } from 'lucide-react'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function MenuForms() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisIcon className="absolute right-2 top-2 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Ver
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Excluir
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Editar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
