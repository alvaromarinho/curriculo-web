import { Information } from '../../models/Information'
import { useEffect } from 'react';
import dayjs from "dayjs";
import styled from 'styled-components'

interface ExperienceProps { informations: Information[] }

export default function Experience({ informations }: ExperienceProps) {

    useEffect(() => {
        informations = informations.sort((a, b) => a.start! > b.start! && 1 || -1)
    }, [])

    return (
        <section className="bg-light p-6" id="experience">
            <div className="container px-6">
                <h2 className="text-center mb-5">Experience</h2>
                <Timeline>
                    {informations.map((information: Information) =>
                        <TimelineItem key={information.id}>
                            <TimelineIcon className="bg-primary">
                                <i className="fa fa-fw fa-th-list"></i>
                            </TimelineIcon>
                            <div className="timeline-date">
                                <span>{dayjs(information.start).format('MMM YYYY')} - {information.end ? dayjs(information.end).format('MMM YYYY') : 'Present'}</span>
                            </div>
                            <div className="timeline-card card">
                                <div className="card-body">
                                    <h3>{information.title}</h3>
                                    <span>{information.description}</span>
                                </div>
                            </div>
                        </TimelineItem>
                    )}
                </Timeline>
            </div>
        </section>
    )
}

const Timeline = styled.div`
    padding: 1rem;
    position: relative;
    transition: all 0.4s ease;

    @media (max-width: 768px) {
        & { padding: 30px; }
        &:before { left: 1.8rem; }
    }
`;

const TimelineItem = styled.div`
    padding-bottom: 50px;
    position: relative;

    &:not(:last-child):before {
        content: "";
        width: 4px;
        height: 100%;
        background: #d7e4ed;
        left: 50%;
        top: 0;
        position: absolute;
    }
    
    &:nth-child(even) .timeline-card {
        margin-left: auto;
    }
    &:nth-child(even) .timeline-card:before {
        left: 0;
        right: inherit;
        margin-left: -7px;
        border-left: 0;
        border-right: 7px solid white;
    }
    &:nth-child(even) .timeline-date {
        right: 50%;
        left: inherit;
        margin-right: 3rem;
    }

    .timeline-date {
        position: absolute;
        padding: .8rem 0;
        left: 50%;
        margin-left: 3rem;
        opacity: .4;
    }

    .timeline-card {
        width: 45%;
        transition: all 0.3s ease;
        border: none;
        box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
    }
    .timeline-card:before {
        content: '';
        position: absolute;
        right: 0;
        margin-right: -7px;
        top: 1.1rem;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 7px solid white;
    }
    .timeline-card .card-header {
        border-color: white;
        background-color: white;
    }
    .timeline-card h3 {
        font-size: 1.3rem;
    }

    @media (max-width: 768px) {
        .timeline-card { width: 90%; margin-left: auto; }
        .timeline-card:before {
            left: 0;
            right: inherit;
            margin-left: -7px;
            border-left: 0;
            border-right: 7px solid white;
        }
    }
`;

const TimelineIcon = styled.div`
    background: var(--secondary);
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    left: 50%;
    overflow: hidden;
    margin-left: -1.4rem;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #ffffff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.1);

    .fa {
        margin-left: .9rem;
        margin-top: .9rem;
        color: white;
    }

    @media (max-width: 768px) {
        .timeline-icon { left: 0; }
    }
`;
