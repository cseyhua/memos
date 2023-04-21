import { customFetch } from '@/utils/api'

export function signup(name:string, pass:string){
  return customFetch<User>(fetch('/api/auth/signup', {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username:name, password:pass})
  }))
}

export function signin(name:string, pass:string){
  return customFetch<User>(fetch('/api/auth/signin', {
    method:'POST',
    headers:{
      'Content-Type':'application'
    },
    body:JSON.stringify({username:name, password:pass})
  }))
}

export function signout(){
  return customFetch(fetch('/api/auth/signout', {
    method:'POST'
  }))
}