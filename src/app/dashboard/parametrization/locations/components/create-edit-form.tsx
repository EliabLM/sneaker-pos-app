'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Location } from '@prisma/client';

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
import { Textarea } from '@/components/ui/textarea';

import { toast } from '@/hooks/use-toast';
import { createLocation, updateLocation } from '../locations-actions';

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .max(50, 'Puede ingresar máximo 50 caracteres')
    .trim(),
  description: yup
    .string()
    .max(200, 'Puede ingresar máximo 200 caracteres')
    .trim(),
  address: yup.string().trim().required('La dirección es obligatoria'),
  active: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof FormSchema>;

interface Props {
  location?: Location;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditForm = ({ location, setOpen }: Props) => {
  const form = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: location?.name || '',
      active: location?.active,
      address: location?.address || '',
      description: location?.description || '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      let response;
      if (location) {
        const body = {
          id: location.id,
          name: data.name,
          address: data.address,
          description: data.description,
          active: data.active,
        };

        response = await updateLocation(body);
      } else {
        response = await createLocation(
          data.name,
          data.address,
          data.description
        );
      }

      if (response.code !== 200) {
        toast({
          title: location
            ? 'Error actualizando el local'
            : 'Error al crear el local',
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
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Dirección</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={field.name}
                  placeholder='Local #25'
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder='Descripción del local'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {location && (
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
