import { api, apiCtx } from "./API";

export async function authenticate(data: object) {
    return (await api.post('/auth', data))?.data
}

export async function getAllUserData(ctx: any, id: number) {
    return (await apiCtx(ctx).get(`/user/${id}`))?.data
}