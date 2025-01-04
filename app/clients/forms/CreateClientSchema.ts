import { z } from 'zod';

export const ClientTypeMapping = {
  Publisher: 1,
  Advertiser: 2,
} as const;

export const ClientType = z
  .union([z.literal('Publisher'), z.literal('Advertiser')])
  .transform((type) => ClientTypeMapping[type]);
export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: ClientType,
  address: z.string().min(1, 'Address is required'),
  contactMail: z.string().email('Invalid email address'),
  financeMail: z.string().email('Invalid finance email address').nullable(),
  isActive: z.boolean(),
});
