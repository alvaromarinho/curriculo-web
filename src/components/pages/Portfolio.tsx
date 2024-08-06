import { useEffect, useState } from 'react';
import { ProjectImage } from '../../models/Portfolio';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Carousel from '../Carousel';
import styled from "styled-components";

interface PortfolioProps { portfolios: any }

export default function Portfolio({ portfolios }: PortfolioProps) {

    const [modal, setModal] = useState<any>();
    const [projects, setProjects] = useState<any[]>();
    const [currentImages, setCurrentImages] = useState<ProjectImage[]>();
 
    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && setModal(new Modal(modalHTML))
        });

        const port: any[] = []
        portfolios.map((portfolio: any) => {
            portfolio.projects.map((project: any) => {
                project.type = portfolio.name
                port.push(project)
            })
        })

        setProjects(port)
    }, [])

    function openModal(images: ProjectImage[]) {
        setCurrentImages(images)
        modal.show()
    }

    function scroll(direction: 'left' | 'right') {
        const galery = document.getElementById("galery");
        let scrollAmount = 0;

        const step = 10;
        const distance = 400;
        const speed = 10;

        const slideTimer = setInterval(() => {
            if(galery && direction == 'left')
                galery.scrollLeft -= step;
            if(galery && direction == 'right')
                galery.scrollLeft += step;

            scrollAmount += step;
            if(scrollAmount >= distance)
                window.clearInterval(slideTimer);
        }, speed);
    }

    return (
        <Section>
            <h2 className="title-page mb-4">Recent Projects</h2>

            <div className="d-flex align-items-center position-relative">
                <div className="d-none d-md-inline galery-control start-n2" onClick={() => scroll('left')}>
                    <FaAngleLeft className="fa-2x" />
                </div>
                <Galery id="galery">
                    {projects?.map((project: any, index: number) =>
                        <li key={index} onClick={() => openModal(project.images!)}>
                            <img src={`${process.env.API_URL}/image?path=${project.images[0].url}`} alt={project.title} />
                            <div className="caption">
                                <h3 className="fs-5 mb-0">{project.type}</h3>
                                <span>{project.subtitle}</span>
                            </div>
                            <div className="bg"></div>
                        </li>
                    )}
                </Galery>
                <div className="d-none d-md-inline galery-control end-n2" onClick={() => scroll('right')}>
                    <FaAngleRight className="fa-2x" />
                </div>
            </div>

            {/* MODAL */}
            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
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
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 8rem;

    .galery-control { position: absolute; color: var(--bs-light); background-color: black; border-radius: 50%; padding: .5rem; cursor: pointer; z-index: 1; transition: all 0.3s ease-out; opacity: .25; }
    .galery-control:hover { opacity: .75; }

    @media (max-width: 768px) {
        padding-left: .5rem;
        padding-right: .5rem;
        margin-top: 6rem;
    }
`
const Galery = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;

    li {
        position: relative;
        cursor: pointer;
    }

    li:not(:first-child) {
        margin-left: 2rem;
    }

    img {
        width: 200px;
        height: 300px;
        border-radius: 0.3rem;
        object-fit: cover;
        object-position: center;
    }

    .caption, .bg {
        position: absolute;
        width: 100%;
        bottom: -100%;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        transition: bottom 0.3s ease-out;
        opacity: 0;
    }

    .caption {
        padding: .5rem 0;
        color: white;
        text-align: center;
        z-index: 1;
    }
    
    .bg {
        top: 50%;
        background: linear-gradient(0deg, #333 0%, transparent 100%);
        z-index: 0;
    }

    li:hover .caption, li:hover .bg {
        bottom: 0;
        opacity: 1;
    }
`
