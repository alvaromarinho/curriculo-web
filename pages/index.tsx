import { useEffect, useState } from 'react'
import { Curriculo, Information, Portfolio } from '../models/User'
import { getAllUserData } from '../services/UserService'
import styled from 'styled-components'
import _ from "lodash";
import { Tab } from 'bootstrap';

interface IndexProps { user: Curriculo }

export default function Home({ user }: IndexProps) {

    const [currentPortfolio, setCurrentPortfolio] = useState<number>();
    const [menu, setMenu] = useState<Array<string>>();
    const [info, setInfo] = useState<Array<Array<Information>>>();

    useEffect(() => {
        setMenu(_.chain(user.informations).groupBy('type').map((value, key) => key).value())
        setInfo(_.chain(user.informations).groupBy('type').map((value, key) => value).value())
    }, [])

    return (
        <>
            <Menu id="menu">
                <a href="#start">Start</a>
                <a href="#about">About</a>
                {menu && menu.map((m) => (
                    <a href={`#${m}`}>{m}</a>
                ))}
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </Menu>
            <main>
                <section className="vh-100 bg-light" id="start">
                    <div className="container">
                        <img src={user.image} alt="Perfil" />
                        <div>{user.name}</div>
                        {user.socialNetworks && user.socialNetworks.map((social, index) => (
                            <div key={index}>
                                <i className={`fa ${social.icon}`}></i> {social.name}
                            </div>
                        ))}
                    </div>
                </section>
                <section className="vh-100 bg-primary" id="about">
                    <div className="container">
                        <div>
                            {user.city} - {user.uf}
                        </div>
                        <div>
                            {user.email}
                        </div>
                        <div>
                            {user.description}
                        </div>
                        {user.phones && user.phones.map((phone, index) => (
                            <div key={index}>{phone.number}</div>
                        ))}
                    </div>
                </section>
                {info && info.map((value) =>
                    value.map((i, index) => (
                        <section className="vh-100 border" id={i.type} key={index}>
                            <div className="container">
                                {i.title}
                                {i.description && <div dangerouslySetInnerHTML={{ __html: i.description }} />}
                            </div>
                        </section>
                    ))
                )}
                <section className="vh-100 bg-danger" id="portfolio">
                    <div className="container">
                        <ul className="nav nav-tabs" role="tablist">
                            {user.portfolios && user.portfolios.map((portfolio, index) => (
                                <li className="nav-item" role="presentation" key={index}>
                                    <button type="button" role="tab" onClick={() => setCurrentPortfolio(portfolio.id)}
                                        className={`nav-link ${((currentPortfolio == undefined && index == 1) || currentPortfolio == portfolio.id) && 'active'}`}>
                                        {portfolio.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content">
                            {user.portfolios && user.portfolios.map((portfolio, index) => (
                                <div className={`tab-pane fade ${((currentPortfolio == undefined && index == 1) || currentPortfolio == portfolio.id) && 'show active'}`}>
                                    {portfolio.projects && portfolio.projects.map((project) => (
                                        <b>{project.title}</b>
                                    ))}
                                </div>
                            ))}
                        </div>
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

    a {
        display: block;
        padding: .5rem;
        text-decoration: none;
        color: var(--bs-grey);
        box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    }
    a:hover {
        text-decoration: underline
    } 
`;

export async function getStaticProps(ctx: any) {
    const user = await getAllUserData(ctx, 1);
    return {
        props: { user },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}