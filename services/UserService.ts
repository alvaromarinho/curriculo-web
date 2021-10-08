import { api } from "./API";

export async function authenticate(data: object) {
    return (await api.post('/authenticate', data)).data
}

export async function getAllUserData(id: number) {
    return (await api.get(`/user/${id}`)).data
}