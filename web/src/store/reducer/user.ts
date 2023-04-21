import { createSlice } from '@reduxjs/toolkit'

type UserSlice = {
  host:User | null,
  current:User | null
}

const userSlice = createSlice({
  name:'userstore',
  initialState:{host:null, current:null} as UserSlice,
  reducers:{}
})

export default userSlice