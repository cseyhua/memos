type Visibility = "PUBLIC" | "PROTECTED" | "PRIVATE";

interface EditorState {
  memoVisibility: Visibility;
  resourceList: Resource[];
  editMemoId?: MemoId;
}

type Option<T> = T | undefined;
