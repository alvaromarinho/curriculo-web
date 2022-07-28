import { User } from "../../models/User";
import Typewriter from "typewriter-effect";

interface StartProps { user: User }

export default function Start({ user }: StartProps) {

    return (
        <section className="container p-6 mt-5">
            <div className="d-flex mt-4 mt-md-0">
                <h1 className="display-3 fw-normal">Hello, it's me {user.name}</h1>
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
            <div className="d-flex display-6 mb-5">
                <span className="d-inline-block ms-1 me-2">I'm a </span>
                <span className="text-primary">
                    <Typewriter options={{ strings: ['Web Developer', 'Graphic Designer', 'Freelancer'], autoStart: true, loop: true }} />
                </span>
            </div>
            {user.description && <div className="ms-2 me-7 mb-5 fs-5 fw-light" dangerouslySetInnerHTML={{ __html: user.description }} />}
        </section>
    )
}