'use server';

import prisma from "@/lib/db";
import { Brand } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Response {
  code: number;
  message: string;
  data: Brand | Brand[] | null
}

export const createBrand = async (name: string): Promise<Response> => {
  try {

    if (!name) {
      throw new Error('El nombre es obligatorio');
    }

    const brand = await prisma.brand.create({ data: { name } });

    revalidatePath('/dashboard/parametrization/brands');

    return {
      code: 200,
      message: 'Creado correctamente',
      data: brand
    }
  } catch (error) {
    console.error('🚀 ~ createBrand ~ error', error);

    if (error instanceof Error) {
      return {
        code: 400,
        message: error.message,
        data: null
      }
    } else {
      return {
        code: 500,
        message: 'Hubo un error al crear el marca',
        data: null
      }
    }
  }
};

export const deleteBrand = async (id: number): Promise<Response> => {
  try {

    const brand = await prisma.product.findFirst({ where: { brand_id: id } });

    if (brand) {
      throw new Error('No se puede eliminar la marca porque tiene productos asociados');
    }

    const deletedBrand = await prisma.brand.delete({ where: { id } });

    revalidatePath('/dashboard/parametrization/brands');

    return {
      code: 200,
      message: 'Borrado correctamente',
      data: deletedBrand
    }
  } catch (error) {
    console.error("🚀 ~ deleteBrand ~ error:", error);

    if (error instanceof Error) {
      return {
        code: 400,
        message: error.message,
        data: null
      }
    } else {
      return {
        code: 500,
        message: 'Hubo un error al eliminar la marca',
        data: null
      }
    }
  }
}

export const updateBrand = async (id: number, name: string, active: boolean): Promise<Response> => {
  try {

    if (!name) {
      throw new Error('El nombre es obligatorio');
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: { name, active }
    });

    revalidatePath('/dashboard/parametrization/brands');

    return {
      code: 200,
      message: 'Actualizado correctamente',
      data: brand
    }
  } catch (error) {
    console.error('🚀 ~ updateBrand ~ error', error);

    if (error instanceof Error) {
      return {
        code: 400,
        message: error.message,
        data: null
      }
    } else {
      return {
        code: 500,
        message: 'Hubo un error al actualizar la marca',
        data: null
      }
    }
  }
}
