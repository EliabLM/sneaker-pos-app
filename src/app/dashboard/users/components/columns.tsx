'use client';

import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { User } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Actions from './column-actions';

const myCustomFilterFn: FilterFn<User> = (
  row: Row<User>,
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'name',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string;

      return (
        <span className='flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          <Image
            src={'/user.png'}
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
    accessorKey: 'email',
    header: 'Correo electrónico',
  },
  {
    accessorKey: 'role',
    header: 'Tipo de usuario',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;

      return (
        <span className='flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          {role === 'SELLER' ? 'Vendedor' : 'Administrador'}
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
      const user = row.original;
      return <Actions user={user} />;
    },
  },
];
