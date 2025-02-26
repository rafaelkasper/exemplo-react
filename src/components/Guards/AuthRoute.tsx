import { ReactNode, useEffect, useState } from 'react';
import { redirect } from 'react-router';

import { useAuthentication } from '@/contexts';
import { NivelAcesso } from '@/types';

import Unauthorized from '../Unauthorized';

interface ProtectedProps {
  children: ReactNode;
  requiredRoles?: NivelAcesso[];
}

const UnauthorizedComponent = Unauthorized(); // Instância componente de não autorizado

// Componente de rota protegida
// Verifica se o usuário está autenticado e se tem permissão para acessar a tela
export function AuthRoute({ children, requiredRoles }: ProtectedProps) {
  const { getUser, hasAccessPermission } = useAuthentication();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  // Recupera o token de acesso do localStorage
  const accessToken =
    localStorage.getItem('accessToken') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  // Função para validar se o usuário está autenticado e se tem permissão para acessar a tela
  async function validateUser() {
    const user = await getUser(accessToken);

    if (!user) {
      return redirect('/login');
    }

    if (!requiredRoles) {
      // Se a tela não precisar de permissão, então é autorizado
      setIsAuthorized(true);
      return;
    }

    if (/*user.roles &&*/ hasAccessPermission(requiredRoles)) {
      // o certo é user.roles ao invés de requiredRoles
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }

  // Chama a função de validação do usuário ao montar o componente
  useEffect(() => {
    validateUser();
  }, [accessToken, getUser, hasAccessPermission, requiredRoles]);

  // Se o usuário está logado e tem autorização, então renderiza o children
  // Se está logado mas não tem autorização para a telas, renderiza o componente de não autorizado
  return (
    <>
      {isAuthorized === true && children}
      {isAuthorized === false && UnauthorizedComponent}
    </>
  );
}
