import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  formatCEP,
  formatCPF,
  formatRG,
  validateCEP,
  validateCPF,
  validatePhone,
  validateRG,
} from '@/lib/validations'
import CryptoJS from 'crypto-js'
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useState,
} from 'react'
import InputMask from 'react-input-mask'

type Field = {
  type: string
  id: Key | null | undefined | bigint
  label:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | Promise<AwaitedReactNode>
    | null
    | undefined
  required: boolean | undefined
  options: any[]
}

type FormPreviewProps = {
  fields: Field[]
  title: string
  logo: string
  name: string
  id: string
}

const FormPreview = ({ fields, title, logo, name, id }: FormPreviewProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    fieldId: Key | null | undefined,
    value: string,
    fieldType: string | undefined,
  ) => {
    let formattedValue = value
    let error = null

    switch (fieldType) {
      case 'cep':
        formattedValue = formatCEP(value.replace(/\D/g, ''))
        if (!validateCEP(formattedValue)) {
          error = 'CEP inválido'
        }
        break
      case 'cpf':
        formattedValue = formatCPF(value.replace(/\D/g, ''))
        if (!validateCPF(formattedValue)) {
          error = 'CPF inválido'
        }
        break
      case 'rg':
        formattedValue = formatRG(value.replace(/\D/g, ''))
        if (!validateRG(formattedValue)) {
          error = 'RG inválido'
        }
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Telefone inválido'
        }
        break
    }

    setFormData({ ...formData, [String(fieldId)]: value })
    setErrors({ ...errors, [fieldId as string]: error })
  }
  function encryptData(data: string, secretKey: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString()
  }

  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const secretKey = 'sua-chave-secreta'

  // Criptografar todos os valores em formData
  const encryptedFormData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
      key,
      encryptData(value, secretKey),
    ]),
  )

  console.log('Dados criptografados:', encryptedFormData)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error !== null)) {
      alert('Por favor, corrija os erros antes de enviar o formulário.')
      return
    }

    setIsSubmitting(true)

    try {
      const encryptedFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          encryptData(value, secretKey),
        ]),
      )

      const response = await fetch('/api/save-data-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: id,
          data: encryptedFormData,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Formulário enviado com sucesso:', result)
        alert('Formulário enviado com sucesso!')
        setFormData({}) // Limpa o formulário após o envio bem-sucedido
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="border p-4 rounded">
      {name && <h1 className="text-2xl font-bold mb-4 text-center">{name}</h1>}
      {logo && (
        <div className="mb-4">
          <img src={logo} alt="Form Logo" className="max-w-xs mx-auto" />
        </div>
      )}
      {title && <h1 className="text-sm font-bold mb-4 text-center">{title}</h1>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields?.map(
          (field: {
            type: any
            id: Key | null | undefined
            label:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | Promise<AwaitedReactNode>
              | null
              | undefined
            required: boolean | undefined
            options: any[]
          }) => {
            switch (field.type) {
              case 'text':
              case 'number':
              case 'email':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <input
                      type={field.type}
                      className="w-full p-2 border rounded"
                      required={field.required}
                      onChange={(e) => {
                        const value = e.target.value
                        if (field.type === 'email') {
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          if (!emailRegex.test(value)) {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [String(field.id)]: 'Email inválido',
                            }))
                          } else {
                            setErrors((prevErrors) => {
                              const { [String(field.id)]: _, ...rest } =
                                prevErrors
                              return rest
                            })
                          }
                        }
                        handleInputChange(field.id, value, field.type)
                      }}
                    />
                    {errors[String(field.id)] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[String(field.id)]}
                      </p>
                    )}
                  </div>
                )
              case 'cep':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <InputMask
                      mask="99999-999"
                      className={`w-full p-2 border rounded ${errors[String(field.id)] ? 'border-red-500' : ''}`}
                      required={field.required}
                      value={formData[String(field.id) as string] || ''}
                      onChange={(e) =>
                        handleInputChange(
                          String(field.id),
                          e.target.value,
                          field.type,
                        )
                      }
                    />
                    {errors[String(field.id)] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[String(field.id)]}
                      </p>
                    )}
                  </div>
                )
              case 'cpf':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <InputMask
                      mask="999.999.999-99"
                      className={`w-full p-2 border rounded ${errors[field.id as string] ? 'border-red-500' : ''}`}
                      required={field.required}
                      value={formData[field.id as string] || ''}
                      onChange={(e) =>
                        handleInputChange(
                          field.id as string,
                          e.target.value,
                          field.type,
                        )
                      }
                    />
                    {errors[String(field.id)] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[String(field.id)]}
                      </p>
                    )}
                  </div>
                )
              case 'phone':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <InputMask
                      mask="(99) 99999-9999"
                      className={`w-full p-2 border rounded ${errors[field.id as string] ? 'border-red-500' : ''}`}
                      required={field.required}
                      value={formData[field.id as string] || ''}
                      onChange={(e) =>
                        handleInputChange(
                          field.id as string,
                          e.target.value,
                          field.type,
                        )
                      }
                    />
                    {errors[String(field.id)] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[String(field.id)]}
                      </p>
                    )}
                  </div>
                )

              case 'select':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      required={field.required}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value, field.type)
                      }
                    >
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              case 'textarea':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    <Textarea required={field.required} />
                  </div>
                )
              case 'radio':
                return (
                  <div key={field.id}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && '*'}
                    </label>
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`${field.id}-${index}`}
                          value={option}
                          className="mr-2"
                          onChange={(e) => {
                            const currentValues =
                              formData[field.id as string] || []
                            const newValues = e.target.checked
                              ? [...currentValues, option]
                              : currentValues.filter((v: any) => v !== option)
                            handleInputChange(field.id, newValues, field.type)
                          }}
                        />
                        <label htmlFor={`${field.id}-${index}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                )
              default:
                return null
            }
          },
        )}
        <Button className="bg-blue-500 text-white p-2 rounded">
          Vizualiar formulário
        </Button>
      </form>
    </div>
  )
}

export default FormPreview
