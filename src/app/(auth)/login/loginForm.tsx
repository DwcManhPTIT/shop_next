'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { LoginBody } from '@/schemaValidations/auth.schema';
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

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginBody>>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginBody>) {
    try {
      const result = await authApiRequest.login(values);
      toast({
        title: 'Đăng nhập thành công',
      });
      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
      });

      router.push('/me');
    } catch (error: any) {
      const errors = error?.payload?.errors as {
        field: string;
        message: string;
      }[];
      console.log(errors);
      const status = error?.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as 'email' | 'password', {
            type: 'server',
            message: error.message,
          });
        });
      } else {
        toast({
          title: 'LỖi',
          description: error.payload.message,
          variant: 'destructive',
        });
      }
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
          name="email"
          render={({ field }) => (
            <FormItem className="mt-10">
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

        <Button className="!mt-5 w-full" type="submit">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
