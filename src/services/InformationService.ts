import { api } from "./API";

export async function getInformations() {
    return (await api.get('/informations'))?.data
}
