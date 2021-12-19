import { useEffect, useState } from "react";
import { FaAngleLeft, FaLink, FaPlus, FaRegEdit, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { toast } from "react-toastify";
import { Project, ProjectImage } from "../../../models/Portfolio";
import { createProject, deleteProject, updateProject } from "../../../services/PortfolioService";
import { removeHTML, titleCase } from "../../../utils/StringUtils";
import Button from "../../Button";

interface ProjectProps { portforioId: number, projects: Project[], loadPortfolios: Function, showForm: Function }

export default function Projects({ portforioId, projects, loadPortfolios, showForm }: ProjectProps) {

    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [currentImages, setCurrentImages] = useState<ProjectImage[] | null>(null);

    const [files, setFiles] = useState<FileList>();
    const [filesToShow, setFilesToShow] = useState<string[]>();

    useEffect(() => showForm(!!currentProject), [currentProject])

    useEffect(() => setSearchTerm(''), [projects])

    useEffect(() => {
        if (!files) return

        const images = Array.from(files).map((file) => URL.createObjectURL(file))
        setFilesToShow(images)

        // free memory when ever this component is unmounted
        return () => {
            images.map((img) => URL.revokeObjectURL(img))
        }
    }, [files])

    useEffect(() => {
        if (searchTerm) {
            setFilteredProjects(projects.filter((project) =>
                (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (project.subtitle && project.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
            ))
        } else {
            setFilteredProjects(projects)
        }
    }, [searchTerm])

    function handleChangeFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setFiles(undefined)
            return
        }

        setFiles(e.target.files)
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setCurrentProject((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        if (currentProject && currentProject.id)
            updateProject(portforioId, currentProject, files)
                .then(() => onSuccess('atualizados'))
                .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
                .finally(() => setLoadingSave(false))
        else if (currentProject)
            createProject(portforioId, currentProject, files)
                .then(() => onSuccess('criados'))
                .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
                .finally(() => setLoadingSave(false))
    }

    function removeProject() {
        setLoadingDelete(true)
        const closeModal = document.getElementById('close-modal');
        if (currentProject && currentProject.id)
            deleteProject(portforioId, currentProject.id).then(() => {
                closeModal?.click()
                onSuccess('apagados')
            })
            .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
            .finally(() => setLoadingSave(false))
    }

    function onSuccess(text: string) {
        loadPortfolios()
        toast.success(`Dados ${text} com sucesso!`)
    }

    return (
        <>
            {!currentProject &&
                <>
                    <div className="row g-3 justify-content-between align-items-center mb-3">
                        <div className="col">
                            <input type="text" name="search" id="search" className="form-control" autoComplete="off" placeholder="Digite o nome do projeto..."
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary d-flex-center" type="button" onClick={() => setCurrentProject({})}>
                                <FaPlus className="me-2" />
                                <span className="d-none d-md-inline">Novo Projeto</span>
                            </button>
                        </div>
                    </div>

                    {!filteredProjects.length &&
                        <div className="card card-body text-center text-muted">Nenhuma projeto encontrado</div>
                    }

                    {/* LISTA */}
                    {!!filteredProjects.length && filteredProjects.map((project) =>
                        <div className="card card-body callout mb-3" key={project.id}>
                            <div className="d-flex justify-content-between align-items-start">
                                <h3 className="fs-5 mb-0">{titleCase(project.title)}</h3>
                                <button className="btn btn-sm btn-outline-primary border-0 d-flex-center" onClick={() => setCurrentProject(project)}>
                                    <FaRegEdit className="mb-1 me-1" /> Editar
                                </button>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-muted mb-0">{titleCase(project.subtitle)}</p>
                                    {project.url && 
                                        <a className="d-flex align-items-center" href={project.url} target="_blank">
                                            <FaLink className="me-2" /> {project.url}
                                        </a>
                                    }
                                </div>
                                {!!(project.images && project.images.length) &&
                                    <IoMdImages className="fa-3x text-success me-2 pointer" onClick={() => setCurrentImages(project.images!)}
                                        data-bs-toggle="modal" data-bs-target="#modalImage" />
                                }
                            </div>
                            {project.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: project.description }} />}
                        </div>
                    )}
                </>
            }

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
                            <div className="col-12 mb-3">
                                <label htmlFor="description">Descrição</label>
                                <textarea className="form-control" id="description" name="description" rows={8}
                                    defaultValue={currentProject.description || undefined} onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <label htmlFor="images" className="form-label">Imagens</label>
                                <input className="form-control" type="file" id="images" name="images" onChange={handleChangeFile} multiple />
                            </div>

                            {/* IMAGENS */}
                            <div className="col-12 mt-3">
                                {filesToShow && filesToShow.map((image, index) =>
                                    <img className="img-cover me-2" height="100" width="100" src={image} key={index} />
                                )}
                                {!filesToShow && currentProject.images && currentProject.images.map((image) =>
                                    <img className="img-cover me-2" height="100" width="100" src={`${process.env.API_URL}/assets/img${image.url}`} key={image.id} />
                                )}
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
                </>
            }

            {/* MODAL IMAGE */}
            <div className="modal fade" id="modalImage" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {currentImages && currentImages.length == 1 &&
                                <img className="img-cover w-100" src={`${process.env.API_URL}/assets/img${currentImages[0].url}`} />
                            }
                            {currentImages && currentImages.length > 1 &&
                                <div id="carouselControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {currentImages.map((image, index) =>
                                            <div className={`carousel-item ${index == 0 && 'active'}`} key={image.id}>
                                                <img className="d-block w-100" src={`${process.env.API_URL}/assets/img${image.url}`} />
                                            </div>
                                        )}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

