'use client';
// import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { sleep } from '@/utils/sleep';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  code: z
    .string({
      required_error: 'El código es obligatorio',
      invalid_type_error: 'El código debe ser un texto',
    })
    .regex(/^[A-Z0-9]{6}$/, {
      message:
        'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números',
    })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .trim(),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    console.table(data);

    await sleep(2);

    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <Card className='mx-auto w-80'>
      <CardHeader>
        <CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tu código de usuario para iniciar sesión.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Código</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                          placeholder='ABC123'
                          required
                          className='uppercase'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center'>
                        <FormLabel htmlFor={field.name}>Contraseña</FormLabel>
                        {/* <Link
                    href='#'
                    className='ml-auto inline-block text-sm underline'
                  >
                    Forgot your password?
                  </Link> */}
                      </div>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          id={field.name}
                          placeholder='Contraseña'
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading && <Loader2 className='animate-spin' />}
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
              <Button variant='outline' className='w-full'>
                Iniciar sesión con Google
              </Button>
            </div>
            {/* <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='#' className='underline'>
                Sign up
              </Link>
            </div> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
