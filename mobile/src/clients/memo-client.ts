import { GetMemoResponse, PostMemoRequest, PostMemoResponse, PatchMemoResponse, PatchMemoRequest, DeleteMemoRequest } from '../models/memos'
import { baseClient } from './base-client'

export const postMemo = async (title: string, content: string, token: string): Promise<PostMemoResponse> => {
    const body: PostMemoRequest = { title: title, content: content }
    const { data } = await baseClient.post<PostMemoResponse>('/api/memo', body, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return data
}

export const getMemos = async (token: string): Promise<GetMemoResponse> => {
    const { data } = await baseClient.get<GetMemoResponse>('api/memo', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return data
}

export const patchMemo = async (id: number, content: string, token: string): Promise<PatchMemoResponse> => {
    const body: PatchMemoRequest = { id: id, content: content }
    const { data } = await baseClient.patch<PatchMemoResponse>('api/memo', body, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return data
}

export const deleteMemo = async (id: number, token: string): Promise<void> => {
    const body: DeleteMemoRequest = { id: id }
    await baseClient.delete<void>('api/memo', {
        headers: { Authorization: `Bearer ${token}` },
        data: body,
    })
}
