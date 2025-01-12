'use client';

import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { PaymentMethod } from '@prisma/client';

import Actions from './column-actions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const myCustomFilterFn: FilterFn<PaymentMethod> = (
  row: Row<PaymentMethod>,
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

export const columns: ColumnDef<PaymentMethod>[] = [
  {
    accessorKey: 'id',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
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
      const paymentMethod = row.original;
      return <Actions paymentMethod={paymentMethod} />;
    },
  },
];
