import {} from 'react-redux'
import store, { useAppSelector } from '..'
import { getSelfUser, signout } from '@/fetch'
import { setUser } from '../reducer/user'
import { UNKNOWN_ID } from '@/utils/consts'

const getUserIdFromPath = () => {
  const pathname = window.location.pathname;
  const userIdRegex = /^\/u\/(\d+).*/;
  const result = pathname.match(userIdRegex);
  if (result && result.length === 2) {
    return Number(result[1]);
  }
  return undefined;
}

const convertResponseModelUser = (user: User) => {
  return {
    ...user,
    createdTs: user.createdTs * 1000,
    updatedTs: user.updatedTs * 1000
  } as User
}

export const doSignIn = async () => {
  if (store.getState().user.current) {
    return store.getState().user.current
  } else {
    console.log('获取用户信息')
    const { data: user } = await getSelfUser()
    if (user) {
      store.dispatch(setUser(convertResponseModelUser(user)))
    } else {
      doSignOut()
    }
    return user
  }
}

export const doSignOut = async () => {
  await signout()
}

function useUserStore() {
  const state = useAppSelector((store) => store.user)

  const isVisitedMode = ()=>{
    return state.current == null || state.current == undefined
  }

  return {
    user:state.current,
    isVisitedMode,
    getUserIdFromPath,
    getCurrentId:()=>{
      return state.current?.id ?? UNKNOWN_ID
    }
  }
}

export default useUserStore
