import { ReactNode, useEffect, useState } from 'react';
import { redirect } from 'react-router';

import { useAuthentication } from '@/contexts';
import { NivelAcesso } from '@/types';

import Unauthorized from '../Unauthorized';

interface ProtectedProps {
  children: ReactNode;
  requiredRoles?: NivelAcesso[];
}

const UnauthorizedComponent = Unauthorized();

export function AuthRoute({ children, requiredRoles }: ProtectedProps) {
  const { getUser, hasAccessPermission } = useAuthentication();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const accessToken =
    localStorage.getItem('accessToken') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  useEffect(() => {
    async function validateUser() {
      const user = await getUser(accessToken);

      if (!user) {
        return redirect('/login');
      }

      if (!requiredRoles) {
        setIsAuthorized(true);
        return;
      }

      if (/*user.roles &&*/ hasAccessPermission(requiredRoles)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }

    validateUser();
  }, [accessToken, getUser, hasAccessPermission, requiredRoles]);

  return (
    <>
      {isAuthorized === true && children}
      {isAuthorized === false && UnauthorizedComponent}
    </>
  );
}
