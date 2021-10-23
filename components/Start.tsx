import { Curriculo } from '../models/User'
import Typewriter from "typewriter-effect";

interface StartProps { user: Curriculo }

export default function Start({ user }: StartProps) {

    return (
        <div className="container px-6">
            {/* <img src={user.image} alt="Perfil" /> */}
            <h1 className="display-3 text-capitalize">{user.name}</h1>

            <div className="d-flex display-6 mb-3">
                <span className="d-inline-block me-1">I'm </span>
                <span className="text-success">
                    <Typewriter options={{ strings: ['Developer', 'Designer', 'Freelancer'], autoStart: true, loop: true }} />
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
    )
}