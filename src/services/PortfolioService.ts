import { Portfolio, Project } from "../models/User";
import { buildFormData } from "../utils/FormUtils";
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

// PROJECT

export async function createProject(portfolioId: number, project: Project, files?: FileList) {
    const formData = new FormData();
    buildFormData(formData, project);
    if (files)
        Array.from(files).map((file, index) => formData.append(`images[${index}]`, file))
    return (await api.post(`/portfolios/${portfolioId}/projects`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data
}

export async function updateProject(portfolioId: number, project: Project, files?: FileList) {
    const formData = new FormData();
    buildFormData(formData, project);
    if (files)
        Array.from(files).map((file, index) => formData.append(`images[${index}]`, file))
    return (await api.put(`/portfolios/${portfolioId}/projects/${project.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data
}

export async function deleteProject(portfolioId: number, projectId: number) {
    return (await api.delete(`/portfolios/${portfolioId}/projects/${projectId}`))?.data
}
