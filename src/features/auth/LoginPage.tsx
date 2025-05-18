'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/app/auth/actions';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form } from '@/commons/components/ui/form';
import { Input } from '@/commons/components/ui/input';
import { Auth } from '@/types/swagger/AuthRoute';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const LoginPage = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Auth.Login.RequestBody> = async data => {
    return startTransition(() => {
      setError(null);
      login(data).then(res => {
        if (!res.ok) {
          setError('Invalid email or password');
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full">
      {isPending ? <PageTopLoader /> : null}
      <div className="bg-white rounded-xl p-8 shadow-md text-center max-w-[520px]">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <div className="text-sm text-muted-foreground mt-2 mb-6">
          Sign in to continue providing care and managing patient journeys.
          Together, we make a difference.
        </div>
        <Form {...form}>
          {error ? (
            <div className="text-danger text-sm mb-4">{error}</div>
          ) : null}
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldWrapper control={form.control} label="Email" name="email">
              <Input placeholder="Email" />
            </FieldWrapper>
            <FieldWrapper
              control={form.control}
              label="Password"
              name="password"
            >
              <Input type="password" placeholder="Password" />
            </FieldWrapper>
            <Button className="w-full" type="submit">
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
