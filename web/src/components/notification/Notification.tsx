import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Info } from 'lucide-react'
import './Notification.less'

const getContainer = () => {
  let container = document.getElementById('memosnotification')
  if (container) return container

  container = document.createElement('div')
  container.id = 'memosnotification'
  document.body.appendChild(container)
  return container
}

export type Notify = {
  notifyId?: number
  content: string
  onClose?: () => void
  timeOut?: number
}

type Props = Notify

const Notification: React.FC<Props> = ({ content, timeOut, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, timeOut ?? 10000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return createPortal(
    <div className='notify'>
      <Info size={16} />
      <div className='content' onClick={() => onClose?.()}>{content}</div>
    </div>,
    getContainer()
  )
}

export default Notification
