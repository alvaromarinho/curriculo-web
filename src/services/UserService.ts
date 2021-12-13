import { buildFormData } from "../utils/FormUtils";
import { api, apiCtx } from "./API";

export async function authenticate(data: object) {
    return (await api.post('/auth', data))?.data
}

export async function getUser() {
    return (await api.get('/user'))?.data
}

export async function updateUser(obj: any, file?: any) {
    const formData = new FormData();
    buildFormData(formData, obj);
    file && formData.append("image", file);
    return (await api.put('/user', formData, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data
}

export async function getAllUserData(ctx: any, id: number) {
    return (await apiCtx(ctx).get(`/user/${id}`))?.data
}
