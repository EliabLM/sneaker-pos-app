import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getBrands } from '@/app/dashboard/parametrization/brands/brand-actions';
import { getCategories } from '@/app/dashboard/parametrization/categories/category-actions';

// BaseQuery personalizado para llamar a server actions
const serverActionBaseQuery: BaseQueryFn<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { action: (...args: any[]) => Promise<any>; args?: any[] },
    unknown,
    unknown
> = async ({ action, args }) => {
    try {
        const data = await action(...(args || []));
        return { data };
    } catch (error) {
        return { error };
    }
};

// Configurar RTK Query para usar server actions
export const api = createApi({
    reducerPath: 'api',
    baseQuery: serverActionBaseQuery,
    tagTypes: ['Brand', 'Category'],
    endpoints: () => ({})
});

const brandEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getMarcas: builder.query({
            query: (active) => ({ action: () => getBrands(active) }),
            providesTags: ['Brand'],
        }),
    }),
    overrideExisting: false
});

const categoryEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (active) => ({ action: () => getCategories(active) }),
            providesTags: ['Category'],
        })
    }),
    overrideExisting: false
});

export const { useGetMarcasQuery } = brandEndpoints;
export const { useGetCategoriesQuery } = categoryEndpoints;
