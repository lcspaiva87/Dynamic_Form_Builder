/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteForm } from '@/hooks/query/form/delete-data'
import { useForms } from '@/hooks/query/form/list-data'
import { Form } from '@prisma/client'
import Link from 'next/link'
import { tv } from 'tailwind-variants'
import { MenuForms } from './_components/Menu'

export default function FormsList() {
  const { data: forms, isLoading, error } = useForms()
  const deleteFormMutation = useDeleteForm()

  if (error)
    return (
      <section aria-label="Error Message">
        An error occurred while loading forms
      </section>
    )

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

  const transLation: { [key: string]: string } = {
    success: 'Ativo',
    danger: 'Desativado',
    warning: 'Pausado',
  }
  function translateStatus(status: string) {
    return transLation[status] || status
  }

  function handleDelete(id: string) {
    deleteFormMutation.mutate(id)
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Registered Forms</h1>
          {isLoading ? (
            <section
              aria-label="Loading Forms"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[125px] w-full rounded-xl" />
              ))}
            </section>
          ) : (
            <section
              aria-label="Forms List"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {forms?.map((form: Form) => (
                <article
                  key={form.id}
                  className="border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <Link href={`/form/${form.id}`} className="block relative">
                    <MenuForms handleDelete={() => handleDelete(form.id)} />
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
                            ? (form.status as 'success' | 'danger' | 'warning')
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
                        {new Date(form.updatedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>{' '}
                    </div>
                  </Link>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
