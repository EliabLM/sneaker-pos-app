'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import numeral from 'numeral';
import { Product } from '@prisma/client';

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from '@/hooks/use-toast';
import { useGetCategoriesQuery, useGetMarcasQuery } from '@/redux/api';
import { BrandResponse } from '@/app/dashboard/parametrization/brands/brand-actions';
import { CategoryResponse } from '@/app/dashboard/parametrization/categories/category-actions';
import { unformat } from '@/utils/unformat';

import { createProduct, updateProduct } from '../product-actions';

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
  brand: yup.string().required('La marca es obligatoria'),
  category: yup.string().default(''),
  image: yup.string().default(''),
  stock: yup
    .number()
    .required('El stock es obligatorio')
    .typeError('El stock es obligatorio')
    .default(0)
    .min(0, 'El stock debe ser mayor o igual a 0')
    .integer('El stock debe ser un número entero'),
  price: yup.number().default(0).min(0, 'El precio debe ser mayor o igual a 0'),
  // price: yup.string().default('0').test('is-valid-currency', 'El precio debe ser un número válido', (value) => {
  //   if (!value) return true;
  //   const numberValue = parseFloat(value);
  //   return !isNaN(numberValue);
  // }),
  active: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof FormSchema>;

interface Props {
  product?: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditForm = ({ product, setOpen }: Props) => {
  console.log('🚀 ~ CreateEditForm ~ product:', product);
  const { data: brandsRes } = useGetMarcasQuery(true);
  const { data: categoriesRes } = useGetCategoriesQuery(true);

  const brands = brandsRes as BrandResponse;
  const categories = categoriesRes as CategoryResponse;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      active: product?.active,
      stock: product?.stock || 0,
      price: Number(product?.price) || 0,
      brand: product?.brand_id.toString() || '',
      category: product?.category_id?.toString() || '',
      image: product?.image ?? undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log('🚀 ~ onSubmit ~ data:', data);

      const body = {
        name: data.name,
        description: data.description,
        image: undefined,
        stock: data.stock,
        price: data.price,
        brand_id: Number(data.brand),
        category_id: data.category ? Number(data.category) : undefined,
        active: data.active,
      };
      console.log('🚀 ~ onSubmit ~ body:', body);

      let response;
      if (product) {
        response = await updateProduct(body, product.id);
      } else {
        response = await createProduct(body);
      }
      console.log('🚀 ~ onSubmit ~ response:', response);

      if (response.code !== 200) {
        toast({
          title: product
            ? 'Error actualizando el producto'
            : 'Error al crear el producto',
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
          <div className='col-span-2'>
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
                      placeholder='Nike'
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una marca' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.data?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una categoría' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Stock</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder='0'
                    type='number'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Precio</FormLabel>
                  <FormControl>
                    <Input
                      // TODO: Validar este formato
                      {...field}
                      id={field.name}
                      placeholder='$0.00'
                      type='text'
                      value={field.value}
                      onChange={(e) => {
                        const rawValue = unformat(e.target.value);
                        field.onChange(rawValue);
                      }}
                      onBlur={(e) => {
                        const rawValue = unformat(e.target.value);
                        field.onChange(rawValue);
                        e.target.value = numeral(rawValue).format('$0,0');
                      }}
                      onFocus={(e) => {
                        const rawValue = unformat(e.target.value);
                        e.target.value = rawValue.toString();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className='col-span-2'>
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
          </div>

          {product && (
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
