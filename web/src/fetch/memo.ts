import { customFetch } from '@/utils/api'

export function createMemo(memoCreate: MemoCreate) {
  return customFetch<Memo>(
    fetch('/api/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memoCreate)
    })
  )
}

export function patchMemo(memoPatch: MemoPatch) {
  return customFetch<Memo>(
    fetch(`/api/memo/${memoPatch.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memoPatch)
    })
  )
}

export function getMemoList(memoFind: MemoFind) {
  const queryList = []
  if (memoFind.creatorId) {
    queryList.push(`creatorId=${memoFind.creatorId}`)
  }
  if (memoFind.rowStatus) {
    queryList.push(`rowStatus=${memoFind.rowStatus}`)
  }
  if (memoFind.pinned) {
    queryList.push(`pinned=${memoFind.pinned}`)
  }
  if (memoFind.offset) {
    queryList.push(`offset=${memoFind.offset}`)
  }
  if (memoFind.limit) {
    queryList.push(`limit=${memoFind.limit}`)
  }
  return customFetch<Memo[]>(fetch(`/api/memo?${queryList.join('&')}`))
}

export function getAllMemos(memoFind: MemoFind) {
  const queryList = [];
  if (memoFind.offset) {
    queryList.push(`offset=${memoFind.offset}`);
  }
  if (memoFind.limit) {
    queryList.push(`limit=${memoFind.limit}`);
  }

  return customFetch<Memo[]>(fetch(`/api/memo/all?${queryList.join("&")}`))
}

export function getMemoById(id: MemoId){
  return customFetch<Memo>(fetch(`/api/memo/${id}`))
}
