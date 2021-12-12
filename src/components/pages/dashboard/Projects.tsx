import { useState } from "react";
import { FaLink, FaPlus, FaRegEdit } from "react-icons/fa";
import { Project } from "../../../models/User";
import { titleCase } from "../../../utils/StringUtils";

interface ProjectProps { projects: Project[] }

export default function Projects({ projects }: ProjectProps) {

    const [currentProject, setCurrentProject] = useState<Project | null>(null);

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

            {!projects.length && <div className="card card-body text-center text-muted">Não há projetos cadastrados para esse portfólio</div>}

            {!!projects.length && projects.map((project) =>
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
        </>
    )
}

