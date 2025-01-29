'use server';

import prisma from "@/lib/db";
import { Location } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface LocationResponse {
    code: number;
    message: string;
    data: Location[] | null
}

export const getLocations = async (active?: boolean): Promise<LocationResponse> => {

    try {
        const locations = await prisma.location.findMany({ where: { active }, orderBy: { id: 'asc' } });

        return {
            code: 200,
            message: 'Consulta exitosa',
            data: locations
        }
    } catch (error) {
        console.error('🚀 ~ getLocations ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al consultar los locales',
                data: null
            }
        }
    }
};

export const createLocation = async (name: string, address: string, description: string | undefined): Promise<LocationResponse> => {
    try {

        if (!name || !address) {
            throw new Error('El nombre y la dirección son obligatorios');
        }

        const location = await prisma.location.create({ data: { name, address, description } });

        revalidatePath('/dashboard/parametrization/locations');

        return {
            code: 200,
            message: 'Creado correctamente',
            data: [location]
        }
    } catch (error) {
        console.error('🚀 ~ createLocation ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al crear el local',
                data: null
            }
        }
    }
};

export const deleteLocation = async (id: number): Promise<LocationResponse> => {
    try {

        const sale = await prisma.sale.findFirst({ where: { location_id: id } });

        if (sale) {
            throw new Error('No se puede eliminar el local porque tiene ventas asociadas');
        }

        const deletedLocation = await prisma.location.delete({ where: { id } });

        revalidatePath('/dashboard/parametrization/locations');

        return {
            code: 200,
            message: 'Borrado correctamente',
            data: [deletedLocation]
        }
    } catch (error) {
        console.error("🚀 ~ deleteLocation ~ error:", error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al eliminar el local',
                data: null
            }
        }
    }
}

interface UpdateLocationParams {
    id: number;
    name: string;
    address: string;
    description?: string;
    active: boolean;
}

export const updateLocation = async ({ id, name, address, description, active }: UpdateLocationParams): Promise<LocationResponse> => {
    try {

        if (!name || !address) {
            throw new Error('El nombre y la dirección son obligatorios');
        }

        const location = await prisma.location.update({
            where: { id },
            data: { name, address, description, active }
        });

        revalidatePath('/dashboard/parametrization/locations');

        return {
            code: 200,
            message: 'Actualizado correctamente',
            data: [location]
        }
    } catch (error) {
        console.error('🚀 ~ updateLocation ~ error', error);

        if (error instanceof Error) {
            return {
                code: 400,
                message: error.message,
                data: null
            }
        } else {
            return {
                code: 500,
                message: 'Hubo un error al actualizar el local',
                data: null
            }
        }
    }
}
