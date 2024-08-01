import { useEffect, useState } from 'react';
import styled from 'styled-components';

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface CareerProps { informations: any }

export default function Career({ informations }: CareerProps) {

    const [years, setYears] = useState<any>();
    const [timeLine, setTimeLine] = useState<any>();

    useEffect(() => {
        import("bootstrap").then(({ Tooltip }) => [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((el) => new Tooltip(el)));

        const oldestInfo = Object.values(informations)
            .map((info: any) => (info.sort((a: any, b: any) => a.start! > b.start! && 1 || -1)[0]))
            .sort((a: any, b: any) => a.start! > b.start! && 1 || -1)[0];

        const yearsToNow = dayjs().diff(dayjs(oldestInfo.start), 'year');
        const oldestYear = +dayjs(oldestInfo.start).format('YYYY');
        setYears(Array.from({ length: yearsToNow + 1 }, (_, i) => oldestYear + i));
    }, [])

    useEffect(() => {
        if (years) {
            const education: any = informations.EDUCATION ? infoToTimeLine(informations.EDUCATION.flat()) : {}

            const devArrayXP = informations.EXPERIENCE.filter((info: any) => info.title[0] != '_');
            const devXP: any = devArrayXP ? infoToTimeLine(devArrayXP.flat()) : {}

            const gdArrayXP = informations.EXPERIENCE.filter((info: any) => info.title[0] == '_');
            const gdXP: any = gdArrayXP ? infoToTimeLine(gdArrayXP.flat()) : {}

            setTimeLine([education, devXP, gdXP])
        }
    }, [years])

    function infoToTimeLine(informations: any) {
        let obj: any = {};
        for (let i = 0; i < years.length; i++) {
            for (let j = 0; j < informations.length; j++) {
                const info = informations[j];
                const year = years[i];
                if (obj[year] === undefined || obj[year] === true) {
                    const start = +dayjs(info.start).format('YYYY')
                    const end = info.end ? +dayjs(info.end) : +dayjs()
                    const diff = dayjs(end).diff(dayjs(info.start), 'year', true)
    
                    if (year == start) {
                        obj[year] = {
                            title: info.title,
                            subtitle: info.subtitle,
                            start: +dayjs(info.start).format('YYYY'),
                            size: Math.round(diff)
                        }
                    }
                    else if (dayjs(`${year}-01-01`).isBetween(`${start}-01-01`, `${+dayjs(end).format('YYYY')}-01-01`, 'year')) {
                        obj[year] = null
                    } else {
                        obj[year] = true
                    }
                }
            }
        }

        return Object.values(obj)
    }

    return (
        <Section>
            <div className="d-flex align-items-end justify-content-between mb-4">
                <h2 className="title-page mb-0">Career</h2>
                <a className="mb-2" href="#">Get CV <i className="fa fa-fw fa-file-text-o"></i></a>
            </div>
            {timeLine && timeLine.length &&
                <Timeline>
                    <table>
                        <tbody>
                            {timeLine.map((tlEvents: any, iT: number) =>
                                <tr className="event" key={iT}>
                                    {tlEvents.map((tle: any, iE: number) => 
                                        tle && tle.size ?
                                            <td colSpan={tle.size} key={`${iT}-${iE}`}>
                                                <div data-bs-toggle="tooltip" data-bs-html="true"
                                                    title={`${tle.title.replace('_', '')}<br><small class='lh-1'>${tle.subtitle}</small>`}
                                                    className={iT == 0 ? 'bg-success' : iT == 1 ? 'bg-primary' : 'bg-warning'}></div>
                                            </td>
                                        : tle ? <td key={`${iT}-${iE}`}></td>
                                        : <></>
                                    )}
                                </tr>
                            )}
                            <tr className="dates">
                                {years && years.map((year: any, index: number) => <td key={index}>{year}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </Timeline>
            }
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-auto">
                    <i className="fa fa-square text-success me-1"></i> Education
                </div>
                <div className="col-12 col-md-auto">
                    <i className="fa fa-square text-primary me-1"></i> Web Developer
                </div>
                <div className="col-12 col-md-auto">
                    <i className="fa fa-square text-warning me-1"></i> Graphic Designer
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 8rem;

    @media (max-width: 768px) {
        padding-left: .5rem;
        padding-right: .5rem;
        margin-top: 4rem;
    }
`
const Timeline = styled.div`
    overflow: auto;

    table { width: 100%; }

    td { padding-left: 1rem; padding-right: 1rem; position: relative; }

    tr.dates td { padding-top: .75rem; text-align: center; }
    tr.dates td::before { content:""; position: absolute; height: 4rem; width: 1px; background-color: #ddd; top: -3.2rem; left: 0; }
    
    tr.event td { position: relative; padding-top: .5rem; padding-bottom: .5rem; }
    tr.event td:last-child div.bg-success { background: linear-gradient(to left, #F3FAFF 20px, var(--bs-success) 100px); }
    tr.event td:last-child div.bg-primary { background: linear-gradient(to left, #F3FAFF 20px, var(--bs-primary) 100px); }
    tr.event td:last-child div.bg-warning { background: linear-gradient(to left, #F3FAFF 20px, var(--bs-warning) 100px); }
    tr.event td div { position: absolute; left: 3px; width: calc(100% - 5px); height: 10px; border-radius: 2rem; }

`;
