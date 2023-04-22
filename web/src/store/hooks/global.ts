import { fetchSystemStatus } from '@/fetch'
import store, { useAppSelector } from '..'
import { setGlobalState,setAppearance } from '../reducer/global'

export const initialGlobalState = async () => {
  const defaultGlobalState = {
    appearance: 'system' as Appearance,
    systemStatus: {
      allowSignUp: false,
      ignoreUpgrade: false,
      disablePublicMemos: false,
      additionalStyle: '',
      additionalScript: '',
      customizedProfile: {
        name: 'memos',
        logoUrl: '/logo.webp',
        description: '',
        locale: 'en',
        appearance: 'system',
        externalUrl: ''
      }
    } as SystemStatus
  }
  let { isSuccess, data } = await fetchSystemStatus()
  if (isSuccess && data) {
    const customizedProfile = data.customizedProfile
    defaultGlobalState.systemStatus = {
      ...data,
      customizedProfile: {
        name: customizedProfile.name || 'memos',
        logoUrl: customizedProfile.logoUrl || '/logo.webp',
        description: customizedProfile.description,
        locale: customizedProfile.locale || 'en',
        appearance: customizedProfile.appearance || 'system',
        externalUrl: ''
      }
    }
    defaultGlobalState.appearance = customizedProfile.appearance
  }
  store.dispatch(setGlobalState(defaultGlobalState))
}

function useGlobalStore() {
  const state = useAppSelector((store) => store.global)
  return {
    appearance: state.appearance,
    systemStatus: state.systemStatus,
    setAppearance: (appearance: Appearance) => {
      store.dispatch(setAppearance(appearance))
    },
    setSystemStatus: (systemStatus: Partial<SystemStatus>) => {
      store.dispatch(
        setGlobalState({
          systemStatus: {
            ...state.systemStatus,
            ...systemStatus
          }
        })
      )
    }
  }
}

export default useGlobalStore
