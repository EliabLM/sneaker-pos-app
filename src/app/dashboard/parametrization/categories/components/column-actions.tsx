'use client';

import { useState } from 'react';
import { Loader2, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Category } from '@prisma/client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/redux';
import { api } from '@/redux/api';

import { deleteCategory } from '../category-actions';
import CreateEditForm from './create-edit-form';

const Actions = ({ category }: { category: Category }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await deleteCategory(category.id);

      dispatch(api.util.invalidateTags(['Category']));

      if (response.code !== 200) {
        toast({
          title: 'Error al eliminar la categoría',
          description: response.message,
          variant: 'destructive',
        });

        return;
      }

      setIsDeleteOpen(false);

      toast({
        title: 'Categoría eliminada',
        description: 'La categoría ha sido eliminada correctamente',
        variant: 'default',
      });
    } catch (error) {
      console.error('🚀 ~ onDelete ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ResponsiveDialog
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title='Eliminar categoría'
        description='¿Estás seguro de que quieres eliminar esta categoría?'
      >
        <div className='flex justify-between lg:justify-end gap-2 p-2'>
          <Button
            className='w-full sm:w-auto'
            onClick={() => setIsDeleteOpen(false)}
            variant={'secondary'}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            className='w-full sm:w-auto'
            onClick={onDelete}
            variant='destructive'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='animate-spin' /> Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        open={isEditOpen}
        setOpen={setIsEditOpen}
        title='Editar categoría'
        description='Da click en guardar cuando hayas terminado.'
      >
        <CreateEditForm setOpen={setIsEditOpen} category={category} />
      </ResponsiveDialog>

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();

              setMenuOpen(false);
              setIsEditOpen(true);
            }}
          >
            <SquarePen /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();

              setMenuOpen(false);
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
