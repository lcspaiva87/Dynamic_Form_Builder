'use client'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteForm } from '@/hooks/query/form/delete-data'
import { useForms } from '@/hooks/query/form/list-data'
import { Form } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { tv } from 'tailwind-variants'
import { EditPage } from './Edit_page'
import { MenuForms } from './Menu'

const badgeVariant = tv({
  base: 'bg-gray-200 text-white',
  variants: {
    status: {
      success: 'bg-[#ECFAF4] text-[#22aa7e]',
      danger: 'bg-[#FFEEED] text-[#E53E3E]',
      warning: 'bg-[#FFF6EB] text-[#DD6B20]',
    },
  },
})
export function ListForm() {
  const { data: forms, isLoading, error } = useForms()
  const deleteFormMutation = useDeleteForm()
  const [isEditing, setIsEditing] = React.useState(false)
  const [itemForm, setItemForm] = React.useState<Form | []>([])
  function handleDelete(id: string) {
    deleteFormMutation.mutate(id)
  }
  if (error)
    return (
      <section aria-label="Error Message">
        An error occurred while loading forms
      </section>
    )

  const transLation: { [key: string]: string } = {
    success: 'Ativo',
    danger: 'Desativado',
    warning: 'Pausado',
  }
  function translateStatus(status: string) {
    return transLation[status] || status
  }
  const handleEdit = (id: string) => {
    const form = forms?.find((form: Form) => form.id === id)
    setItemForm(form)
    setIsEditing(true)
  }
  return (
    <>
      <>
        {isEditing ? (
          <section aria-label="Edit Form">
            <EditPage itemForm={itemForm} />
          </section>
        ) : (
          <>
            {isLoading ? (
              <section aria-label="Loading Forms">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-[125px] w-full rounded-xl" />
                ))}
              </section>
            ) : forms ? (
              <section
                aria-label="Forms List"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {forms.map((form: Form) => (
                  <article
                    key={form.id}
                    className="border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/form/${form.id}`} className="block relative">
                      <MenuForms
                        handleDelete={() => handleDelete(form.id)}
                        hadnleEdit={() => handleEdit(form.id)}
                      />
                      <img
                        src={form?.logo || '/logo.png'}
                        alt={`Logo for ${form.title}`}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <div className="p-2 flex items-center space-x-3 justify-between">
                        <h2 className="text-xl flex-1 min-w-0 truncate font-semibold">
                          {form.title}
                        </h2>
                        <Badge
                          className={badgeVariant({
                            status: ['success', 'danger', 'warning'].includes(
                              form.status as string,
                            )
                              ? (form.status as
                                  | 'success'
                                  | 'danger'
                                  | 'warning')
                              : undefined,
                          })}
                        >
                          {translateStatus(form.status)}
                        </Badge>
                      </div>
                      <div className="p-2 flex items-center justify-between ">
                        <h1 className="text-gray-600 text-sm flex-1 min-w-0 truncate">
                          {form.name}
                        </h1>
                        <span className="text-xs">
                          {new Date(form.updatedAt).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            },
                          )}
                        </span>{' '}
                      </div>
                    </Link>
                  </article>
                ))}
              </section>
            ) : (
              <section aria-label="No Forms Available">
                No forms available
              </section>
            )}
          </>
        )}
      </>
    </>
  )
}
