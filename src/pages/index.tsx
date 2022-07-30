import { useEffect, useState } from 'react'
import { NextPageContext } from 'next';
import { User } from '../models/User'
import { getAllUserDataSSR } from '../services/UserService'
import styled from 'styled-components';
import Head from 'next/head';
import Start from '../components/pages/Start';
import Portfolio from '../components/pages/Portfolio';
import Career from '../components/pages/Career';
import Contact from '../components/pages/Contact';
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
            <Head>
                <title>Alvaro Marinho</title>
            </Head>

            <main>
                <Navbar className="navbar navbar-light fixed-top">
                    <div className="container-fluid py-3 px-md-5">
                        <a className="navbar-brand" href="#">
                            <img src="/symbol_b.svg" alt="Brand" height="40" />
                        </a>
                    </div>
                </Navbar>
                <div className="container">
                    <Start user={user} />
                    <Portfolio user={user} />
                    {info && info.EXPERIENCE && <Career informations={info} />}
                    <Contact />
                    <Footer>
                        <div className="d-flex align-items-end justify-content-between">
                            <span className='fs-7 opacity-50'>DESIGNED AND DEVELOPED BY ME!</span>
                            <img className="d-none d-md-inline" src="/logo_b.svg" alt="Álvaro Marinho" height="30" />
                            <img className="d-md-none" src="/symbol_b.svg" alt="Álvaro Marinho" height="30" />
                        </div>
                    </Footer>
                </div>
            </main>
        </>
    )
}

const Navbar = styled.nav`
    @media (max-width: 768px) {
        &.fixed-top { position: relative!important; padding: .5rem }
    }
`

const Footer = styled.footer`
    padding: 1.5rem 4rem;

    @media (max-width: 768px) {
        padding: 1.5rem .5rem;
        span { text-transform: lowercase;  }
    }
`

Home.noAuth = true;

export default Home;

export async function getStaticProps(ctx: NextPageContext) {
    const user = await getAllUserDataSSR(ctx, 1);
    return {
        props: { user },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}

