import { Portfolio } from "../models/User";
import { api } from "./API";

export async function getPortfolios() {
    return (await api.get('/portfolios'))?.data
}

export async function createPortfolio(portfolio: Portfolio) {
    return (await api.post('/portfolios', portfolio))?.data
}

export async function updatePortfolio(portfolio: Portfolio) {
    return (await api.put(`/portfolios/${portfolio.id}`, portfolio))?.data
}

export async function deletePortfolio(id: number) {
    return (await api.delete(`/portfolios/${id}`))?.data
}