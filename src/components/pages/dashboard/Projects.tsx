import { useEffect, useState } from "react";
import { FaAngleLeft, FaLink, FaPlus, FaRegEdit, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Project } from "../../../models/User";
import { createProject, deleteProject, updateProject } from "../../../services/PortfolioService";
import { titleCase } from "../../../utils/StringUtils";
import Button from "../../Button";

interface ProjectProps { portforioId: number, projects: Project[], loadPortfolios: Function, showForm: Function }

export default function Projects({ portforioId, projects, loadPortfolios, showForm }: ProjectProps) {

    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    useEffect(() => showForm(!!currentProject), [currentProject])

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        if (currentProject && currentProject.id)
            updateProject(portforioId, currentProject)
                .then(() => onSuccess('atualizados'))
                .finally(() => setLoadingSave(false))
        else if (currentProject)
            createProject(portforioId, currentProject)
                .then(() => onSuccess('criados'))
                .finally(() => setLoadingSave(false))
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setCurrentProject((prev) => ({ ...prev, [name]: value }))
    }

    function removeProject() {
        setLoadingDelete(true)
        const closeModal = document.getElementById('close-modal');
        if (currentProject && currentProject.id)
            deleteProject(portforioId, currentProject.id).then(() => {
                closeModal?.click()
                onSuccess('apagados')
            }).finally(() => setLoadingSave(false))
    }

    function onSuccess(text: string) {
        loadPortfolios()
        toast.success(`Dados ${text} com sucesso!`)
    }

    return (
        <>
            {!currentProject &&
                <div className="row g-3 justify-content-between align-items-center mb-3">
                    <div className="col">
                        <input type="text" name="search" id="search" className="form-control" autoComplete="off" placeholder="Digite o nome do projeto..." />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary d-flex-center" type="button" onClick={() => setCurrentProject({})}>
                            <FaPlus className="me-2" />
                            <span className="d-none d-md-inline">Novo Projeto</span>
                        </button>
                    </div>
                </div>
            }

            {!currentProject && !projects.length &&
                <div className="card card-body text-center text-muted">Não há projetos cadastrados para esse portfólio</div>
            }

            {/* LISTA */}
            {!currentProject && !!projects.length && projects.map((project) =>
                <div className="card card-body callout mb-3" key={project.id}>
                    <div className="d-flex justify-content-between align-items-start">
                        <h3 className="fs-5 mb-0">{titleCase(project.title)}</h3>
                        <button className="btn btn-sm btn-outline-primary border-0 d-flex-center" onClick={() => setCurrentProject(project)}>
                            <FaRegEdit className="mb-1 me-1" /> Editar
                        </button>
                    </div>
                    <p className="text-muted mb-0">{titleCase(project.subtitle)}</p>
                    <a className="d-flex align-items-center" href={project.url} target="_blank">
                        <FaLink className="me-2" /> {project.url}
                    </a>
                    {project.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: project.description }} />}
                </div>
            )}

            {/* NOVO - EDITAR */}
            {currentProject &&
                <>
                    <h2 className="me-2">{currentProject.id ? 'Editar' : 'Adicionar'} Projeto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="title">Título</label>
                                <input type="text" className="form-control" id="title" name="title"
                                    value={currentProject.title} onChange={handleChange} required />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="subtitle">Subtítulo</label>
                                <input type="text" className="form-control" id="subtitle" name="subtitle"
                                    value={currentProject.subtitle || undefined} onChange={handleChange} />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="url">URL</label>
                                <input type="text" className="form-control" id="url" name="url"
                                    value={currentProject.url || undefined} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="description">Descrição</label>
                                <textarea className="form-control" id="description" name="description" rows={8}
                                    defaultValue={currentProject.description || undefined} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <hr className="text-muted" />
                        <div className="row">
                            {currentProject.id &&
                                <div className="col-12 col-md-auto order-2 order-md-1">
                                    <button className="btn btn-danger d-flex-center px-5 w-100" type="button" data-bs-toggle="modal" data-bs-target="#modalDelete">
                                        <FaRegTrashAlt className="me-1" /> Apagar
                                    </button>
                                </div>
                            }
                            <div className="col-12 col-md-auto order-2 order-md-1 ms-auto">
                                <button className="btn btn-warning d-flex-center px-5 w-100" type="button" onClick={() => setCurrentProject(null)}>
                                    <FaAngleLeft className="me-1" /> Voltar
                                </button>
                            </div>
                            <div className="col-12 col-md-auto order-1 order-md-2">
                                <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-5 w-100">
                                    <FaRegSave className="me-2" />
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* MODAL DELETE */}
                    <div className="modal fade" id="modalDelete" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                        <div className="modal-dialog">
                            {currentProject &&
                                <div className="modal-content">
                                    <div className="modal-header bg-danger text-white">
                                        <h5 className="modal-title" id="modal">Deseja apagar esse projeto?</h5>
                                        <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <h3 className="fs-5 mb-0">{titleCase(currentProject.title)}</h3>
                                        <span className="text-muted">{titleCase(currentProject.subtitle)}</span>
                                    </div>
                                    <div className="modal-footer">
                                        <Button color="danger" text="Apagar" loading={loadingDelete} type="button" onClick={removeProject}>
                                            <FaRegTrashAlt className="me-2" />
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* MODAL IMAGE */}
                    <div className="modal fade" id="modalImage" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                        <div className="modal-dialog">
                            {currentProject &&
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                                        image
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

