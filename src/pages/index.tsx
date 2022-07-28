import { useEffect, useState } from 'react'
import { NextPageContext } from 'next';
import { User } from '../models/User'
import { getAllUserDataSSR } from '../services/UserService'
import styled from 'styled-components';
import Head from 'next/head';
import Start from '../components/pages/Start';
import Portfolio from '../components/pages/Portfolio';
import Career from '../components/pages/Career';
import Skills from '../components/pages/Skills';
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
                <nav className="navbar navbar-light fixed-top">
                    <div className="container-fluid py-3 px-5">
                        <a className="navbar-brand" href="#">
                            <img src="/symbol.svg" alt="Brand" height="40" />
                        </a>
                    </div>
                </nav>
                <Start user={user} />
                <Portfolio user={user} />
                {info && info.EXPERIENCE && <Career informations={info.EXPERIENCE} />} 
                {info && info.SKILLS && <Skills informations={info.SKILLS} />}
                <Contact />
                <footer className="text-center fs-7 py-4">Design and Development by Alvaro Marinho</footer>
            </main>
        </>
    )
}

const Section = styled.section`
    @media (max-width: 768px) {
        .display-6 { font-size: calc(1.375rem + 0.5vw); }
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

