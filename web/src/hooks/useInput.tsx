import { useState } from "react"

function useInput(){

  const [value, setValue] = useState("")

  function onChange(e:any){
    setValue(e.target.value)
  }

  return {
    value, onChange
  }
}

export default useInput