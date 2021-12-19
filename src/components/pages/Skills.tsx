import { Information } from '../../models/Information'

interface SkillsProps { informations: Information[] }

export default function Skills({ informations }: SkillsProps) {
    return (
        <section className="bg-light p-6" id="skills">
            <div className="container px-6">
                <h2 className="title-page mb-5" data-shadow="Skills">Skills</h2>
                {informations.map((information: Information) =>
                    <div className="mb-5" key={information.id}>
                        <p className="fw-bold">{information.title}</p>
                        {information.description && <div dangerouslySetInnerHTML={{ __html: information.description }} />}
                    </div>
                )}
            </div>
        </section>
    )
}
