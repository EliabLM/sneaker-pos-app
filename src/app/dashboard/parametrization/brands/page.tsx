export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TableHeader from '@/components/ui/table-header';

import { DataTable } from '../shared/data-table';
import { columns } from './components/columns';
import CreateBrandForm from './components/create-brand-form';
import { getBrands } from './brand-actions';

export const metadata = {
  title: 'Marcas',
  description: 'Administra todas tus marcas existentes o agrega una nueva',
};

const BrandPage = async () => {
  const brandsResponse = await getBrands();

  return (
    <div className='p-2'>
      <TableHeader
        title='Marcas'
        subtitle='Administra todas tus marcas existentes o agrega una nueva'
      >
        <CreateBrandForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={brandsResponse.data || []} />
      </div>
    </div>
  );
};

export default BrandPage;
