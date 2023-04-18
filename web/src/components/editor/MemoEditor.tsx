import styled from 'styled-components'
import {
  CalendarCheck,
  ChevronsLeftRight,
  FileText,
  Maximize,
  Minimize,
  Hash
} from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

const EditorCss = styled.div`
  display: flex;
  width: 100%;
  background-color: transparent;
`
const Textarea = styled.textarea`
  width: inherit;
  resize: none;
  max-height: 300px;
  font-size: 20px;
  border: 0;
  padding: 0 0 0.5em 0;
  overflow-y: auto;
  overflow-x: hidden;
  line-height: 24px;
  background-color: transparent;
  &:focus {
    outline: 0;
  }
`

function Editor() {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      updateEditorHeight()
    }
  }, [editorRef.current?.value])

  const updateEditorHeight = () => {
    if (editorRef.current) {
      editorRef.current.style.height = 'auto'
      editorRef.current.style.height =
        (editorRef.current.scrollHeight - 10 ?? 0) + 'px'
    }
  }

  const handleEditorInput = useCallback(() => {
    // handleContentChangeCallback(editorRef.current?.value ?? "");
    updateEditorHeight()
  }, [])

  return (
    <EditorCss>
      <Textarea ref={editorRef} onInput={handleEditorInput} rows={1} placeholder="有什么想法..." />
    </EditorCss>
  )
}

const MemoEditor = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #90f757;
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: #f0f0f0;
`

const ToolsWrapper = styled.div`
  display: flex;
  gap: 0.25em;
  & .icon {
    cursor:pointer;
  }
`

const Fotter = styled.div`
display:flex;
justify-content:space-between;
`
const Save = styled.button`
padding:0.25em 0.5em;
font-size:20px;
border:0;
background-color: #603f90;
color: #e0e0e0;
border-radius:0.5em;
cursor:pointer;
`

export default function () {
  return (
    <MemoEditor>
      <Editor />
      <ToolsWrapper>
        <div>
          <Hash className='icon' size={16} />
        </div>
        <div>
          <CalendarCheck className='icon' size={16} />
        </div>
        <div>
          <ChevronsLeftRight className='icon' size={16} />
        </div>
        <div>
          <FileText className='icon' size={16} />
        </div>
        <div>
          <Maximize className='icon' size={16} />
        </div>
      </ToolsWrapper>
      <Fotter>
        <div></div>
        <Save>记下</Save>
      </Fotter>
    </MemoEditor>
  )
}
