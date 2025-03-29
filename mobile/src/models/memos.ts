export type Memo = {
    id: number
    title: string
    content: string
    createdAt: string
}

export type PostMemoRequest = {
    title: string
    content: string
}

export type PostMemoResponse = {
    id: number
}

export type GetMemoResponse = {
    memos: Memo[]
}

export type PatchMemoRequest = {
    id: number
    content: string
}

export type PatchMemoResponse = {
    id: number
}

export type DeleteMemoRequest = {
    id: number
}
