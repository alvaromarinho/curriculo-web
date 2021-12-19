import { useEffect, useState } from 'react'
import { NextPageContext } from 'next';
import { User } from '../models/User'
import { getAllUserData } from '../services/UserService'
import Start from '../components/pages/Start';
import About from '../components/pages/About';
import Skills from '../components/pages/Skills';
import Education from '../components/pages/Education';
import Experience from '../components/pages/Experience';
import Portfolio from '../components/pages/Portfolio';
import Contact from '../components/pages/Contact';
import styled from 'styled-components';
import _ from "lodash";

interface IndexProps { user: User }

const Home = ({ user }: IndexProps) => {

    const [info, setInfo] = useState<any>();

    useEffect(() => {
        import("bootstrap").then(({ Tooltip }) => [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((el) => new Tooltip(el)));
        setInfo(_.chain(user.informations).groupBy('type').value())
    }, [])

    return (
        <>
            <Menu id="menu" className="d-none d-md-block">
                <a href="#start">
                    <i className="fa fa-home"></i>
                    <span>Start</span>
                </a>
                <a href="#about">
                    <i className="fa fa-user"></i>
                    <span>About</span>
                </a>
                <a href="#skills">
                    <i className="fa fa-check-square-o"></i>
                    <span>Skills</span>
                </a>
                <a href="#education">
                    <i className="fa fa-book"></i>
                    <span>Education</span>
                </a>
                <a href="#experience">
                    <i className="fa fa-briefcase"></i>
                    <span>Experience</span>
                </a>
                <a href="#portfolio">
                    <i className="fa fa-th-large"></i>
                    <span>Portfolio</span>
                </a>
                <a href="#contact">
                    <i className="fa fa-envelope"></i>
                    <span>Contact</span>
                </a>
            </Menu>
            <main>
                <Start user={user} />
                <About user={user} />
                {info && info.SKILLS && <Skills informations={info.SKILLS} />}
                {info && info.EDUCATION && <Education informations={info.EDUCATION} />}
                {info && info.EXPERIENCE && <Experience informations={info.EXPERIENCE} />}
                <Portfolio user={user} />
                <Contact />
            </main>
        </>
    )
}

Home.noAuth = true;

export default Home;

export async function getStaticProps(ctx: NextPageContext) {
    const user = await getAllUserData(ctx, 1);
    return {
        props: { user },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}

export const Menu = styled.div`
    position: fixed;
    top: 50%;
    padding: 0;
    transform: translateY(-50%);
    z-index: 1;

    a {
        display: flex;
        align-items: center;
        text-transform: lowercase;
        background-color: var(--bs-gray-300);
        color: #45505b;
        width: 3.7rem;
        white-space: nowrap;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        border-top-right-radius: 50rem;
        border-bottom-right-radius: 50rem;
        transition: .3s ease .1s;
    }
    
    a:hover {
        background-color: var(--bs-primary);
        color: white !important;
        transition: .1s;
    }

    a i {
        font-size: 1.2rem;
        margin-right: 1rem;
        z-index: 1;
    }

    a span {
        background-color: var(--bs-primary);
        color: var(--bs-primary);
        padding: .7rem 1rem .8rem 2rem;
        border-top-right-radius: 50rem;
        border-bottom-right-radius: 50rem;
        margin-left: -2.5rem;
        transform: translateX(-150%);
        transition: transform .2s;
    }
    
    a:hover span {
        transform: translateX(0%);
        color: white !important;
        transition: color .5s ease .3s, transform .3s;
    }

    a span:first-letter {
        text-transform: capitalize;
    }

`;