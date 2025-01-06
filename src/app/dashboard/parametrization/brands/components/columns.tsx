'use client';

import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Brand } from '@/interfaces';
import Actions from './column-actions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';

const myCustomFilterFn: FilterFn<Brand> = (
  row: Row<Brand>,
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

export const columns: ColumnDef<Brand>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      const brand = row.original;
      return <Actions brand={brand} />;
    },
  },
];
