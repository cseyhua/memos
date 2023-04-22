import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFilterStore, useShortcutStore } from '@/store/hooks'
import { getDateString } from '@/utils/datetime'
import { getTextWithMemoType } from '@/utils/filter'
import { Box, Calendar, Eye, Search, Tag, Target } from 'lucide-react'

import "./MemoFilter.less"

const MemoFilter = () => {
  const location = useLocation()
  const filterStore = useFilterStore()
  const shortcutStore = useShortcutStore()
  const filter = filterStore.state
  const {
    tag: tagQuery,
    duration,
    type: memoType,
    text: textQuery,
    shortcutId,
    visibility
  } = filter
  const shortcut = shortcutId ? shortcutStore.getShortcutById(shortcutId) : null
  const showFilter = Boolean(
    tagQuery ||
      (duration && duration.from < duration.to) ||
      memoType ||
      textQuery ||
      shortcut ||
      visibility
  )

  useEffect(() => {
    filterStore.clearFilter()
  }, [location])

  return (
    <div className={`filter-query-container ${showFilter ? '' : 'hidden'}`}>
      <span className="mx-2 text-gray-400">过滤器:</span>
      <div
        className={'filter-item-container ' + (shortcut ? '' : 'hidden')}
        onClick={() => {
          filterStore.setMemoShortcut(undefined)
        }}
      >
        <Target className="icon-text" /> {shortcut?.title}
      </div>
      <div
        className={'filter-item-container ' + (tagQuery ? '' : 'hidden')}
        onClick={() => {
          filterStore.setTagFilter(undefined)
        }}
      >
        <Tag className="icon-text" /> {tagQuery}
      </div>
      <div
        className={'filter-item-container ' + (memoType ? '' : 'hidden')}
        onClick={() => {
          filterStore.setMemoTypeFilter(undefined)
        }}
      >
        <Box className="icon-text" />{' '}
        {getTextWithMemoType(memoType as MemoSpecType)}
      </div>
      <div
        className={'filter-item-container ' + (visibility ? '' : 'hidden')}
        onClick={() => {
          filterStore.setMemoVisibilityFilter(undefined)
        }}
      >
        <Eye className="icon-text" /> {visibility}
      </div>
      {duration && duration.from < duration.to ? (
        <div
          className="filter-item-container"
          onClick={() => {
            filterStore.setFromAndToFilter()
          }}
        >
          <Calendar className="icon-text" />
          {getDateString(duration.from) + '-' + getDateString(duration.to) }
        </div>
      ) : null}
      <div
        className={'filter-item-container ' + (textQuery ? '' : 'hidden')}
        onClick={() => {
          filterStore.setTextFilter(undefined)
        }}
      >
        <Search className="icon-text" /> {textQuery}
      </div>
    </div>
  )
}

export default MemoFilter
