import { z } from 'zod';

const deviceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const campaignSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  advertiserId: z.number().int().positive('Invalid Advertiser Id'),
  landerId: z.number().int().positive('Invalid Lander Id'),
  countries: z
    .array(z.number().int().positive())
    .nonempty('At least one country is required'),
  device: z.array(deviceSchema).nonempty('At least one device is required'),
  status: z.number().default(1),
});
