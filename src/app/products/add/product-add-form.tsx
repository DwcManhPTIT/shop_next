'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

import { useToast } from '@/components/ui/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { error } from 'console';
import envConfig from '@/config';

import authApiRequest from '@/apiRequest/auth';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { useState } from 'react';
import {
  CreateProductBody,
  CreateProductBodyType,
} from '@/schemaValidations/product.schema';
import productApiRequest from '@/apiRequest/product';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
const ProductAddForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateProductBodyType) {
    console.log(values);
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      const upLoadImageResult = await productApiRequest.uploadImage(formData);
      const imageUrl = upLoadImageResult.payload.data;
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl,
      });

      toast({
        description: result.payload.message,
      });

      router.push('/products');
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
          console.log(form.getValues('image'));
        })}
        className="space-y-2 max-w-[400px] w-full  flex-shink-0 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-10">
              <FormLabel>Ten</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Ten" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="mt-10">
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Giá" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-10">
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mt-10">
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  onClick={(e: any) => (e.target.value = null)}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange('http://localhost:3000/' + file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <div>
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              alt="preview"
              className="w-32 h-32 object-cover"
            />
            <Button
              type="button"
              variant={'destructive'}
              size={'sm'}
              onClick={() => {
                setFile(null);
                form.setValue('image', '');
              }}
            >
              Xoa hình ảnh
            </Button>
          </div>
        )}

        <Button className="!mt-5 w-full" type="submit">
          Thêm sản phẩm
        </Button>
      </form>
    </Form>
  );
};
export default ProductAddForm;
