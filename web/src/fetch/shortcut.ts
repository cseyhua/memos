import { customFetch } from '@/utils/api'

export function getShortcutList(shortcutFind?: ShortcutFind) {
  const queryList = []
  if (shortcutFind?.creatorId) {
    queryList.push(`creatorId=${shortcutFind.creatorId}`)
  }
  return customFetch<Shortcut[]>(fetch(`/api/shortcut?${queryList.join('&')}`))
}

export function createShortcut(shortcutCreate: ShortcutCreate) {
  return customFetch<Shortcut>(
    fetch('/api/shortcut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shortcutCreate)
    })
  )
}

export function patchShortcut(shortcutPatch: ShortcutPatch) {
  return customFetch<Shortcut>(
    fetch(`/api/shortcut/${shortcutPatch.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shortcutPatch)
    })
  )
}

export function deleteShortcutById(shortcutId: ShortcutId) {
  return customFetch(
    fetch(`/api/shortcut/${shortcutId}`, {
      method: 'DELETE'
    })
  )
}
