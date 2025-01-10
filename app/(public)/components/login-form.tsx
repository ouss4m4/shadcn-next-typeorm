'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from './userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { LoginAction } from '@/app/server/actions/auth/loginAction';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await LoginAction(values);
    if (response?.error) {
      setError(
        'root',
        response.message
          ? { message: response.message }
          : { message: 'Error logging in' },
      );
    } else {
      localStorage.setItem('name', response?.name ?? 'John');
      localStorage.setItem('jwt', response?.jwt ?? '');
      redirect('/');
    }
  }

  return (
    <div className="grid gap-6">
      {errors.root && (
        <span className="text-red-500">{errors.root.message}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              {...register('password')} // Fixed the name
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}
