import { customFetch } from '@/utils/other'

export const getSystemStatus = () => {
    return customFetch<SystemStatus>(fetch('/api/status'))
}