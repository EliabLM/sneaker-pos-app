'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

import CreateEditForm from './create-edit-form';

const CreateProductForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Agregar nuevo producto
      </Button>
      <ResponsiveDialog
        open={open}
        setOpen={setOpen}
        title='Crear nuevo producto'
        description='Da click en guardar cuando hayas terminado.'
        width='640px'
      >
        <CreateEditForm setOpen={setOpen} />
      </ResponsiveDialog>
    </>
  );
};

export default CreateProductForm;
