import { z } from 'zod';

export const createLanderSchema = z.object({
  name: z.string().min(5, 'Name is required'),
  url: z
    .string()
    .regex(
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      'URL must start with http:// or https:// and include a valid domain name with a TLD',
    ),
  clientId: z.number(),
  isActive: z.boolean(),
});
