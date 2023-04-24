import { memo, useEffect, useRef, useState } from 'react'
import './Memo.less'
import MemoContent from './MemoContent'
import { getRelativeTimeString } from '@/utils/datetime'
import { Link } from 'react-router-dom'
import {
  useEditorStore,
  useFilterStore,
  useMemoStore,
  useUserStore
} from '@/store/hooks'
import {
  Archive,
  Bookmark,
  BookmarkMinus,
  BookmarkPlus,
  Edit3,
  Globe2,
  MoreHorizontal,
  Share,
  Trash,
  Users
} from 'lucide-react'

type Props = {
  memo: Memo
}

const Memo: React.FC<Props> = ({ memo }) => {
  const userStore = useUserStore()
  const isVisiteMode = userStore.isVisitedMode()
  const editorStore = useEditorStore()
  const memoStore = useMemoStore()
  const filterStore = useFilterStore()

  const memoContainerRef = useRef<HTMLDivElement>(null)

  // 开启双击进入编辑模式
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isVisiteMode) {
      return
    }
    const targetEl = e.target as HTMLElement
    if (targetEl.className === 'tag-span') {
      return
    } else if (targetEl.classList.contains('todo-block')) {
      return
    }
    editorStore.setEditMemoWithId(memo.id)
  }
  // todo项|tag|image被点击，则修改远程端内容
  const handleSingleClick = async (e: React.MouseEvent) => {
    const targetEl = e.target as HTMLElement

    if (targetEl.className === 'tag-span') {
      // 点击内容为标签
      const tagName = targetEl.innerText.slice(1)
      const currTagQuery = filterStore.getState().tag
      if (currTagQuery === tagName) {
        filterStore.setTagFilter(undefined)
      } else {
        filterStore.setTagFilter(tagName)
      }
    } else if (targetEl.classList.contains('todo-block')) {
      // 点击内容为todo
      if (isVisiteMode) {
        return
      }
      const status = targetEl.dataset?.value
      // 查找所有todo项目
      const todoElementList = [
        ...(memoContainerRef.current?.querySelectorAll(
          `span.todo-block[data-value=${status}]`
        ) ?? [])
      ]
      // 遍历找到点击的todo项目
      for (const element of todoElementList) {
        if (element === targetEl) {
          const index = todoElementList.indexOf(element)
          const tempList = memo.content.split(
            status === 'DONE' ? /- \[x\] / : /- \[ \] /
          )
          let finalContent = ''

          for (let i = 0; i < tempList.length; i++) {
            if (i === 0) {
              finalContent += `${tempList[i]}`
            } else {
              if (i === index + 1) {
                finalContent += status === 'DONE' ? '- [ ] ' : '- [x] '
              } else {
                finalContent += status === 'DONE' ? '- [x] ' : '- [ ] '
              }
              finalContent += `${tempList[i]}`
            }
          }
          await memoStore.patchMemo({
            id: memo.id,
            content: finalContent
          })
        }
      }
    } else if (targetEl.tagName === 'IMG') {
      // 点击的是图片
      // const imgUrl = targetEl.getAttribute('src')
      // if (imgUrl) {
      //   showPreviewImageDialog([imgUrl], 0)
      // }
    }
  }

  const [createdTimeStr, setCreatedTimeStr] = useState<string>(
    getRelativeTimeString(memo.createdTs)
  )

  useEffect(() => {
    let intervalFlag: any = -1
    if (Date.now() - memo.createdTs < 1000 * 60 * 60 * 24) {
      intervalFlag = setInterval(() => {
        setCreatedTimeStr(getRelativeTimeString(memo.createdTs))
      }, 1000 * 1)
    }

    return () => {
      clearInterval(intervalFlag)
    }
  }, [])

  return (
    <div className="memo-wrapper" ref={memoContainerRef}>
      <div className="memo-top-wrapper">
        <div className="left">
          <Link to={`/memo/${memo.id}`}>{createdTimeStr}</Link>
          {
            <Link className="name-text" to={`/u/${memo.creatorId}`}>
              @{memo.creatorName}
            </Link>
          }
        </div>
        {!isVisiteMode && (
          <div className="right">
            {memo.visibility !== 'PRIVATE' && (
              <div
                onClick={() => {
                  // handleMemoVisibilityClick(memo.visibility)
                }}
              >
                {memo.visibility === 'PUBLIC' ? (
                  <Globe2 className="icon" />
                ) : (
                  <Users className="icon" />
                )}
              </div>
            )}
            {memo.pinned && <Bookmark className="icon" />}
            <span className="btn more-action-btn">
              <MoreHorizontal className="icon" />
            </span>
            <div className="more-action-btns-wrapper">
              <div className="more-action-btns-container">
                <span
                  className="btn"
                  onClick={() => {
                    // handleTogglePinMemoBtnClick
                  }}
                >
                  {memo.pinned ? (
                    <BookmarkMinus className="icon" />
                  ) : (
                    <BookmarkPlus className="icon" />
                  )}
                  {memo.pinned ? '置顶' : '取消置顶'}
                </span>
                <span
                  className="btn"
                  onClick={() => {
                    // handleEditMemoClick
                  }}
                >
                  <Edit3 className="icon" />
                  {'编辑'}
                </span>
                <span
                  className="btn"
                  onClick={() => {
                    // handleGenerateMemoImageBtnClick
                  }}
                >
                  <Share className="icon" />
                  {'共享'}
                </span>
                <span
                  className="btn"
                  onClick={() => {
                    // handleArchiveMemoClick
                  }}
                >
                  <Archive className="icon" />
                  {'归档'}
                </span>
                <span
                  className="btn"
                  onClick={() => {
                    // handleDeleteMemoClick
                  }}
                >
                  <Trash className="icon" />
                  {'删除'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <MemoContent
        content={memo.content}
        onDoubleClick={handleDoubleClick}
        onSingleClick={handleSingleClick}
      />
    </div>
  )
}

export default memo(Memo)
