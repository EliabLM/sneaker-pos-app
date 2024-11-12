export enum Role {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    SELLER = 'SELLER',
}

export interface User {
    id: number;
    code: string;
    name: string;
    email: string;
    avatar: string;
    role: Role;
    active: boolean;
    creation_date: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    image?: string;
    stock: number;
    price: number;
    brand_id: number;
    category_id: number;
    active: boolean;
    creation_date: string;
}