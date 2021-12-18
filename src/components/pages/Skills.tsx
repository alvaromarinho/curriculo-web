import { Information } from '../../models/Information'

interface SkillsProps { informations: Information[] }

export default function Skills({ informations }: SkillsProps) {
    return (
        <section className="bg-light p-6" id="skills">
            <div className="container px-6">
                <h2 className="text-center mb-5">Skills</h2>
                {informations.map((information: Information) =>
                    <div className="mb-3" key={information.id}>
                        <b>{information.title}</b>
                        {information.description && <div dangerouslySetInnerHTML={{ __html: information.description }} />}
                    </div>
                )}
            </div>
        </section>
    )
}
