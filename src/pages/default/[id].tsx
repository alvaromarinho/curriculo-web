import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllUserData } from '../../services/UserService';
import { User } from '../../models/User';
import { CgSpinner } from 'react-icons/cg';
import styled from 'styled-components';

function Sidebar({ imageUrl }: any) {
    return (
        <Menu className="navbar-nav my-auto">
            {imageUrl &&
                <li className="nav-item pb-4 px-5">
                    <img className="img-cover rounded-circle" height="150" width="150"
                        src={`${process.env.API_URL}/image?path=${imageUrl}`} alt="Profile" />
                </li>
            }
            <li className="nav-item py-1">
                <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item py-1">
                <a className="nav-link" href="#experience">Experience</a>
            </li>
            <li className="nav-item py-1">
                <a className="nav-link" href="#portfolio">Portfolio</a>
            </li>
        </Menu>
    )
}

const Menu = styled.ul`
    text-align: center;

    li a {
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
    }
    li a:hover {
        color: white!important;
    }
    li img {
        max-width: 10rem;
        max-height: 10rem;
        border: 0.5rem solid rgba(255, 255, 255, 0.2);
    }

`;

const Default = () => {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        import("bootstrap").then(({ Collapse }) => [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((el) => new Collapse(el)));

        id && getAllUserData(id)
            .then((res) => setUser(res))
    }, [router.isReady])

    return (
        <>
            <Head>
                <title>Template Padrão</title>
            </Head>
            <>
                {!user ?
                    <div className="text-center py-5">
                        <CgSpinner className="fa-spin me-2 fa-3x" />
                    </div>
                    :
                    <div className="row overflow-hidden g-0 h-100">
                        <div className="d-none d-md-flex col-auto bg-primary">
                            <Sidebar imageUrl={user.image} id="sidebar" />
                        </div>
                        <div className="col overflow-auto h-100 mt-5 mt-md-0">

                            {/* MOBILE */}
                            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top d-md-none">
                                <div className="container-fluid px-3">
                                    <span className="navbar-brand">Dashboard</span>
                                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMobile">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarMobile">
                                        <Sidebar />
                                    </div>
                                </div>
                            </nav>

                            <section className="vh-100 border mt-2 mt-md-0 p-3" id="about">
                                {user.name}
                            </section>
                            <section className="vh-100 border p-3" id="portfolio">
                                Portfolio
                            </section>
                        </div>
                    </div>
                }
            </>
        </>
    )
}

Default.noAuth = true;

export default Default
