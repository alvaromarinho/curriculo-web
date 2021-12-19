import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Information } from '../../models/Information'
import { titleCase } from '../../utils/StringUtils'

interface EducationProps { informations: Information[] }

export default function Education({ informations }: EducationProps) {

    useEffect(() => {
        informations = informations.sort((a, b) => a.start! < b.start! && 1 || -1)
    }, [])

    return (
        <section className="p-6" id="education">
            <div className="container px-6">
                <h2 className="title-page mb-5" data-shadow="Education">Education</h2>
                {informations.map((information: Information) =>
                    <div className="mb-5" key={information.id}>
                        <div className="d-flex align-items-center">
                            <span className="d-inline-block fw-bold text-uppercase me-2">{information.title}</span>
                            <span className="fs-7 text-muted">({dayjs(information.start).format('MMMM YYYY')} - {dayjs(information.end).format('MMMM YYYY')})</span>
                        </div>
                        {information.subtitle && <p>{titleCase(information.subtitle)}</p>}
                        {information.description && <div dangerouslySetInnerHTML={{ __html: information.description }} />}
                    </div>
                )}
            </div>
        </section>
    )
}
