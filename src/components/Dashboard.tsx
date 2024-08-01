import { CgLogOff } from "react-icons/cg";
import { RiFileUserLine, RiGitRepositoryLine, RiUser3Line } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Link from 'next/link'
import styled from "styled-components";

function Sidebar({ className }: any) {

    const router = useRouter()
    const { signOut } = useContext(AuthContext)

    return (
        <Menu className={`list-group list-group-flush ${className}`}>
            <div className="list-group-item d-flex align-items-center">
                <img src="/logo_b.svg" height="30" className="mx-auto" />
            </div>
            <Link href="/dashboard" passHref>
                <a className={`list-group-item list-group-item-action d-flex align-items-center ${router.pathname == "/dashboard" && "active"}`}>
                    <RiUser3Line className="fa-fw ms-2 me-3" /> <span className="lh-1">Perfil</span>
                </a>
            </Link>
            <Link href="/dashboard/informations" passHref>
                <a className={`list-group-item list-group-item-action d-flex align-items-center ${router.pathname == "/dashboard/informations" && "active"}`}>
                    <RiFileUserLine className="fa-fw ms-2 me-3" /> <span className="lh-1">Informações</span>
                </a>
            </Link>
            <Link href="/dashboard/portfolios" passHref>
                <a className={`list-group-item list-group-item-action d-flex align-items-center ${router.pathname == "/dashboard/portfolios" && "active"}`}>
                    <RiGitRepositoryLine className="fa-fw ms-2 me-3" /> <span className="lh-1">Portfólios</span>
                </a>
            </Link>
            <a className="list-group-item list-group-item-action d-flex align-items-center pointer" onClick={signOut}>
                <CgLogOff className="fa-fw ms-2 me-3" /> <span className="lh-1">Sair</span>
            </a>
        </Menu>
    )
}

export default function Dashboard({ children }: any) {

    useEffect(() => {
        import("bootstrap").then(({ Offcanvas }) => [].slice.call(document.querySelectorAll('.offcanvas')).map((el) => new Offcanvas(el)));
    }, [])

    return (
        <div className="container-fluid h-100">
            <div className="row overflow-hidden h-100">
                <Sidebar className="d-none d-md-flex col-auto md-width shadow" />
                <Body className="col pt-4 p-md-4 bg-light">

                    {/* MOBILE */}
                    <nav className="navbar fixed-top navbar-light bg-light d-md-none">
                        <div className="container-fluid">
                            <a className="navbar-brand d-flex align-items-center" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas">
                                <AiOutlineMenu className="me-3" /> Dashboard
                            </a>
                        </div>
                    </nav>

                    <div className="mt-4 pt-2 mt-md-0 pt-md-0">
                        {children}
                    </div>
                </Body>

                {/* MOBILE */}
                <div className="offcanvas offcanvas-start p-0" id="offcanvas" aria-labelledby="offcanvasLabel">
                    <div className="position-relative">
                        <CloseOffCanvas type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></CloseOffCanvas>
                    </div>
                    <Sidebar className="offcanvas-body" />
                </div>
            </div>
        </div>
    )
}

const Body = styled.div`
    height: 100%;
    overflow: auto;
`;

const Menu = styled.div`
    z-index: 1;
    background-color: white;
    border-radius: 0;
    padding: 0;

    &.md-width { width: 14%; };
    & .list-group-item { border-bottom: 0; padding-top: 1rem; padding-bottom: 1rem;  }
    & .list-group-item.list-group-item-action:first-child { margin-bottom: 2rem; text-align: center; }
    & .list-group-item.list-group-item-action:not(:first-child) { border-right: 3px solid transparent!important; border-top: 1px solid transparent!important; color: var(--bs-gray-500) }
    & .list-group-item.list-group-item-action.active { font-weight: 600; background-color: transparent; color: black; }
    & .list-group-item.list-group-item-action.active svg { color: var(--purple); }
    & .list-group-item.list-group-item-action:hover { color: var(--purple); border-right-color: var(--purple)!important; background-color: #f8f9fa!important; }
`;

const CloseOffCanvas = styled.button`
    position: absolute;
    z-index: 1;
    top: 1rem;
    right: 1rem;
`