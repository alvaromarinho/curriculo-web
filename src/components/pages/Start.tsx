import { User } from '../../models/User'
import Typewriter from "typewriter-effect";

interface StartProps { user: User }

export default function Start({ user }: StartProps) {

    return (
        <section className="vh-100 d-flex align-items-center bg-light px-6" id="start">
            <div className="container px-6">
                <h1 className="display-3 fw-bold text-capitalize">{user.name}</h1>

                <div className="d-flex display-6 mb-3">
                    <span className="d-inline-block me-2">I'm a </span>
                    <span className="text-success">
                        <Typewriter options={{ strings: ['Web Developer', 'Graphic Designer', 'Freelancer'], autoStart: true, loop: true }} />
                    </span>
                </div>

                <ul className="nav">
                    {user.socialNetworks && user.socialNetworks.map((social, index) => (
                        <li className="nav-item" key={index}>
                            <a className="nav-link ps-0" href={social.url} target="_blank">
                                <i className={`fa fa-2x fa-fw ${social.icon}`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}