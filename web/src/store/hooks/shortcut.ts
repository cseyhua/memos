import * as api from '@/fetch'
import store, { useAppSelector } from '..'
import {
  createShortcut,
  deleteShortcut,
  patchShortcut,
  setShortcuts
} from '../reducer/shortcut'

const convertResponseModelShortcut = (shortcut: Shortcut): Shortcut => {
  return {
    ...shortcut,
    createdTs: shortcut.createdTs * 1000,
    updatedTs: shortcut.updatedTs * 1000
  }
}

export default () => {
  const state = useAppSelector((state) => state.shortcut)
  return {
    state,
    getState: () => {
      return store.getState().shortcut
    },
    getMyAllShortcuts: async () => {
      const { data } = (await api.getShortcutList())
      const shortcuts = data?.map((s) => convertResponseModelShortcut(s))
      store.dispatch(setShortcuts(shortcuts ?? []))
    },
    getShortcutById: (id: ShortcutId) => {
      for (const s of state.shortcuts) {
        if (s.id === id) {
          return s
        }
      }

      return null
    },
    createShortcut: async (shortcutCreate: ShortcutCreate) => {
      const { data } = (await api.createShortcut(shortcutCreate))
      const shortcut = convertResponseModelShortcut(data as Shortcut)
      store.dispatch(createShortcut(shortcut))
    },
    patchShortcut: async (shortcutPatch: ShortcutPatch) => {
      const { data } = (await api.patchShortcut(shortcutPatch))
      const shortcut = convertResponseModelShortcut(data as Shortcut)
      store.dispatch(patchShortcut(shortcut))
    },
    deleteShortcutById: async (shortcutId: ShortcutId) => {
      await api.deleteShortcutById(shortcutId)
      store.dispatch(deleteShortcut(shortcutId))
    }
  }
}
