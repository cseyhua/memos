import './editor.less'
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'

type Props = {
  className?: string
}

export interface EditorRefActions {
  getValue: () => string
  setValue: (text: string) => void
  focus: () => void
}

const Editor = forwardRef(
  ({ className }: Props, ref: ForwardedRef<EditorRefActions>) => {
    const editorRef = useRef<HTMLTextAreaElement>(null)

    const updateEditorHeight = () => {
      if (editorRef.current) {
        editorRef.current.style.height = 'auto'
        editorRef.current.style.height = editorRef.current.scrollHeight + 'px'
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        getValue() {
          return editorRef.current?.value ?? ''
        },
        setValue(text: string) {
          if (editorRef.current) {
            editorRef.current.value = text
            editorRef.current.focus()
            updateEditorHeight()
          }
        },
        focus() {
          editorRef.current?.focus()
        }
      }),
      []
    )

    return (
      <div className={' editor ' + className ?? ''}>
        <textarea
          ref={editorRef}
          onInput={updateEditorHeight}
          rows={1}
          className={' edit '}
          placeholder="输入你的想法"
        ></textarea>
      </div>
    )
  }
)

export default Editor
