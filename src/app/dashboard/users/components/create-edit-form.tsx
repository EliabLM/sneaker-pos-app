'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { User } from '@prisma/client';

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from '@/hooks/use-toast';

import { createUser, updateUser } from '../user-actions';

const FormSchema = yup.object().shape({
  code: yup
    .string()
    .required('El código es obligatorio')
    .matches(
      /^[A-Z0-9]{6}$/,
      'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
    )
    .trim(),
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'Puede ingresar máximo 50 caracteres')
    .matches(
      /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s']+$/, // Solo letras, espacios y apóstrofes
      'El nombre solo puede contener letras y espacios'
    )
    .test(
      'no-double-spaces',
      'No se permiten múltiples espacios seguidos',
      (value) => !/\s{2,}/.test(value) // Rechaza múltiples espacios
    )
    .trim(),
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('El email no es válido')
    .max(80, 'El email debe tener máximo 80 caracteres')
    .trim(),
  image: yup.string().default(''),
  role: yup
    .string()
    .oneOf(['SELLER', 'ADMIN'])
    .required('El rol es obligatorio'),
  active: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof FormSchema>;

interface Props {
  user?: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditForm = ({ user, setOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      code: user?.code || '',
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'SELLER',
      image: user?.image ?? undefined,
      active: user?.active,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log('🚀 ~ onSubmit ~ data:', data);

      const body = {
        code: data.code,
        name: data.name,
        email: data.email,
        image: undefined,
        role: data.role,
        active: data.active,
      };
      console.log('🚀 ~ onSubmit ~ body:', body);

      let response;
      if (user) {
        response = await updateUser(body, user.id);
      } else {
        response = await createUser(body);
      }
      console.log('🚀 ~ onSubmit ~ response:', response);

      if (response.code !== 200) {
        toast({
          title: user
            ? 'Error actualizando el usuario'
            : 'Error al crear el usuario',
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
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Código</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                    id={field.name}
                    placeholder='ABC123'
                    required
                    maxLength={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder='Nombre...'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder='correo@ejemplo.com'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de usuario</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un tipo de usuario' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['SELLER', 'ADMIN'].map((role) => (
                      <SelectItem key={role} value={role}>
                        {role === 'SELLER' ? 'Vendedor' : 'Administrador'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {user && (
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
        </div>

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
