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

interface menuFormsProps {
  handleDelete: () => void
  hadnleEdit: () => void
}
export function MenuForms({ handleDelete, hadnleEdit }: menuFormsProps) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showPanel, setShowPanel] = React.useState(false)

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
          onClick={(e) => {
            e.preventDefault()
            handleDelete()
          }}
        >
          Excluir
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
          onClick={(e) => {
            e.stopPropagation()
            hadnleEdit()
          }}
        >
          Editar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
