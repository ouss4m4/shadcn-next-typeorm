'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import loading from '../loading';

export function UserAuthForm({ type }: { type: string }) {
  // const form = useForm<>()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formType: 'REGISTER' | 'LOGIN' =
    type == 'register' ? 'REGISTER' : 'LOGIN';
  async function onSubmit(event: React.SyntheticEvent) {
    console.log(formType);
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-y-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {formType == 'REGISTER' && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Confirm Password
              </Label>
              <Input
                id="password"
                placeholder="confirm password"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading
              ? 'Loading...'
              : formType == 'REGISTER'
                ? 'Create Account'
                : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}
