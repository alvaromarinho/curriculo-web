import { User } from '../../models/User'

interface AboutProps { user: User }

export default function About({ user }: AboutProps) {
    return (
        <section className="px-6 pt-6 pb-7" id="about">
            <div className="container px-6">
                <h2 className="title-page mb-5" data-shadow="About">About</h2>
                <div className="d-flex">
                    <div className="flex-shrink-0">
                        <img width="400" src={`${process.env.API_URL}/assets/img${user.image}`} alt="Perfil" />
                    </div>
                    <div className="flex-grow-1 ms-5">
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
            </div>
        </section>
    )
}