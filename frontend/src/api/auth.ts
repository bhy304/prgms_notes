import { httpClient } from './http'

export type JoinParams = {
  email: string | FormDataEntryValue | null
  password: string | FormDataEntryValue | null
}

export const requestJoin = (params: JoinParams) => {
  return httpClient.post('/users', params)
}
