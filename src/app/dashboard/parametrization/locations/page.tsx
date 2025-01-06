'use client';

import React from 'react';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';

const LocationsPage = () => {
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className='p-2'>
      <Button onClick={() => setOpen(true)}>Abrir dialogo</Button>
      <ResponsiveDialog title='testing' open={open} setOpen={setOpen}>
        <div>hola</div>
      </ResponsiveDialog>

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='z-50'>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();

              setMenuOpen(false);
              setOpen(true);
            }}
          >
            <SquarePen /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Trash2 /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocationsPage;
