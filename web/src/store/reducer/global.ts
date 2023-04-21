import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
  appearance: Appearance
  systemStatus: SystemStatus
}

const gloablSlice = createSlice({
  name: 'globalslice',
  initialState: {
    appearance: 'system',
    systemStatus: {
      host: undefined,
      profile: {
        mode: 'prod',
        version: '0.12.2'
      },
      dbSize: 0,
      allowSignUp: false,
      ignoreUpgrade: false,
      disablePublicMemos: false,
      additionalStyle: '',
      additionalScript: '',
      customizedProfile: {
        name: 'memos',
        logoUrl: '/vite.svg',
        description: '',
        locale: 'zh',
        appearance: 'system',
        externalUrl: ''
      }
    }
  } as State,
  reducers: {
    setGlobalState:(state, action:PayloadAction<Partial<State>>)=>{
      return {
        ...state,
        ...action.payload
      }
    },
    setAppearance:(state, action:PayloadAction<Appearance>)=>{
      return {
        ...state,
        appearance:action.payload
      }
    }
  }
})

export const { setAppearance, setGlobalState } = gloablSlice.actions

export default gloablSlice.reducer
