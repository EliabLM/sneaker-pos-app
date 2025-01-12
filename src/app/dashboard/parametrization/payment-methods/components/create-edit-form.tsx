'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PaymentMethod } from '@prisma/client';

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

import {
  createPaymentMethod,
  updatePaymentMethod,
} from '../payment-method-actions';

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .max(50, 'Puede ingresar máximo 50 caracteres')
    .trim(),
  active: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof FormSchema>;

interface Props {
  paymentMethod?: PaymentMethod;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditForm = ({ paymentMethod, setOpen }: Props) => {
  const form = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: paymentMethod?.name || '',
      active: paymentMethod?.active,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      let response;
      if (paymentMethod) {
        response = await updatePaymentMethod(
          paymentMethod.id,
          data.name,
          data.active
        );
      } else {
        response = await createPaymentMethod(data.name);
      }

      if (response.code !== 200) {
        toast({
          title: paymentMethod
            ? 'Error actualizando el método de pago'
            : 'Error al crear el método de pago',
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

        {paymentMethod && (
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
