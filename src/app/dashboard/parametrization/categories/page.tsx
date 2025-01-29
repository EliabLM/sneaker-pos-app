export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TableHeader from '@/components/ui/table-header';

import { DataTable } from '../shared/data-table';
import { columns } from './components/columns';
import CreateCategoryForm from './components/create-category-form';
import { getCategories } from './category-actions';

export const metadata = {
  title: 'Categorías',
  description: 'Administra todas tus categorías existentes o agrega una nueva',
};

const CategoryPage = async () => {
  const categoriesResponse = await getCategories();

  return (
    <div className='p-2'>
      <TableHeader
        title='Categorías'
        subtitle='Administra todas tus categorías existentes o agrega una nueva'
      >
        <CreateCategoryForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={categoriesResponse.data || []} />
      </div>
    </div>
  );
};

export default CategoryPage;
