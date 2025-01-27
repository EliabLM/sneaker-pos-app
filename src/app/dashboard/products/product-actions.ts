'use server'

import prisma from '@/lib/db';
import { Product } from '@prisma/client';

interface Response {
    code: number;
    message: string;
    data: Product | Product[] | null
}

export const getAllProducts = async (): Promise<Response> => {
    try {

        const products = await prisma.product.findMany({
            include: {
                brand: true,
                category: true,
            },
            orderBy: { id: 'asc' },
        });

        return {
            code: 200,
            message: 'Productos obtenidos correctamente',
            data: products
        }

    } catch (error) {
        console.error('🚀 ~ getAllProducts ~ error:', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al obtener todos los productos',
                data: null
            }
        }

    }
}