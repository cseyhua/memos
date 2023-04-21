import { Loader } from "lucide-react"

import './Loading.less'

type Props = {
  size?: number
}

function Loading({size}:Props) {
  return (
    <div className="load">
      <Loader className="loader" size={size ?? 20} />
    </div>
  )
}

export default Loading
