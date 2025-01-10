import { ClientType } from '../../shared/types';
import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(ClientType),
  address: z.string().min(1, 'Address is required'),
  contactMail: z.string().email('Invalid email address'),
  financeMail: z.string().email('Invalid finance email address').optional(),
  isActive: z.boolean(),
});
