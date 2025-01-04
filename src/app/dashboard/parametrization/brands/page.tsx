import { Plus } from 'lucide-react';

import TableHeader from '@/components/ui/table-header';
import prisma from '@/lib/db';

import { DataTable } from '../shared/data-table';
import { columns } from './columns';

const BrandPage = async () => {
  const brands = await prisma.brand.findMany({ orderBy: { id: 'asc' } });
  console.log('🚀 ~ BrandPage ~ brands:', brands);

  return (
    <div className='p-2'>
      <TableHeader
        title='Marcas'
        subtitle='Administra todas tus marcas existentes o agrega una nueva'
      >
        <button
          type='button'
          className='flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          <Plus />
          Agregar nueva marca
        </button>
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={brands} />
      </div>
    </div>
  );
};

export default BrandPage;
