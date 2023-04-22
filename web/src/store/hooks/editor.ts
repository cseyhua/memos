import store, { useAppSelector } from ".."
import { setEditMemoId, setMemoVisibility, setResourceList } from "../reducer/editor";

function useEditorStore(){

  const state = useAppSelector(store=>store.editor)

  return {
    editor:state,
    getState(){
      return store.getState().editor
    },
    setEditMemoWithId(editMemoId: MemoId){
      store.dispatch(setEditMemoId(editMemoId));
    },
    clearEditMemo(){
      store.dispatch(setEditMemoId());
    },
    setMemoVisibility(memoVisibility: Visibility){
      store.dispatch(setMemoVisibility(memoVisibility));
    },
    setResourceList(resourceList: Resource[]){
      store.dispatch(setResourceList(resourceList));
    },
    clearResourceList(){
      store.dispatch(setResourceList([]));
    },
  }
}

export default useEditorStore