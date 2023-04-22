import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/user'
import gloablSlice from './reducer/global'
import editorSlice from './reducer/editor'
import memoSlice from './reducer/memo'
import tagSlice from './reducer/tag'
import filterSlice from './reducer/filter'
import shortcutSlice from './reducer/shortcut'

const store = configureStore({
  reducer:{
    user: userSlice,
    global:gloablSlice,
    editor:editorSlice,
    memo:memoSlice,
    tag:tagSlice,
    filter:filterSlice,
    shortcut:shortcutSlice
  }
})

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch: ()=>AppDispatch = useDispatch

export default store