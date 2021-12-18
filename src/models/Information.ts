export enum InformationType {
    EDUCATION,
    SKILLS,
    EXPERIENCE
}

export interface Information {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    type?: string;
    start?: string;
    end?: string;
}