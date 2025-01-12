export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TableHeader from '@/components/ui/table-header';
import prisma from '@/lib/db';

import { DataTable } from '../shared/data-table';
import { columns } from './components/columns';
import CreateCategoryForm from './components/create-category-form';

export const metadata = {
  title: 'Categorías',
  description: 'Administra todas tus categorías existentes o agrega una nueva',
};

const CategoryPage = async () => {
  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });

  return (
    <div className='p-2'>
      <TableHeader
        title='Categorías'
        subtitle='Administra todas tus categorías existentes o agrega una nueva'
      >
        <CreateCategoryForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
