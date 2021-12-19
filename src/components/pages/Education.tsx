import dayjs from 'dayjs'
import { Information } from '../../models/Information'
import { titleCase } from '../../utils/StringUtils'

interface EducationProps { informations: Information[] }

export default function Education({ informations }: EducationProps) {
    return (
        <section className="px-6 pt-6 pb-7" id="education">
            <div className="container px-6">
                <h2 className="title-page mb-5" data-shadow="Education">Education</h2>
                {informations.map((information: Information) =>
                    <div className="mb-3" key={information.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-bold mb-0 text-uppercase">{information.title}</p>
                                {information.subtitle && <p>{titleCase(information.subtitle)}</p>}
                            </div>
                            <span className="text-muted">
                                {dayjs(information.start).format('MMMM YYYY')} - {dayjs(information.end).format('MMM YYYY')}
                            </span>
                        </div>
                        {information.description && <div dangerouslySetInnerHTML={{ __html: information.description }} />}
                    </div>
                )}
            </div>
        </section>
    )
}
