'use server';

import prisma from "@/lib/db";
import { PaymentMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface PaymentMethodResponse {
    code: number;
    message: string;
    data: PaymentMethod[] | null
}

export const getPaymentMethods = async (active?: boolean): Promise<PaymentMethodResponse> => {

    try {
        const paymentMethods = await prisma.paymentMethod.findMany({ where: { active }, orderBy: { id: 'asc' } });

        return {
            code: 200,
            message: 'Consulta exitosa',
            data: paymentMethods
        }
    } catch (error) {
        console.error('🚀 ~ getPaymentMethods ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al consultar los métodos de pago',
                data: null
            }
        }
    }
};

export const createPaymentMethod = async (name: string): Promise<PaymentMethodResponse> => {
    try {

        if (!name) {
            throw new Error('El nombre es obligatorio');
        }

        const paymentMethod = await prisma.paymentMethod.create({ data: { name } });

        revalidatePath('/dashboard/parametrization/payment-methods');

        return {
            code: 200,
            message: 'Creado correctamente',
            data: [paymentMethod]
        }
    } catch (error) {
        console.error('🚀 ~ createPaymentMethod ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al crear el método de pago',
                data: null
            }
        }
    }
};

export const deletePaymentMethod = async (id: number): Promise<PaymentMethodResponse> => {
    try {

        const paymentMethod = await prisma.sale.findFirst({ where: { payment_method_id: id } });

        if (paymentMethod) {
            throw new Error('No se puede eliminar el método de pago porque tiene ventas asociadas');
        }

        const deletedPaymentMethod = await prisma.paymentMethod.delete({ where: { id } });

        revalidatePath('/dashboard/parametrization/payment-methods');

        return {
            code: 200,
            message: 'Borrado correctamente',
            data: [deletedPaymentMethod]
        }
    } catch (error) {
        console.error("🚀 ~ deletePaymentMethod ~ error:", error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al eliminar el método de pago',
                data: null
            }
        }
    }
}

export const updatePaymentMethod = async (id: number, name: string, active: boolean): Promise<PaymentMethodResponse> => {
    try {

        if (!name) {
            throw new Error('El nombre es obligatorio');
        }

        const paymentMethod = await prisma.paymentMethod.update({
            where: { id },
            data: { name, active }
        });

        revalidatePath('/dashboard/parametrization/payment-methods');

        return {
            code: 200,
            message: 'Actualizado correctamente',
            data: [paymentMethod]
        }
    } catch (error) {
        console.error('🚀 ~ updatePaymentMethod ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al actualizar el método de pago',
                data: null
            }
        }
    }
}
