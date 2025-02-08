'use server'

import { revalidatePath } from 'next/cache';
import { Role, User } from '@prisma/client';
import prisma from '@/lib/db';

interface UserResponse {
    code: number;
    message: string;
    data: User[] | null
}

interface CreateUserBody {
    code: string;
    name: string;
    email: string;
    image?: string;
    role: Role;
    active: boolean
}

export const getAllUsers = async (active?: boolean): Promise<UserResponse> => {
    try {

        const users = await prisma.user.findMany({
            where: {
                active
            },
            orderBy: { id: 'asc' },
        });

        return {
            code: 200,
            message: 'Usuarios obtenidos correctamente',
            data: users
        }

    } catch (error) {
        console.error('🚀 ~ getAllUsers ~ error:', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al obtener todos los usuarios',
                data: null
            }
        }

    }
}

export const createUser = async (body: CreateUserBody): Promise<UserResponse> => {
    try {

        const { code, name, email, image, role } = body;

        const user = await prisma.user.create({ data: { code, name, email, image, role } });

        revalidatePath('/dashboard/users');

        return {
            code: 200,
            message: 'Creado correctamente',
            data: [user]
        }
    } catch (error) {
        console.error('🚀 ~ createUser ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al crear el usuario',
                data: null
            }
        }
    }
};

export const deleteUser = async (id: number): Promise<UserResponse> => {
    try {
        const userSale = await prisma.sale.findFirst({ where: { user_id: id } });

        if (userSale) {
            throw new Error('No se puede eliminar el usuario porque tiene ventas asociadas');
        }

        const deletedUser = await prisma.user.delete({ where: { id } });

        revalidatePath('/dashboard/users');

        return {
            code: 200,
            message: 'Borrado correctamente',
            data: [deletedUser]
        }
    } catch (error) {
        console.error("🚀 ~ deleteUser ~ error:", error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al eliminar el usuario',
                data: null
            }
        }
    }
}

export const updateUser = async (body: CreateUserBody, id: number): Promise<UserResponse> => {
    try {
        const { name, email, image, role, active } = body;

        const user = await prisma.user.update({
            where: { id },
            data: { name, email, image, role, active }
        });

        revalidatePath('/dashboard/users');

        return {
            code: 200,
            message: 'Actualizado correctamente',
            data: [user]
        }
    } catch (error) {
        console.error('🚀 ~ updateUser ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al actualizar el usuario',
                data: null
            }
        }
    }
}