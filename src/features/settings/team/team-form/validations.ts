import { z } from 'zod';

import { CreateInvitationRoleEnum } from '@/types/swagger/data-contracts';

export const teamInvitationSchema = z.object({
  email: z.string().email('Invalid email format'),
  role: z.nativeEnum(CreateInvitationRoleEnum),
});
