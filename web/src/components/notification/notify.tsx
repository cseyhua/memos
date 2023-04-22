import React, { createContext, useContext, useState } from 'react'
import Notification, { Notify } from './Notification'

let nextId = 0

export const NotificationContext = createContext<{
  setNotify: React.Dispatch<React.SetStateAction<Notify[]>>
}>({
  setNotify: () => {
    return []
  }
})

export function useNotification() {
  const {setNotify} = useContext(NotificationContext)

  return {
    open: (notify: Notify) => {
      setNotify((state) => [{ ...notify, notifyId: nextId++ }, ...state])
    }
  }
}

type Props = {
  children: React.ReactNode
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notify, setNotify] = useState<Notify[]>([])

  return (
    <NotificationContext.Provider value={{setNotify}}>
      {notify.map((notify) => (
        <Notification key={notify.notifyId} {...notify} onClose={()=>setNotify((state)=>state.filter(v=>v.notifyId!=notify.notifyId)) } />
      ))}
      {children}
    </NotificationContext.Provider>
  )
}
