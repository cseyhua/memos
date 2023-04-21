import { Search } from 'lucide-react'
import './SearchInput.less'
import useInput from '@/hooks/useInput'

function SearchInput(){

  const searchKey = useInput()

  return (
    <div className="search-input">
      <Search size={20} color='#808080' />
      <input {...searchKey} placeholder='看点啥' />
    </div>
  )
}

export default SearchInput