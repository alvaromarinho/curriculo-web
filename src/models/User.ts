import { Information } from "./Information";
import { Portfolio } from "./Portfolio";

export interface User {
    id?: number;
    email?: string;
    city?: string;
    uf?: string;
    password?: string;
    description?: string;
    image?: string;
    informations?: Information[];
    name?: string;
    phones?: Phone[];
    portfolios?: Portfolio[];
    links?: Link[];
}

export interface Phone {
    id?: number;
    number?: string;
}

export interface Link {
    id?: number;
    name?: string;
    url?: string;
}

