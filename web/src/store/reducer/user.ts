import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserSlice = {
  host:User | null,
  current:User | null
}

const userSlice = createSlice({
  name:'userstore',
  initialState:{host:null, current:null} as UserSlice,
  reducers:{
    setUser:(state, action:PayloadAction<User>)=>{
      return {
        ...state,
        current:action.payload
      }
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer