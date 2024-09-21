/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormPreview from '@/app/FormPreview'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUpdateForm } from '@/hooks/query/form/update-data'
import { useToast } from '@/hooks/use-toast'
import { IFormType } from '@/types/forms'
import { Form } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
const fieldTypes = [
  { type: 'text', label: 'Texto' },
  { type: 'number', label: 'Número' },
  { type: 'email', label: 'E-mail' },
  { type: 'select', label: 'Seleção' },
  { type: 'textarea', label: 'Área de Texto' },
  { type: 'radio', label: 'Múltipla Escolha' },
  { type: 'cep', label: 'CEP' },
  { type: 'cpf', label: 'CPF' },
  { type: 'rg', label: 'RG' },
  { type: 'phone', label: 'Telefone' },
]
interface Field {
  itemForm: Form | []
}

export function EditPage({ itemForm }: Field) {
  function isFormType(item: any): item is IFormType {
    return item && typeof item === 'object' && 'fields' in item
  }

  const [formFields, setFormFields] = useState<
    {
      id: number
      type: string
      label: string
      required: boolean
      options: string[]
    }[]
  >(() => {
    if (isFormType(itemForm) && Array.isArray(itemForm.fields)) {
      return itemForm.fields.map((field: any) => ({
        id: field.id || Date.now(),
        type: field.type || '',
        label: field.label || '',
        required: field.required || false,
        options: Array.isArray(field.options) ? field.options : [],
      }))
    }
    return []
  })
  const { mutate: updateForm } = useUpdateForm()
  const [formName, setFormName] = useState<string>(
    itemForm && 'name' in itemForm ? itemForm.name : '',
  )
  const [formTitle, setFormTitle] = useState<string>(
    itemForm && 'title' in itemForm ? itemForm.title : '',
  )
  const [formLogo, setFormLogo] = useState<string | null>(
    itemForm && 'logo' in itemForm ? itemForm.logo : null,
  )
  const { toast } = useToast()
  const addField = (type: string) => {
    const newField = {
      id: Date.now(),
      type,
      label: '',
      required: false,
      options: type === 'select' ? ['Option 1'] : [],
    }
    setFormFields([...formFields, newField])
  }
  const handleLogoUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const { fileUrl } = await response.json()
          setFormLogo(fileUrl)
          toast({
            title: 'Logo uploaded',
            description: 'Your logo has been uploaded successfully',
          })
        } else {
          throw new Error('Failed to upload logo')
        }
      } catch (error) {
        console.error('Error uploading logo:', error)
        toast({
          title: 'Upload failed',
          description: 'Failed to upload logo. Please try again.',
          variant: 'destructive',
        })
      }
    }
  }

  const updateField = (
    id: number,
    updates: { label?: string; required?: boolean },
  ) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    )
  }
  const removeField = (id: number) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const addOption = (fieldId: number) => {
    setFormFields(
      formFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`],
            }
          : field,
      ),
    )
  }

  const updateOption = (fieldId: number, index: number, value: string) => {
    setFormFields(
      formFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.map((option, i) =>
                i === index ? value : option,
              ),
            }
          : field,
      ),
    )
  }
  const removeOption = (fieldId: number, index: number) => {
    setFormFields(
      formFields.map((field) =>
        field.id === fieldId
          ? { ...field, options: field.options.filter((_, i) => i !== index) }
          : field,
      ),
    )
  }
  const handleUpdateForm = async () => {
    const id = itemForm && 'id' in itemForm ? itemForm.id : ''
    try {
      updateForm({
        id,
        data: {
          name: formName,
          title: formTitle,
          logo: formLogo ?? undefined,
          // @ts-ignore
          fields: formFields.map((field) => ({
            id: field.id,
            type: field.type,
            label: field.label,
            required: field.required,
            options: field.options,
          })),
        },
      })
      toast({
        title: 'Form updated',
        description: 'Your form has been updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update form. Please try again.',
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4 items-center">
        <div className="flex items-center w-full justify-between mb-4">
          <h2 className="text-2xl font-bold ">Form Builder</h2>
          <Link
            href="/form"
            className="bg-blue-500 text-white p-2 mr-2 rounded"
          >
            Formulario registrado
          </Link>
        </div>
        <Input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Titulo do Formulario "
          className="w-full p-2 mb-4 border rounded"
        />
        <Input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Subtitulo do Formulario"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4">
          <label className="block mb-2">Logo do formulario</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 flex gap-3 flex-wrap ">
          {fieldTypes.map((field) => (
            <Button
              key={field.type}
              onClick={() => addField(field.type)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300 ease-in-out"
            >
              Adicionar {field.label}
            </Button>
          ))}
        </div>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4 p-4 border rounded">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              placeholder="Digite o rótulo do campo"
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex items-center mb-2">
              <input
                type="radio"
                checked={field.required}
                onChange={(e) =>
                  updateField(field.id, { required: e.target.checked })
                }
                className="mr-2"
              />
              <label>Required</label>
            </div>
            {(field.type === 'select' || field.type === 'radio') && (
              <div>
                <h4 className="font-bold mb-2">Options:</h4>
                {field.options.map((option, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        updateOption(field.id, index, e.target.value)
                      }
                      className="flex-grow p-2 mr-2 border rounded"
                    />
                    <Button
                      onClick={() => removeOption(field.id, index)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addOption(field.id)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Add Option
                </Button>
              </div>
            )}
            <Button
              onClick={() => removeField(field.id)}
              className="bg-red-500 text-white p-2 mt-2 rounded"
            >
              Remove Field
            </Button>
          </div>
        ))}
        <Button
          disabled={!formFields.length || !formName || !formTitle}
          onClick={handleUpdateForm}
          className="bg-green-500 text-white p-2 rounded"
        >
          Save Form
        </Button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <FormPreview
          fields={formFields}
          title={formTitle}
          logo={formLogo || ''}
          name={formName}
          id={''}
        />
      </div>
    </div>
  )
}
