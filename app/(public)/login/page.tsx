import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '../components/login-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function Login() {
  return (
    <>
      <div className="center flex h-screen items-center justify-center">
        <div className="p-8">
          <div className="mb-2 flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password
            </p>
          </div>
          <LoginForm />
          <p className="mt-2 px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? &nbsp;
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
