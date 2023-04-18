import { lazy } from 'react'

export const customImportWithAsync = (fn: any) =>
  lazy(() =>
    new Promise((resolve) => {
      setTimeout(resolve, 500)
    }).then((v) => fn)
  )

export function customFetch<T>(fn:Promise<Response>){
  return fn.then(async res=>{
    if(res.status === 200 )return Promise.resolve<ResponseRaw<T>>({...await res.json(), message:res.statusText})
    return Promise.resolve<ResponseRaw<T>>({statusCode:res.status, error:res.statusText, message:res.statusText})
  })
}