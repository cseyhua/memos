import { useEffect, useRef, useState } from 'react'
import Editor, { EditorRefActions } from './Editor'
import Tools from './Tools'
import { useNotification } from '@/components/notification'

import './memo-editor.less'
import { useEditorStore, useMemoStore, useTagStore } from '@/store/hooks'
import { UNKNOWN_ID } from '@/utils/consts'
import { getMatchedNodes } from '@/labs/marked'
import { uniq } from 'lodash-es'

interface State {
  fullscreen: boolean
  isUploadingResource: boolean
  isRequesting: boolean
}

function MemoEditor() {
  const editorStore = useEditorStore()
  const memoStore = useMemoStore()
  const tagStore = useTagStore()
  const editorState = editorStore.editor
  const notificate = useNotification()

  const [state, setState] = useState<State>({
    fullscreen: false,
    isUploadingResource: false,
    isRequesting: false
  })
  const editorRef = useRef<EditorRefActions>(null)
  const prevEditorStateRef = useRef(editorState)

  // 记下按钮被点击
  const handleSave = async () => {
    const content = editorRef.current?.getValue() ?? ''
    if (!content) return
    if (state.isRequesting) return

    setState((state) => ({
      ...state,
      isRequesting: true
    }))
    try {
      const { editMemoId } = editorStore.getState()
      if (editMemoId && editMemoId !== UNKNOWN_ID) {
        const prevMemo = await memoStore.getMemoById(editMemoId ?? UNKNOWN_ID)

        if (prevMemo) {
          await memoStore.patchMemo({
            id: prevMemo.id,
            content,
            visibility: editorState.memoVisibility,
            resourceIdList: editorState.resourceList.map((r) => r.id)
          })
        }
        editorStore.clearEditMemo()
      } else {
        await memoStore.createMemo({
          content,
          visibility: editorState.memoVisibility,
          resourceIdList: editorState.resourceList.map(
            (resource) => resource.id
          )
        })
      }
    } catch (err) {
      notificate.open({
        content: err as string
      })
    }

    setState((state) => ({
      ...state,
      isRequesting: false
    }))

    // 处理标签
    const matchedNodes = getMatchedNodes(content);
    const tagNameList = uniq(matchedNodes.filter((node) => node.parserName === "tag").map((node) => node.matchedContent.slice(1)));
    for (const tagName of tagNameList) {
      await tagStore.upsertTag(tagName);
    }

    editorStore.clearResourceList()
    editorRef.current?.setValue('')
  }

  // 使编辑器聚焦
  const handleEditorFocus = () => {
    editorRef.current?.focus()
  }

  useEffect(() => {
    if (editorState.editMemoId) {
      memoStore
        .getMemoById(editorState.editMemoId ?? UNKNOWN_ID)
        .then((memo) => {
          if (memo) {
            handleEditorFocus()
            editorStore.setMemoVisibility(memo.visibility)
            editorStore.setResourceList(memo.resourceList)
            editorRef.current?.setValue(memo.content ?? '')
          }
        })
    }

    prevEditorStateRef.current = editorState
  }, [editorState.editMemoId])

  return (
    <div className={`memo-editor ` + (state.fullscreen && ' fullscreen ')}>
      <Editor ref={editorRef} className="memo-edit" />
      <div className="foot">
        <Tools
          fullscreen={state.fullscreen}
          onFullScreen={(bool) =>
            setState((state) => ({
              ...state,
              fullscreen: bool
            }))
          }
        />
        <div onClick={handleSave} className="save">
          记下
        </div>
      </div>
    </div>
  )
}

export default MemoEditor
