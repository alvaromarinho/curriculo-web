import { Curriculo } from '../models/User'

interface AboutProps { user: Curriculo }

export default function About({ user }: AboutProps) {
    return (
        <div className="container px-6">
            <div>
                {user.city} - {user.uf}
            </div>
            <div>
                {user.email}
            </div>
            <div>
                {user.description}
            </div>
            {user.phones && user.phones.map((phone, index) => (
                <div key={index}>{phone.number}</div>
            ))}
        </div>
    )
}