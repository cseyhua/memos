import { customFetch } from "@/utils/other"

export function signin(name: string, pass: string) {
    return customFetch<User>(fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            pass: pass
        })
    }))
}

export function signup(name: string, pass: string) {
    return customFetch<User>(fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            pass: pass
        })
    }))
}

export function signout() {
    return customFetch(fetch("/api/auth/signout", {
        method: 'POST'
    }))
}

export function getSelfUser() {
    return customFetch<User>(fetch("/api/user/me"))
}