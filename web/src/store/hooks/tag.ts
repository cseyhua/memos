import { useUserStore } from "."
import store, { useAppSelector } from ".."
import * as api from '@/fetch'
import { deleteTag, setTags, upsertTag } from "../reducer/tag"

function useTagStore(){
  const state = useAppSelector(store=>store.tag)
  const userStore = useUserStore()
  return {
    tags:state.tags,
    getState(){
      return store.getState().tag
    },
    fetchTags: async () => {
      const tagFind: TagFind = {};
      if (userStore.isVisitedMode()) {
        tagFind.creatorId = userStore.getUserIdFromPath();
      }
      const { data } = (await api.getTagList(tagFind));
      store.dispatch(setTags(data ?? []));
    },
    upsertTag: async (tagName: string) => {
      await api.upsertTag(tagName);
      store.dispatch(upsertTag(tagName));
    },
    deleteTag: async (tagName: string) => {
      await api.deleteTag(tagName);
      store.dispatch(deleteTag(tagName));
    }
  }
}

export default useTagStore