import { isAxiosError } from 'axios'
import { requestJoin } from '@/api/auth'
import type { JoinParams } from '@/api/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useJoin = () => {
  const queryClient = useQueryClient()

  const joinMutation = useMutation({
    mutationFn: async (params: JoinParams) => {
      try {
        await requestJoin(params)
        return { result: 'success' as const }
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          return { result: 'conflict' as const }
        }
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { join: joinMutation.mutateAsync }
}
