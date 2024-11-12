import React from 'react';
import products from '@/data/products.json';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Product } from '@/interfaces';

async function fetchData() {
  return products;
}

const InventarioPage = async () => {
  const data: Product[] = await fetchData();

  return (
    <div>
      <div className='flex justify-between items-center gap-4 my-2'>
        <h1 className='text-2xl font-bold'>Inventario</h1>

        <div className='flex gap-4'>
          <Button variant='default'>Ingreso</Button>
          <Button variant='destructive'>Salida</Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default InventarioPage;
