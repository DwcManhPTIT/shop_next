'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { RegisterBody } from '@/schemaValidations/auth.schema';
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
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { clientSessionToken } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
import { useState } from 'react';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterBody>>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const Router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterBody>) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.register(values);

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });
      toast({
        title: 'Đăng ki thành công',
      });
      Router.push('/me');
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
        })}
        className="space-y-2 max-w-[400px] w-full  flex-shink-0 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="Nhập username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-1000px">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập lại mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="!mt-5 w-full" type="submit">
          Đăng kí
        </Button>
      </form>
    </Form>
  );
}
