import { User } from "../../models/User";
import Typewriter from "typewriter-effect";
import styled from "styled-components";

interface StartProps { user: User }

export default function Start({ user }: StartProps) {

    return (
        <Section>
            <div className="d-flex">
                <h1 className="display-3 fw-normal">Hello, it's me {user.name}</h1>
                <ul className="nav">
                    {user.links && user.links.map((link, index) => (
                        <li className="nav-item" key={index}>
                            <a className="nav-link px-0" href={link.url} target="_blank">
                                <i className={`fa fs-4 fa-fw fa-${link.name!.toLowerCase()}-square`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="d-flex display-6 ms-1 mb-5">
                <span className="d-inline-block me-2">I'm a </span>
                <span className="text-primary">
                    <Typewriter options={{ strings: ['Web Developer', 'Graphic Designer', 'Freelancer'], autoStart: true, loop: true }} />
                </span>
            </div>
            {user.description && <div className="description" dangerouslySetInnerHTML={{ __html: user.description }} />}
        </Section>
    )
}

const Section = styled.section`
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 8rem;

    .description { font-size: 1.25rem; font-weight: 300; margin: 0 10rem 3rem 0.25rem; }

    @media (max-width: 768px) {
        padding-left: .5rem;
        padding-right: .5rem;
        margin-top: 2rem;

        .description { font-size: 1rem; margin: 0 0 2rem .1rem; }
        .display-3 { font-size: 1.8rem!important; }
        .display-6 { font-size: 1.3rem!important; }
        .nav-link { padding-top: 0; padding-left: .2rem!important; }
        .fa.fs-4 { font-size: 1.3rem!important; }
    }
`