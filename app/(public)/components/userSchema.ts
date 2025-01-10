import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email('Email must be valid'),
  password: z.string().min(6).max(100),
  password2: z
    .string()
    .min(8, 'Password length must contain at least 8 characters')
    .max(100),
});

export const loginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(6).max(100),
});
