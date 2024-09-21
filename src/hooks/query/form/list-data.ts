'use client'
import { REACT_QUERY_STALE_TIME } from '@/constants/general'
import { get } from '@/data/client/htpp-client'
import { useQuery } from '@tanstack/react-query'

const fetchForms = async () => {
  const response = await get(`/form`)
  return response
}

export const useForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
    staleTime: REACT_QUERY_STALE_TIME,
  })
}
