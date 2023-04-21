import { customFetch } from '@/utils/api'

export function getSelfUser(){
  return customFetch<User>(fetch('/api/user/me'))
}