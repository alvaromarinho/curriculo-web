import { User } from '../../models/User'
import Typewriter from "typewriter-effect";
import styled from 'styled-components';

interface StartProps { user: User }

export default function Start({ user }: StartProps) {

    return (
        <Section className="vh-100 d-flex align-items-center px-6 paralax" id="start">
            <div className="container px-6">
                <div className="row">
                    <div className="col-12 col-md-auto">
                        <img className="d-md-none" src="/logo.svg" height="100" alt="Marca" />
                        <img className="d-none d-md-block" src="/logo.svg" height="200" alt="Marca" />
                    </div>
                    <div className="col-12 col-md mt-4 mt-md-0 ms-md-4">
                        <h1 className="display-3 fw-bold text-capitalize">{user.name}</h1>

                        <div className="d-flex display-6 mb-3">
                            <span className="d-inline-block me-2">I'm a </span>
                            <span className="text-primary">
                                <Typewriter options={{ strings: ['Web Developer', 'Graphic Designer', 'Freelancer'], autoStart: true, loop: true }} />
                            </span>
                        </div>

                        <ul className="nav">
                            {user.links && user.links.map((link, index) => (
                                <li className="nav-item" key={index}>
                                    <a className="nav-link ps-0" href={link.url} target="_blank">
                                        <i className={`fa fa-2x fa-fw fa-${link.name!.toLowerCase()}-square`}></i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </Section>
    )
}

const Section = styled.section`
    @media (max-width: 768px) {
        .display-6 { font-size: calc(1.375rem + 0.5vw); }
    }
`