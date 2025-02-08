import TableHeader from '@/components/ui/table-header';

import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import CreateProductForm from './components/create-user-form';
import { getAllUsers } from './user-actions';

const ProductsPage = async () => {
  const usersResponse = await getAllUsers();

  return (
    <div className='p-2'>
      <TableHeader
        title='Usuarios'
        subtitle='Administra todos tus usuarios o agrega uno nuevo'
      >
        <CreateProductForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={usersResponse.data || []} />
      </div>
    </div>
  );
};

export default ProductsPage;
