'use server';

import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CategoryResponse {
    code: number;
    message: string;
    data: Category[] | null
}

export const getCategories = async (active?: boolean): Promise<CategoryResponse> => {

    try {
        const categories = await prisma.category.findMany({ where: { active }, orderBy: { id: 'asc' } });

        return {
            code: 200,
            message: 'Consulta exitosa',
            data: categories
        }
    } catch (error) {
        console.error('🚀 ~ getCategories ~ error', error);

        return {
            code: 500,
            message: 'Hubo un error al consultar las categorías',
            data: null
        }
    }
};

export const createCategory = async (name: string): Promise<CategoryResponse> => {
    try {

        if (!name) {
            throw new Error('El nombre es obligatorio');
        }

        const category = await prisma.category.create({ data: { name } });

        revalidatePath('/dashboard/parametrization/categories');

        return {
            code: 200,
            message: 'Categoría creada correctamente',
            data: [category]
        }
    } catch (error) {
        console.error('🚀 ~ createCategory ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al crear la categoría',
                data: null
            }
        }
    }
};

export const deleteCategory = async (id: number): Promise<CategoryResponse> => {
    try {

        const category = await prisma.product.findFirst({ where: { category_id: id } });

        if (category) {
            throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
        }

        const deletedCategory = await prisma.category.delete({ where: { id } });

        revalidatePath('/dashboard/parametrization/categories');

        return {
            code: 200,
            message: 'Categoría borrada correctamente',
            data: [deletedCategory]
        }
    } catch (error) {
        console.error("🚀 ~ deleteCategory ~ error:", error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al eliminar la categoría',
                data: null
            }
        }
    }
}

export const updateCategory = async (id: number, name: string, active: boolean): Promise<CategoryResponse> => {
    try {

        if (!name) {
            throw new Error('El nombre es obligatorio');
        }

        const category = await prisma.category.update({
            where: { id },
            data: { name, active }
        });

        revalidatePath('/dashboard/parametrization/categories');

        return {
            code: 200,
            message: 'Categoría actualizada correctamente',
            data: [category]
        }
    } catch (error) {
        console.error('🚀 ~ updateCategory ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al actualizar la categoría',
                data: null
            }
        }
    }
}
