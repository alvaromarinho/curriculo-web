import { useEffect, useState } from 'react';
import { User } from '../../models/User'
import { ProjectImage } from '../../models/Portfolio';
import { FiExternalLink } from 'react-icons/fi';
import Carousel from '../Carousel';
import styled from "styled-components";

interface PortfolioProps { user: User }

export default function Portfolio({ user }: PortfolioProps) {

    const [modal, setModal] = useState<any>();
    const [currentPortfolio, setCurrentPortfolio] = useState<number>();
    const [currentImages, setCurrentImages] = useState<ProjectImage[]>();

    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && setModal(new Modal(modalHTML))
        });

        user && user.portfolios && user.portfolios.map((port) => {
            port.projects && port.projects.sort((a, b) => {
                return a.subtitle!.localeCompare(b.subtitle!) || a.title!.localeCompare(b.title!);
            });
        })
    }, [])

    function openModal(images: ProjectImage[]) {
        setCurrentImages(images)
        modal.show()
    }

    return (
        <Section className="vh-100 d-flex" id="portfolio">
            <div className="container px-6 pt-6">
                <h2 className="title-page mb-5" data-shadow="Portfolio">Portfolio</h2>
                <ul className="nav nav-tabs justify-content-center" role="tablist">
                    {user.portfolios && user.portfolios.map((portfolio, index) => (
                        <li className="nav-item" role="presentation" key={index}>
                            <button type="button" role="tab" onClick={() => setCurrentPortfolio(portfolio.id)}
                                className={`nav-link text-uppercase ${((currentPortfolio == undefined && index == 0) || currentPortfolio == portfolio.id) && 'active'}`}>
                                {portfolio.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content mt-3">
                    {user.portfolios && user.portfolios.map((portfolio, index) => (
                        <div className={`tab-pane fade ${((currentPortfolio == undefined && index == 0) || currentPortfolio == portfolio.id) && 'show active'}`} key={index}>
                            <div className="row">
                                {portfolio.projects && portfolio.projects.map((project) => (
                                    <div className="col-12 col-md-4 mb-3" key={project.id}>
                                        <div className={`card shadow border-0 h-100`}>
                                            {!!(project.images && project.images.length) &&
                                                <img className="card-img-top img-hover img-cover img-cover-top pointer" height="120"
                                                    src={`${process.env.API_URL}/assets/img${project.images[0].url}`} onClick={() => openModal(project.images!)} />
                                            }
                                            <div className="card-body">
                                                <div className="fw-bold text-uppercase mb-0">
                                                    {project.url ?
                                                        <a className="d-flex align-items-center" href={project.url} target="_blank">
                                                            {project.title}
                                                            <FiExternalLink className="mb-1 ms-2" />
                                                        </a>
                                                        : project.title}
                                                </div>
                                                <p className="text-muted">{project.subtitle}</p>
                                                {project.description && <div dangerouslySetInnerHTML={{ __html: project.description }} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <button type="button" className="btn-close" id="close-modal"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-body p-0">
                            {currentImages && <Carousel images={currentImages} />}
                        </div>
                    </div>
                </div>
            </div>
        </Section>


    )
}

const Section = styled.section`
    ul.nav { margin-bottom: 3rem; }
    ul.nav, .nav-link, .nav-link:hover, .nav-link:focus { border: none; }
    ul.nav li + li:before { content: "|"; }
    ul.nav .nav-item { display: flex; align-items: center; color: #ccc; }
    ul.nav .nav-link.active { text-shadow: 1px 0 0 currentColor; }

    &.vh-100 { min-height: 100vh; height: auto!important; padding-bottom: 5rem }

    @media (max-width: 768px) {
        ul.nav li + li:before { content: ""; }
    }
`