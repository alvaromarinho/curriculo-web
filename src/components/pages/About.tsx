import styled from 'styled-components'
import { User } from '../../models/User'

interface AboutProps { user: User }

export default function About({ user }: AboutProps) {
    return (
        <Section className="px-6 pt-6 pb-7" id="about">
            <div className="container px-6">
                <h2 className="title-page mb-5" data-shadow="About">About</h2>
                <div className="row">
                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                        <img className="w-400" src={`${process.env.API_URL}/assets/img${user.image}`} alt="Perfil" />
                    </div>
                    <div className="col-12 col-md-7">
                        {user.description && <div className="mb-3" dangerouslySetInnerHTML={{ __html: user.description }} />}
                        <div className="row justify-content-between">
                            <div className="col-12 col-md-auto">
                                <i className="fa fa-map-marker"></i> {user.city} - {user.uf}
                            </div>
                            <div className="col-12 col-md-auto">
                                <i className="fa fa-envelope-o"></i> {user.email}
                            </div>
                            <div className="col-12 col-md-auto">
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
        </Section >
    )
}

const Section = styled.section`
    .w-400 { max-width: 400px }

    @media (max-width: 768px) {
        .w-400 { max-width: 300px }
    }
`