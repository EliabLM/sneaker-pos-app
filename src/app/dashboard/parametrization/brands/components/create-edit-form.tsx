'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { toast } from '@/hooks/use-toast';
import { Brand } from '@/interfaces';

import { createBrand, updateBrand } from '../brand-actions';

const FormSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio').trim(),
  active: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof FormSchema>;

interface Props {
  brand?: Brand;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditForm = ({ brand, setOpen }: Props) => {
  const form = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: brand?.name || '',
      active: brand?.active,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      let response;
      if (brand) {
        response = await updateBrand(brand.id, data.name, data.active);
      } else {
        response = await createBrand(data.name);
      }

      if (response.code !== 200) {
        toast({
          title: brand
            ? 'Error actualizando la marca'
            : 'Error al crear la marca',
          description: response.message,
          variant: 'destructive',
        });

        return;
      }

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Nombre</FormLabel>
              <FormControl>
                <Input {...field} id={field.name} placeholder='Nike' required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {brand && (
          <FormField
            control={form.control}
            name='active'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2 mt-2'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className='text-base'>
                  {field.value ? 'Activo' : 'Inactivo'}
                </FormLabel>
              </FormItem>
            )}
          />
        )}

        <div className='flex justify-end gap-2 items-center mt-4'>
          <Button
            type='submit'
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <>
                <Loader2 className='animate-spin' /> Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEditForm;
