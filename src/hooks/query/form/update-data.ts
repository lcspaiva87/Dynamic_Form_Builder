import { IFormType } from '@/app/@types/forms'
import { patch } from '@/data/client/htpp-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const updateDataFormData = async (
  id: string,
  data: Partial<{
    name: string
    title: string
    logo: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fields: IFormType[]
    status: string
  }>,
) => {
  const response = await patch(`/form`, { id, ...data })
  return response
}

export const useUpdateForm = () => {
  const queryClient = useQueryClient() // Para atualizar o cache depois da atualização

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<{
        name: string
        title: string
        logo: string
        fields: IFormType[]
        status: string
      }>
    }) => updateDataFormData(id, data), // Chama a função de atualização
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] }) // Invalida o cache para atualizar a lista de formulários
    },
    onError: (error) => {
      console.error('Erro ao atualizar o formulário:', error)
    },
  })
}
