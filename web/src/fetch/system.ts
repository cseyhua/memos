import { customFetch } from '@/utils/api'

export async function fetchSystemStatus(){
  return customFetch<SystemStatus>(fetch('/api/status'))
}