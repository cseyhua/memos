import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/user'
import gloablSlice from './reducer/global'

const store = configureStore({
  reducer:{
    user: userSlice,
    global:gloablSlice
  }
})

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch: ()=>AppDispatch = useDispatch

export default store