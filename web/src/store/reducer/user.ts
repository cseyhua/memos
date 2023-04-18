import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
  hostExsited: boolean, 
  user: User
  isVisitedMode: boolean
}

const userSlice = createSlice({
  name: 'user',
  initialState: { isVisitedMode: true, hostExsited:false } as State,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      return { ...state, user: action.payload || state.user }
    },
    setVisitedMode: (state, action: PayloadAction<boolean>) => {
      return { ...state, isVisitedMode: action.payload }
    },
    setHostExsited: (state, action: PayloadAction<boolean>) => {
        return { ...state, hostExsited: action.payload }
      }
  }
})

export const { setUser, setVisitedMode, setHostExsited } = userSlice.actions

export default userSlice.reducer
