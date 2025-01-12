'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

import CreateEditForm from './create-edit-form';

const CreateCategoryForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Agregar nueva categoría
      </Button>
      <ResponsiveDialog
        open={open}
        setOpen={setOpen}
        title='Crear nueva categoría'
        description='Da click en guardar cuando hayas terminado.'
      >
        <CreateEditForm setOpen={setOpen} />
      </ResponsiveDialog>
    </>
  );
};

export default CreateCategoryForm;
