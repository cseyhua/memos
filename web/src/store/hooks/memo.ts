import { DEFAULT_MEMO_LIMIT } from '@/utils/consts'
import store, { useAppSelector } from '..'
import { setIsFetching, upsertMemos } from '../reducer/memo'
import { createMemo, deleteMemo, patchMemo } from '../reducer/memo'
import { omit } from 'lodash-es'
import { useUserStore } from '.'
import * as api from '@/fetch'

const convertResponseModelMemo = (memo: Memo): Memo => {
  return {
    ...memo,
    createdTs: memo.createdTs * 1000,
    updatedTs: memo.updatedTs * 1000
  }
}

function useMemoStore() {
  const state = useAppSelector((store) => store.memo)

  const userStore = useUserStore()

  const fetchMemoById = async (memoId: MemoId) => {
    const { data } = await api.getMemoById(memoId)
    const memo = convertResponseModelMemo(data as Memo)

    return memo
  }

  return {
    state: state,
    fetchMemos: async (limit = DEFAULT_MEMO_LIMIT, offset = 0) => {
      store.dispatch(setIsFetching(true))
      const memoFind: MemoFind = {
        rowStatus: 'NORMAL',
        limit,
        offset
      }
      if (userStore.isVisitedMode()) {
        memoFind.creatorId = userStore.getUserIdFromPath()
      }
      const { data } = await api.getMemoList(memoFind)
      const fetchedMemos = data?.map((m) => convertResponseModelMemo(m)) ?? []
      store.dispatch(upsertMemos(fetchedMemos))
      store.dispatch(setIsFetching(false))

      return fetchedMemos
    },
    fetchAllMemos: async (limit = DEFAULT_MEMO_LIMIT, offset?: number) => {
      const memoFind: MemoFind = {
        rowStatus: 'NORMAL',
        limit,
        offset
      }

      const { data } = await api.getAllMemos(memoFind)
      const memos = data?.map((m) => convertResponseModelMemo(m)) ?? []
      return memos
    },
    addMemos: async (memos: Memo[]) => {
      const _memos = memos.map((memo) => convertResponseModelMemo(memo))
      store.dispatch(upsertMemos(_memos))
      return _memos
    },
    async createMemo(memoCreate: MemoCreate){
      const { data } = (await api.createMemo(memoCreate))
      const memo = convertResponseModelMemo(data as Memo)
      store.dispatch(createMemo(memo))
      return memo
    },
    async patchMemo(memoPatch: MemoPatch): Promise<Memo> {
      const { data } = await api.patchMemo(memoPatch)
      const memo = convertResponseModelMemo(data as Memo)
      store.dispatch(patchMemo(omit(memo, 'pinned')))
      return memo
    },
    pinMemo: async (memoId: MemoId) => {
      store.dispatch(
        patchMemo({
          id: memoId,
          pinned: true
        })
      )
    },
    unpinMemo: async (memoId: MemoId) => {
      store.dispatch(
        patchMemo({
          id: memoId,
          pinned: false
        })
      )
    },
    deleteMemoById: async (memoId: MemoId) => {
      store.dispatch(deleteMemo(memoId))
    },
    async getMemoById(memoId: MemoId) {
      for (const m of state.memos) {
        if (m.id === memoId) {
          return m
        }
      }
      return await fetchMemoById(memoId)
    }
  }
}

export default useMemoStore
