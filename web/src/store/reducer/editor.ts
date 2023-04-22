import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
  name: 'editorstore',
  initialState: {
    memoVisibility:'PRIVATE',
    resourceList:[]
  } as EditorState,
  reducers: {
    setEditMemoId: (state, action: PayloadAction<Option<MemoId>>) => {
      return {
        ...state,
        editMemoId: action.payload,
      };
    },
    setMemoVisibility: (state, action: PayloadAction<Visibility>) => {
      return {
        ...state,
        memoVisibility: action.payload,
      };
    },
    setResourceList: (state, action: PayloadAction<Resource[]>) => {
      return {
        ...state,
        resourceList: action.payload,
      };
    },
  }
})

export const { setEditMemoId, setMemoVisibility, setResourceList } = editorSlice.actions

export default editorSlice.reducer
