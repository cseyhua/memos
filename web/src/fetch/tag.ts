import { customFetch } from '@/utils/api'

export function getTagList(tagFind?: TagFind) {
  const queryList = []
  if (tagFind?.creatorId) {
    queryList.push(`creatorId=${tagFind.creatorId}`)
  }
  return customFetch<string[]>(fetch(`/api/tag?${queryList.join('&')}`))
}

export function getTagSuggestionList() {
  return customFetch<string[]>(fetch(`/api/tag/suggestion`))
}

export function upsertTag(tagName: string) {
  return customFetch<string>(
    fetch(`/api/tag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: tagName
      })
    })
  )
}

export function deleteTag(tagName: string) {
  return customFetch<boolean>(
    fetch(`/api/tag/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application'
      },
      body: JSON.stringify({
        name: tagName
      })
    })
  )
}
