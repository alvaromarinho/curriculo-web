import { Curriculo } from '../models/User'

interface AboutProps { user: Curriculo }

export default function About({ user }: AboutProps) {
    return (
        <div className="container d-flex px-6">

            <div className="flex-shrink-0">
                <img src='vercel.svg' alt="Perfil" />
            </div>
            <div className="flex-grow-1 ms-3">
                <p>{user.description}</p>
                <div className="d-flex justify-content-between">
                    <span>
                        <i className="fa fa-map-marker"></i> {user.city} - {user.uf}
                    </span>
                    <span>
                        <i className="fa fa-envelope-o"></i> {user.email}
                    </span>
                    <div>
                        {user.phones && user.phones.map((phone, index) => (
                            <span key={index}>
                                <i className="fa fa-whatsapp"></i> {phone.number}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}