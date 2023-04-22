import './MemoContent.less'

import { marked } from '@/labs/marked'

type Props = {
  content: string
  onSingleClick: (e: React.MouseEvent) => void
  onDoubleClick: (e: React.MouseEvent) => void
}

const MemoContent: React.FC<Props> = ({
  content,
  onDoubleClick,
  onSingleClick
}) => {
  return (
    <div
      className="memo-content-text"
      onDoubleClick={onDoubleClick}
      onClick={onSingleClick}
    >
      {marked(content)}
    </div>
  )
}

export default MemoContent
