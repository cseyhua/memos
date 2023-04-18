import store, { useAppDispatch, useAppSelector } from './store'
import { setUser, setVisitedMode, setHostExsited } from './reducer/user'
import * as api from '@/api'

export const convertResponseModelUser = (user: User): User => {
  return {
    ...user,
    createdTs: user.createdTs * 1000,
    updatedTs: user.updatedTs * 1000
  }
}

export const doSignIn = async () => {
  const { data: user } = await api.getSelfUser()
  if (user) {
    store.dispatch(setUser(convertResponseModelUser(user)))
    store.dispatch(setVisitedMode(false))
  } else {
    doSignOut()
  }
  return user
}

export const doSignOut = async () => {
  await api.signout()
}

function useUserStore() {
  const state = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()
  return {
    user: state.user,
    isVisited: state.isVisitedMode,
    hostExsited: state.hostExsited,
    setUserAsVisitedMode: (isVisited: boolean) => {
      dispatch(setVisitedMode(isVisited))
    },
    setHostExsited: (hostExsited: boolean) => {
      dispatch(setHostExsited(hostExsited))
    },
    setUser: (user: User) => {
      dispatch(setUser(user))
    }
  }
}

export default useUserStore
