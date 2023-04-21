import {} from 'react-redux'
import store, { useAppSelector } from '..'
import { getSelfUser, signout } from '@/fetch'
import { setUser } from '../reducer/user'

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

function useUser() {
  const user = useAppSelector((store) => store.user)

  const isVisitedMode = ()=>{
    return user.current == null || user.current == undefined
  }

  return {
    user:user.current,
    isVisitedMode
  }
}

export default useUser
