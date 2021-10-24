import { useEffect, useState } from 'react'
import { Curriculo, Information } from '../models/User'
import { getAllUserData } from '../services/UserService'
import { Menu } from '../styles/menu';
import Start from '../components/Start';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import _ from "lodash";

interface IndexProps { user: Curriculo }

export default function Home({ user }: IndexProps) {

    const [menu, setMenu] = useState<Array<string>>();
    const [info, setInfo] = useState<Array<Array<Information>>>();

    const iconDictionary: any = {
        EDUCATION: 'fa-book',
        SKILLS: 'fa-check-square-o',
    }

    useEffect(() => {
        setMenu(_.chain(user.informations).groupBy('type').map((value, key) => key).value())
        setInfo(_.chain(user.informations).groupBy('type').map((value, key) => value).value())
    }, [])

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
                {menu && menu.map((m, index) => (
                    <a href={`#${m}`} key={index}>
                        <i className={`fa ${iconDictionary[m]}`}></i>
                        <span>{m}</span>
                    </a>
                ))}
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
                <section className="vh-100 d-flex align-items-center bg-light" id="start">
                    <Start user={user} />
                </section>
                <section className="vh-100 d-flex align-items-center" id="about">
                    <About user={user} />
                </section>
                {info && info.map((value) =>
                    value.map((i, index) => (
                        <section className="vh-100 d-flex align-items-center border" id={i.type} key={index}>
                            <div className="container px-6">
                                {i.title}
                                {i.description && <div dangerouslySetInnerHTML={{ __html: i.description }} />}
                            </div>
                        </section>
                    ))
                )}
                <section className="vh-100 d-flex bg-danger" id="portfolio">
                    <Portfolio user={user} />
                </section>
                <section className="vh-100 d-flex align-items-center bg-info" id="contact">
                    <Contact />
                </section>
            </main>
        </>
    )
}



export async function getStaticProps(ctx: any) {
    const user = await getAllUserData(ctx, 1);
    return {
        props: { user },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}