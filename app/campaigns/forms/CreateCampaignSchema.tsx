import { z } from 'zod';

export const createCampaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  advertiserId: z.number().int().positive('Invalid Advertiser Id'),
  landerId: z.number().int().positive('Invalid Lander Id'),
  countries: z
    .array(z.number().int().positive())
    .nonempty('At least one country is required'),
  isActive: z.boolean(),
});
