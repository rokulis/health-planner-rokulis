'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '@/app/auth/actions';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Form } from '@/commons/components/ui/form';
import { Input } from '@/commons/components/ui/input';
import { Auth } from '@/types/swagger/AuthRoute';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z.string().min(4),
    password_confirmation: z.string().min(4),
    invitation_token: z.string(),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Passwords must match',
    path: ['password_confirmation'],
  });

interface Props {
  token?: string;
  email?: string;
}

export const RegisterPage: React.FC<Props> = ({ token, email }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email,
      password: '',
      name: '',
      password_confirmation: '',
      invitation_token: token ?? '',
    },
  });

  const onSubmit: SubmitHandler<Auth.Register.RequestBody> = async data => {
    return startTransition(() => {
      setError(null);
      register(data).then(res => {
        if (!res.ok) {
          setError('Registration failed. Please try again.');
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full">
      {isPending ? <PageTopLoader /> : null}
      <div className="bg-white rounded-xl p-8 shadow-md text-center max-w-[520px]">
        <h1 className="text-3xl font-semibold">Join us today</h1>
        <div className="text-sm text-muted-foreground mt-2 mb-6">
          Sign up to access the tools and insights needed to deliver
          compassionate care and support cancer patients effectively.
        </div>
        <Form {...form}>
          {error ? (
            <div className="text-danger text-sm mb-4">{error}</div>
          ) : null}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="hidden"
              {...form.register('invitation_token')}
              value={token}
            />
            <FieldWrapper control={form.control} label="Name" name="name">
              <Input placeholder="Name" />
            </FieldWrapper>
            <FieldWrapper control={form.control} label="Email" name="email">
              <Input placeholder="Email" disabled={true} />
            </FieldWrapper>
            <FieldWrapper
              control={form.control}
              label="Password"
              name="password"
            >
              <Input type="password" placeholder="Password" />
            </FieldWrapper>
            <FieldWrapper
              control={form.control}
              label="Repeat password"
              name="password_confirmation"
            >
              <Input type="password" placeholder="Repeat password" />
            </FieldWrapper>
            <Button className="w-full" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
