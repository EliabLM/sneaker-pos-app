'use server'

import { revalidatePath } from 'next/cache';
import { Product } from '@prisma/client';
import prisma from '@/lib/db';

interface ProductResponse {
    code: number;
    message: string;
    data: Product[] | null
}

interface CreateProductBody {
    name: string
    description?: string
    image?: string
    stock: number
    price: number
    brand_id: number
    category_id?: number
    active: boolean
}

export const getAllProducts = async (active?: boolean): Promise<ProductResponse> => {
    try {

        const products = await prisma.product.findMany({
            where: {
                active
            },
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

export const createProduct = async (body: CreateProductBody): Promise<ProductResponse> => {
    try {

        const { name, description, image, stock, price, brand_id, category_id } = body;

        const product = await prisma.product.create({ data: { name, description, image, stock, price, brand_id, category_id } });

        revalidatePath('/dashboard/products');

        return {
            code: 200,
            message: 'Creado correctamente',
            data: [product]
        }
    } catch (error) {
        console.error('🚀 ~ createProduct ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al crear el producto',
                data: null
            }
        }
    }
};

export const deleteProduct = async (id: number): Promise<ProductResponse> => {
    try {

        const productSale = await prisma.saleDetail.findFirst({ where: { product_id: id } });
        const productPurchase = await prisma.purchaseDetail.findFirst({ where: { product_id: id } });

        if (productSale) {
            throw new Error('No se puede eliminar el producto porque tiene ventas asociadas');
        } else if (productPurchase) {
            throw new Error('No se puede eliminar el producto porque tiene compras asociadas');
        }

        const deleteProduct = await prisma.product.delete({ where: { id } });

        revalidatePath('/dashboard/products');

        return {
            code: 200,
            message: 'Borrado correctamente',
            data: [deleteProduct]
        }
    } catch (error) {
        console.error("🚀 ~ deleteProduct ~ error:", error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al eliminar el producto',
                data: null
            }
        }
    }
}

export const updateProduct = async (body: CreateProductBody, id: number): Promise<ProductResponse> => {
    try {

        const product = await prisma.product.update({
            where: { id },
            data: body
        });

        revalidatePath('/dashboard/products');

        return {
            code: 200,
            message: 'Actualizado correctamente',
            data: [product]
        }
    } catch (error) {
        console.error('🚀 ~ updateProduct ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al actualizar el producto',
                data: null
            }
        }
    }
}