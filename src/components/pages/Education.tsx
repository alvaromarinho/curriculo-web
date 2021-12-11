import dayjs from 'dayjs'
import { Information } from '../../models/User'
import { titleCase } from '../../utils/StringUtils'

interface EducationProps { informations: Information[] }

export default function Education({ informations }: EducationProps) {
    return (
        <section className="p-6" id="education">
            <div className="container px-6">
                <h2 className="text-center mb-5">Education</h2>
                {informations.map((information: Information) =>
                    <div className="mb-3" key={information.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <b>{information.title}</b>
                                <p>{information.subtitle && titleCase(information.subtitle)}</p>
                            </div>
                            <span className="text-muted">
                                {dayjs(information.start).format('MMM YYYY')} - {dayjs(information.end).format('MMM YYYY')}
                            </span>
                        </div>
                        {information.description && <div dangerouslySetInnerHTML={{ __html: information.description }} />}
                    </div>
                )}
            </div>
        </section>
    )
}
