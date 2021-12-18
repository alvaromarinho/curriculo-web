import { Information } from "../models/Information";
import { api } from "./API";

export async function getInformations() {
    return (await api.get('/informations'))?.data
}

export async function createInformation(info: Information) {
    return (await api.post('/informations', info))?.data
}

export async function updateInformation(info: Information) {
    return (await api.put(`/informations/${info.id}`, info))?.data
}

export async function deleteInformation(id: number) {
    return (await api.delete(`/informations/${id}`))?.data
}