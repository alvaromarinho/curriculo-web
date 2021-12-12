import { Portfolio } from "../models/User";
import { api } from "./API";

export async function getPorfolios() {
    return (await api.get('/portfolios'))?.data
}

export async function createPorfolio(portfolio: Portfolio) {
    return (await api.post('/portfolios', portfolio))?.data
}

export async function updatePorfolio(portfolio: Portfolio) {
    return (await api.put(`/portfolios/${portfolio.id}`, portfolio))?.data
}

export async function deletePorfolio(id: number) {
    return (await api.delete(`/portfolios/${id}`))?.data
}