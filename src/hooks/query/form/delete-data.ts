import { del } from '@/data/client/htpp-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteFormData = async (id: string) => {
  const response = await del(`/form`, { id })
  return response
}

export const useDeleteForm = () => {
  const queryClient = useQueryClient() // Para atualizar o cache depois da deleção

  return useMutation({
    mutationFn: (id: string) => deleteFormData(id), // Chama a função de deleção
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] }) // Invalida o cache para atualizar a lista de formulários
    },
    onError: (error) => {
      console.error('Erro ao deletar o formulário:', error)
    },
  })
}
