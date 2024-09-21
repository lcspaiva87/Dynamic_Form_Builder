/* eslint-disable @next/next/no-img-element */
'use client'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Form } from '@prisma/client'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'
export default function FormsList() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  console.log(forms)
  useEffect(() => {
    async function fetchForms() {
      const response = await fetch('/api/form')
      if (response.ok) {
        const data = await response.json()
        setForms(data)
        setLoading(false)
      }
    }
    fetchForms()
  }, [])
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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Formulários Cadastrados</h1>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[125px] w-full rounded-xl" />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
        {forms?.map((form: Form) => (
          <Link
            href={`/form/${form.id}`}
            key={form.id}
            className="block  border rounded-lg hover:shadow-lg transition-shadow"
          >
            <img
              src={form?.logo ? form.logo : '/logo.png'}
              alt={form.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <div className="p-2 flex items-center space-x-3 justify-between">
              <h2 className="text-xl flex-1 min-w-0 truncate font-semibold  ">
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
              <h1 className="text-gray-600 text-xl flex-1 min-w-0 truncate">
                {form.name}
              </h1>
              <span>
                {new Date(form.updatedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </span>{' '}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
