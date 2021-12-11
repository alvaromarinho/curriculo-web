import { api, apiCtx } from "./API";
import { Curriculo } from "../models/User";

export async function authenticate(data: object) {
    return (await api.post('/auth', data))?.data
}

export async function getUser() {
    return (await api.get('/user'))?.data
}

export async function updateUser(obj: Curriculo) {
    return (await api.put('/user', obj))?.data
}

export async function getAllUserData(ctx: any, id: number) {
    return (await apiCtx(ctx).get(`/user/${id}`))?.data
}