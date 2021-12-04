import { CgLogOff } from "react-icons/cg";
import { RiBarChart2Line, RiHome2Line, RiLineChartLine, RiPieChartLine } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import Link from 'next/link'
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";

function Sidebar({ className }: any) {
    return (
        <Menu className={`list-group list-group-flush ${className}`}>
            <Link href="/dashboard" passHref>
                <a className="list-group-item ms-3">
                    <img className="me-3" src="/logo.svg" width="15" /> Data Brain
                </a>
            </Link>
            <Link href="/dashboard" passHref>
                <a className="list-group-item list-group-item-action d-flex align-items-center active">
                    <RiHome2Line className="fa-fw ms-3 me-3" /> <span className="lh-1">Home</span>
                </a>
            </Link>
            <Link href="/dashboard" passHref>
                <a className="list-group-item list-group-item-action d-flex align-items-center">
                    <CgLogOff className="fa-fw ms-3 me-3" /> <span className="lh-1">Sair</span>
                </a>
            </Link>
        </Menu>
    )
}

export default function Dashboard({ children }: any) {
    return (
        <div className="container-fluid h-100">
            <div className="row overflow-hidden h-100">
                <Sidebar className="d-none d-md-flex col-auto md-width" />
                <Body className="col pt-4 p-md-4">

                    {/* MOBILE */}
                    <nav className="navbar fixed-top navbar-light bg-gray-light d-md-none">
                        <div className="container-fluid">
                            <a className="navbar-brand d-flex align-items-center" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                <AiOutlineMenu className="me-3" /> Dashboard
                            </a>
                        </div>
                    </nav>

                    {children}
                </Body>

                {/* MOBILE */}
                <div className="offcanvas offcanvas-start p-0" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
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
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    background-color: white;
    border-radius: 0;
    padding: 0;

    &.md-width { width: 14%; };
    & .list-group-item { border-bottom: 0; margin-top: .5rem; margin-bottom: .5rem; padding-top: 1rem; padding-bottom: 1rem;  }
    & .list-group-item.list-group-item-action:first-child { margin-bottom: 2rem; text-align: center; }
    & .list-group-item.list-group-item-action:not(:first-child) { border-right: 3px solid transparent!important; border-top: 1px solid transparent!important; color: var(--bs-gray-500) }
    & .list-group-item.list-group-item-action.active { font-weight: 600; background-color: transparent; color: black; }
    & .list-group-item.list-group-item-action.active svg { color: var(--purple); }
    & .list-group-item.list-group-item-action:hover { color: var(--purple); border-right-color: var(--purple)!important; background-color: #f8f9fa!important; }
`;

const CloseOffCanvas = styled.button`
    position: absolute;
    z-index: 1;
    top: 1.5rem;
    right: 1rem;
`