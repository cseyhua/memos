import { fetchSystemStatus } from './system'
import { signup, signout, signin } from './auth'
import { getSelfUser } from './user'
import {
  createMemo,
  patchMemo,
  getMemoList,
  getAllMemos,
  getMemoById
} from './memo'
import { getTagList, getTagSuggestionList, upsertTag, deleteTag } from './tag'
import {
  createShortcut,
  patchShortcut,
  deleteShortcutById,
  getShortcutList
} from './shortcut'

export {
  fetchSystemStatus,
  getSelfUser,
  signup,
  signout,
  signin,
  createMemo,
  patchMemo,
  getMemoList,
  getAllMemos,
  getMemoById,
  getTagList,
  getTagSuggestionList,
  upsertTag,
  deleteTag,
  createShortcut,
  patchShortcut,
  deleteShortcutById,
  getShortcutList
}
