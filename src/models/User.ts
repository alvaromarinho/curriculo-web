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
    socialNetworks?: SocialNetwork[];
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

