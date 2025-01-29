'use client';

import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Category, Product } from '@prisma/client';
import numeral from 'numeral';

// import Actions from './column-actions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Actions from './column-actions';
// import { Checkbox } from '@/components/ui/checkbox';

const customStockBadge = (stock: number) => {
  if (stock <= 35) {
    return (
      <div className='inline-block w-4 h-4 mr-2 bg-red-700 rounded-full'></div>
    );
  }

  if (stock <= 45) {
    return (
      <div className='inline-block w-4 h-4 mr-2 bg-orange-400 rounded-full'></div>
    );
  }

  return (
    <div className='inline-block w-4 h-4 mr-2 bg-green-500 rounded-full'></div>
  );
};

const myCustomFilterFn: FilterFn<Product> = (
  row: Row<Product>,
  columnId: string,
  filterValue: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();
  const filterParts = filterValue.split(' ');
  const rowValues = `${row.original.id} ${row.original.name}`.toLowerCase();

  return filterParts.every((filterPart) => {
    return rowValues.includes(filterPart);
  });
};

const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === 'asc') {
    return <ChevronDown className='ml-2 h-4 w-4' />;
  }

  if (isSorted === 'desc') {
    return <ChevronDown className='ml-2 h-4 w-4 rotate-180' />;
  }

  return null;
};

export const columns: ColumnDef<Product>[] = [
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label='Select row'
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: 'name',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Producto
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string;

      return (
        <span className='flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          <Image
            src={'/sneaker-layout.jpg'}
            className='w-auto h-12 mr-3'
            alt={name}
            width={50}
            height={50}
          />
          {name}
        </span>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => {
      const category = row.getValue('category') as Category;
      return category ? (
        <Badge variant={'secondary'}>{category?.name}</Badge>
      ) : null;
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stock
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number;
      return (
        <div className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          <div className='flex items-center'>
            {customStockBadge(stock)}
            {stock}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Precio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      const formattedPrice = numeral(price).format('$0,0');
      return (
        <span className='font-medium text-gray-900 dark:text-white'>
          {formattedPrice}
        </span>
      );
    },
  },
  {
    accessorKey: 'active',
    header: 'Estado',
    cell: ({ row }) => {
      const active = row.getValue('active');

      return (
        <Badge variant={active ? 'success' : 'secondary'}>
          {active ? 'Activo' : 'Inactivo'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return <Actions product={product} />;
    },
  },
];
