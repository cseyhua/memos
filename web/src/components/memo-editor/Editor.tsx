import useInput from '@/hooks/useInput'
import './editor.less'
import { useRef } from 'react'

function Editor({className}:{className?:string, fullscreen?:boolean}) {
  const memoContent = useInput()
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const updateEditorHeight = () => {
    if(editorRef.current){
      editorRef.current.style.height = 'auto'
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px'
    }
  }

  return (
    <div className={' editor ' + className ?? ''}>
      <textarea
        ref={editorRef}
        onInput={updateEditorHeight}
        {...memoContent}
        rows={1}
        className={ ' edit ' } 
        placeholder="输入你的想法"
      ></textarea>
    </div>
  )
}

export default Editor
