import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Curriculo } from '../models/User'
import { getAllUserData } from '../services/UserService'

const Home: NextPage = () => {

    const [curriculo, setCurriculo] = useState<Curriculo>()

    useEffect(() => {
        getAllUserData(1).then((res: Curriculo) => setCurriculo(res))
    }, [])

    useEffect(() => {
        curriculo && console.log(curriculo)
    }, [curriculo])

    return (
        <>
            <Menu id="menu">
                <a href="#start">Start</a>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#education">Education</a>
                <a href="#experience">Experience</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </Menu>
            <main data-bs-spy="scroll" data-bs-target="#menu" data-bs-offset="0" tabIndex={0}>
                <section className="vh-100 bg-light" id="start">
                    <div className="container">
                        Inicio
                    </div>
                </section>
                <section className="vh-100 bg-primary" id="about">
                    <div className="container">
                        Sobre
                    </div>
                </section>
                <section className="vh-100 bg-success" id="skills">
                    <div className="container">
                        Skills
                    </div>
                </section>
                <section className="vh-100 bg-warning" id="education">
                    <div className="container">
                        Educação
                    </div>
                </section>
                <section className="vh-100 bg-secondary" id="experience">
                    <div className="container">
                        Experiencias
                    </div>
                </section>
                <section className="vh-100 bg-danger" id="portfolio">
                    <div className="container">
                        Portfólio
                    </div>
                </section>
                <section className="vh-100 bg-info" id="contact">
                    <div className="container">
                        Contato
                    </div>
                </section>
            </main>
        </>
    )
}

const Menu = styled.div` 
    position: fixed;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    
    a {
        display: block;
        padding: .5rem;
        text-decoration: none;
        color: var(--bs-grey);
    }
    a:hover {
        text-decoration: underline
    } 
`;

export default Home
