import { z } from 'zod';

const deviceSchema = z.object({
  id: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  name: z.enum(['Desktop', 'Mobile', 'Tablet']),
});

export const createCampaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  advertiserId: z.number().int().positive('Invalid Advertiser Id'),
  landerId: z.number().int().positive('Invalid Lander Id'),
  countries: z
    .array(z.number().int().positive())
    .nonempty('At least one country is required'),
  device: z.array(deviceSchema).nonempty('At least one device is required'),
  isActive: z.boolean(),
});
