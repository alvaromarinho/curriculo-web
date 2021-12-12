import { Information } from "../models/User";
import { api } from "./API";

export async function getInformations() {
    return (await api.get('/informations'))?.data
}

export async function createInformations(info: Information) {
    return (await api.post('/informations', info))?.data
}

export async function updateInformations(info: Information) {
    return (await api.put(`/informations/${info.id}`, info))?.data
}