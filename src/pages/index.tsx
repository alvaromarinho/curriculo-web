import { useEffect, useState } from 'react'
import { Curriculo } from '../models/User'
import { getAllUserData } from '../services/UserService'
import { Menu } from '../styles/menu';
import Start from '../components/Start';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import _ from "lodash";
import { NextPageContext } from 'next';

interface IndexProps { user: Curriculo }

const Home = ({ user }: IndexProps) => {

    const [info, setInfo] = useState<any>();

    useEffect(() => {
        setInfo(_.chain(user.informations).groupBy('type').value())
    }, [])

    // useEffect(() => {
    //     info && console.log(info)
    // }, [info])

    return (
        <>
            <Menu id="menu">
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