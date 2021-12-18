export interface Portfolio {
    id?: number;
    name?: string;
    projects?: Project[];
}

export interface ProjectImage {
    id?: number;
    url?: string;
}

export interface Project {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    url?: string;
    images?: ProjectImage[];
}