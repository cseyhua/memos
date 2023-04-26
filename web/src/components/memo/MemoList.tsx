import {
  useUserStore,
  useMemoStore,
  useFilterStore,
  useShortcutStore
} from '@/store/hooks'
import { DEFAULT_MEMO_LIMIT, TAG_REG } from '@/utils/consts'
import { useEffect, useState } from 'react'
import Memo from './Memo'
import { checkShouldShowMemoWithFilters } from '@/utils/filter'
import { getTimeStampByDate } from '@/utils/datetime'
import { LINK_REG } from '@/labs/marked/parser'

import './MemoList.less'

const MemoList: React.FC = () => {
  const memoStore = useMemoStore()
  const userStore = useUserStore()
  const filterStore = useFilterStore()
  const shortcutStore = useShortcutStore()
  const filter = filterStore.state
  const { memos } = memoStore.state
  const currentUserId = userStore.getCurrentId()

  const [isComplete, setIsComplete] = useState<boolean>(false)

  const {
    tag: tagQuery,
    duration,
    type: memoType,
    text: textQuery,
    shortcutId,
    visibility
  } = filter
  const shortcut = shortcutId ? shortcutStore.getShortcutById(shortcutId) : null

  const showMemoFilter = Boolean(
    tagQuery ||
    (duration && duration.from < duration.to) ||
    memoType ||
    textQuery ||
    shortcut ||
    visibility
  )

  const shownMemos = (
    showMemoFilter || shortcut
      ? memos.filter((memo) => {
        let shouldShow = true

        if (shortcut) {
          const filters = JSON.parse(shortcut.payload) as Filter[]
          if (Array.isArray(filters)) {
            shouldShow = checkShouldShowMemoWithFilters(memo, filters)
          }
        }
        if (tagQuery) {
          const tagsSet = new Set<string>()
          for (const t of Array.from(
            memo.content.match(new RegExp(TAG_REG, 'g')) ?? []
          )) {
            const tag = t.replace(TAG_REG, '$1').trim()
            const items = tag.split('/')
            let temp = ''
            for (const i of items) {
              temp += i
              tagsSet.add(temp)
              temp += '/'
            }
          }
          if (!tagsSet.has(tagQuery)) {
            shouldShow = false
          }
        }
        if (
          duration &&
          duration.from < duration.to &&
          (getTimeStampByDate(memo.createdTs) < duration.from ||
            getTimeStampByDate(memo.createdTs) > duration.to)
        ) {
          shouldShow = false
        }
        if (memoType) {
          if (
            memoType === 'NOT_TAGGED' &&
            memo.content.match(TAG_REG) !== null
          ) {
            shouldShow = false
          } else if (
            memoType === 'LINKED' &&
            memo.content.match(LINK_REG) === null
          ) {
            shouldShow = false
          }
        }
        if (
          textQuery &&
          !memo.content.toLowerCase().includes(textQuery.toLowerCase())
        ) {
          shouldShow = false
        }
        if (visibility) {
          shouldShow = memo.visibility === visibility
        }

        return shouldShow
      })
      : memos
  ).filter((memo) => memo.creatorId === currentUserId)

  const pinnedMemos = shownMemos.filter((m) => m.pinned)
  const unpinnedMemos = shownMemos.filter((m) => !m.pinned)
  const memoSort = (mi: Memo, mj: Memo) => {
    return mj.createdTs - mi.createdTs
  }
  pinnedMemos.sort(memoSort)
  unpinnedMemos.sort(memoSort)

  const sortedMemos = pinnedMemos
    .concat(unpinnedMemos)
    .filter((m) => m.rowStatus === 'NORMAL')

  // 请求用户的memos
  useEffect(() => {
    memoStore
      .fetchMemos()
      .then((fetchedMemos) => {
        if (fetchedMemos.length < DEFAULT_MEMO_LIMIT) {
          setIsComplete(true)
        } else {
          setIsComplete(false)
        }
      })
      .catch((error) => {
        console.log('错误来自memolist', error)
      })
  }, [currentUserId])

  return (
    <div className='memo-list-wrapper'>
      {sortedMemos.map((memo) => (
        <Memo key={`${memo.id}-${memo.createdTs}`} memo={memo}></Memo>
      ))}
      <div className='memo-list-end'>
        {isComplete ? <div>没有了...</div> : <div>加载更多...</div>}
      </div>
    </div>
  )
}

export default MemoList
