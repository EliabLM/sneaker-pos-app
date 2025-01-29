import TableHeader from '@/components/ui/table-header';

import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import CreateProductForm from './components/create-product-form';
import { getAllProducts } from './product-actions';

const ProductsPage = async () => {
  const productsResponse = await getAllProducts();

  return (
    <div className='p-2'>
      <TableHeader
        title='Productos'
        subtitle='Administra todos tus productos o agrega uno nuevo'
      >
        <CreateProductForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={productsResponse.data || []} />
      </div>
    </div>
  );
};

export default ProductsPage;
