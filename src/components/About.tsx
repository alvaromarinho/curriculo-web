import styled from 'styled-components'
import { Curriculo } from '../models/User'

interface AboutProps { user: Curriculo }

export default function About({ user }: AboutProps) {
    return (
        <section className="position-relative">
            <Container className="container" id="about">
                <h2 className="text-center mb-5">About</h2>
                <div className="mb-5">{user.description}</div>
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
            </Container>
        </section>
    )
}

const Container = styled.div`
    margin-top: -5rem;
    margin-bottom: 5rem;
    width: 80%;
    background-color: blue;
    color: white;
    padding: 5rem;
`;