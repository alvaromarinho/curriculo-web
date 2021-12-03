export interface Curriculo {
    id?: number;
    email?: string;
    city?: string;
    uf?: string;
    description?: string;
    image?: string;
    informations?: Information[];
    name?: string;
    phones?: Phone[];
    portfolios?: Portfolio[];
    socialNetworks?: SocialNetwork[];
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

export interface Phone {
    id?: number;
    number?: string;
}

export interface SocialNetwork {
    id?: number;
    name?: string;
    icon?: string;
    url?: string;
}

export interface Portfolio {
    id?: number;
    name?: string;
    projects?: Project[];
}

export interface Project {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    url?: string;
    images?: any[];
}