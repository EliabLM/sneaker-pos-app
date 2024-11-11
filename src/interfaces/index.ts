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