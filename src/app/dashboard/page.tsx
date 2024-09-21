'use client'
import CryptoJS from 'crypto-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface FormField {
  id: number
  type: string
  label: string
  required: boolean
  options: string[]
}

interface Form {
  id: string
  name: string
  title: string
  logo: string
  fields: FormField[]
  createdAt: string
  updatedAt: string
}

interface FormResponse {
  id: string
  formId: string
  data: {
    [key: string]: string | string[]
  }
  createdAt: string
}

// Função para descriptografar dados
function decryptData(data: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(data, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default function Dashboard() {
  const id = '66d51d179e9d9324744971f0'
  const [responses, setResponses] = useState<FormResponse[]>([])
  const [forms, setForms] = useState<Form[]>([])
  const secretKey = 'sua-chave-secreta'
  console.log(responses)

  async function fetchResponses() {
    const response = await fetch(`/api/save-data-form`)
    if (response.ok) {
      const data = await response.json()
      const decryptedData = data.map((response: FormResponse) => {
        const decryptedResponseData = Object.fromEntries(
          Object.entries(response.data).map(([key, value]) => [
            key,
            Array.isArray(value)
              ? value.map((v) => decryptData(v, secretKey))
              : decryptData(value, secretKey),
          ]),
        )
        return { ...response, data: decryptedResponseData }
      })
      setResponses(decryptedData)
    }
  }

  async function fetchForms() {
    const response = await fetch(`/api/form/${id}`)
    if (response.ok) {
      const data = await response.json()
      setForms(data)
    }
  }
  useEffect(() => {
    if (id) {
      fetchResponses()
      fetchForms()
    }
  }, [id])
  if (forms.length === 0) {
    return <div>Carregando...</div>
  }

  return (
    <main className="container mx-auto p-4">
      {forms.map((form) => (
        <div key={form.id}>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Respostas para: {form.title}
            </h1>
            <nav>
              <Link
                href={`/forms/${form.id}`}
                className="text-blue-500 hover:underline inline-block"
              >
                ← Voltar para o formulário
              </Link>
            </nav>
          </header>

          <section>
            {responses.length > 0 && form.fields && form.fields.length > 0 ? (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data
                      </th>
                      {form.fields.map(({ label, id }) => (
                        <th
                          key={id}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {responses.map((response) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(response.createdAt).toLocaleString()}
                        </td>
                        {form.fields.map((field) => (
                          <td
                            key={`${response.id}-${field.id}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {response.data[field.id] !== undefined
                              ? Array.isArray(response.data[field.id])
                                ? (response.data[field.id] as string[]).join(
                                    ', ',
                                  )
                                : (response.data[field.id] as string)
                              : 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">
                Nenhuma resposta disponível.
              </p>
            )}
          </section>
        </div>
      ))}
    </main>
  )
}
