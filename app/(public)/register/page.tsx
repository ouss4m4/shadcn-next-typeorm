import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '../components/register-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function Register() {
  return (
    <>
      <div className="center flex h-screen items-center justify-center">
        <div className="p-8">
          <div className="mb-2 flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password
            </p>
          </div>
          <RegisterForm />
          <p className="mt-2 px-8 text-center text-sm text-muted-foreground">
            Already have an account?&nbsp;
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login here
            </Link>
          </p>
          <p className="mt-2 px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our &nbsp;
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
            &nbsp; and &nbsp;
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
