import { redirect } from 'next/navigation';

import { validateInvitationToken } from '@/app/auth/actions';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Login(props: NextServerComponentProps) {
  const searchParams = await props.searchParams;
  const validation = await validateInvitationToken(
    searchParams.token as string
  );

  if (!validation.success) {
    return redirect('/auth/login?error=invalid-token');
  }

  if (!searchParams.token) {
    return redirect('/auth/login');
  }

  return <RegisterPage token={searchParams.token as string} />;
}
