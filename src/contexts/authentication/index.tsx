import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useEffect,
  useContext,
} from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import {
  getAccessToken,
  loginWithUserNameAndPassword,
  logout,
  refreshAccessToken,
} from '../../api/services/auth';
import {
  clear,
  getObject,
  getValue,
  saveObject,
  saveValue,
} from '../../storage';
import { StorageKeyEnum } from '../../storage/storageKeys';
import { NivelAcesso } from '../../types/authentication';
import { AccessTokenResponse } from '../../types/responses';
import * as Jwt from '../../utils/jwt';

export interface UseAuthentication {
  signIn: (code: string, codeVerifier?: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
  signOut: () => Promise<void>;
  hasAccessPermission: (requiredRoles: NivelAcesso[]) => boolean;
  getUser: (accessToken: string) => SessionUser | undefined;
  signInAsync: (userName: string, password: string) => Promise<void>;
  user: SessionUser | null;
  loading: boolean;
  authenticated: boolean;
  ready: boolean;
}

interface AccessTokenPayload extends JwtPayload {
  name: string;
  email: string;
  roles?: NivelAcesso[];
}

interface SessionUser {
  name: string;
  email: string;
  roles?: NivelAcesso[];
}

const AuthenticationContainer = createContext<UseAuthentication>(
  {} as UseAuthentication
);

// Hook para acessar o contexto de autenticação
// Facilita a utilização do contexto em diversos locais
export const useAuthentication = (): UseAuthentication =>
  useContext(AuthenticationContainer);

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [error, setError] = useState<string>();

  const queryClient = useQueryClient();

  const setGenericError = () =>
    setError(
      'Ocorreu um erro realizar o login, por favor tente novamente em alguns segundos.'
    );

  // Função para recuperar o usuário do localStorage
  async function getUserFromStorage() {
    const userFromStorage = await getObject<SessionUser>(StorageKeyEnum.User);
    setUser(userFromStorage || null);
  }

  // Função para verificar se o token de acesso expirou
  async function verifyTokenExpiration() {
    const accessToken = await getValue(StorageKeyEnum.AccessToken);

    if (!accessToken) return;

    const tokenExpired = Jwt.isExpired(accessToken);

    if (tokenExpired) clearState();
  }

  // Função para inicializar o contexto de autenticação na renderização do componente
  useEffect(() => {
    // Função para inicializar o contexto
    async function initContext() {
      setLoading(true);

      try {
        await getUserFromStorage();
        await verifyTokenExpiration();
      } finally {
        setLoading(false);
        setReady(true);
      }
    }
    // Chama a função de inicialização do contexto que está dentro do useEffect
    initContext();
  }, []);

  // Função para recuperar os dados do usuário a partir do token de acesso
  const getUser = (accessToken: string): SessionUser | undefined => {
    const decodedJwt = jwtDecode<AccessTokenPayload>(accessToken);

    if (!decodedJwt) return undefined;

    // Exemplo de recuperação de dados do usuário a partir do token
    return {
      name: decodedJwt.name,
      email: decodedJwt.email,
    };
  };

  // Função para tratar a resposta do token de acesso
  const handleTokenResponse = useCallback(
    async (response: AccessTokenResponse | undefined) => {
      if (!response) return false;

      const newUser = getUser(response.access_token);
      if (!newUser) return false;

      await saveState(newUser, response.access_token, response.refresh_token);

      return true;
    },
    []
  );

  // Função para realizar o login a partir do código de autorização
  const signIn = useCallback(
    async (code: string, codeVerifier?: string) => {
      setLoading(true);

      try {
        const response = await getAccessToken(code, codeVerifier);

        return await handleTokenResponse(response);
      } catch {
        clearState();

        return false;
      } finally {
        setLoading(false);
      }
    },
    [handleTokenResponse]
  );

  // Função para realizar o login a partir do usuário e senha
  const signInAsync = useCallback(
    async (userName: string, password: string) => {
      try {
        const loginRequest = await loginWithUserNameAndPassword(
          userName,
          password
        );

        const { code, codeVerifier } = loginRequest.data;
        const success = await signIn(code, codeVerifier);

        if (!success) {
          setGenericError();
          return;
        }

        // TODO Salvar dados do usuário
      } catch {
        setGenericError();
      }
    },
    [error, signIn]
  );

  // Função para renovar o token de acesso
  const refreshToken = useCallback(async () => {
    setLoading(true);

    try {
      const refreshTokenValue = await getValue(StorageKeyEnum.RefreshToken);

      if (!refreshTokenValue) {
        throw new Error('Does not contain refresh token');
      }

      const response = await refreshAccessToken(refreshTokenValue);

      await handleTokenResponse(response);
    } catch (error) {
      clearState();

      throw error;
    } finally {
      setLoading(false);
    }
  }, [handleTokenResponse]);

  // Função para salvar os dados do usuário no localStorage
  const saveState = async (
    newUser: SessionUser,
    accessToken: string,
    refreshToken: string
  ) => {
    await saveObject(StorageKeyEnum.User, newUser);
    await saveValue(StorageKeyEnum.AccessToken, accessToken);
    await saveValue(StorageKeyEnum.RefreshToken, refreshToken);
    setUser(newUser);
  };

  // Função para limpar os dados do usuário do localStorage
  const clearState = () => {
    setUser(null);
    clear(StorageKeyEnum.User);
    clear(StorageKeyEnum.RefreshToken);
    clear(StorageKeyEnum.AccessToken);
  };

  // Função para realizar o logout
  const signOut = useCallback(async () => {
    try {
      const refreshTokenValue = await getValue(StorageKeyEnum.RefreshToken);

      if (refreshTokenValue) await logout(refreshTokenValue);

      queryClient.removeQueries({
        queryKey: 'getConfigurations',
      });
    } finally {
      clearState();
    }
  }, [queryClient]);

  // Função para verificar se o usuário está autenticado
  const authenticated = useMemo(() => user !== null, [user]);

  // Função para verificar se o usuário tem permissão de acesso
  const hasAccessPermission = (requiredRoles: NivelAcesso[]) => {
    console.log(requiredRoles);
    // return requiredRoles.some((role) => user?.roles?.includes(role));
    return true;
  };

  // Retorna o contexto de autenticação
  return (
    <AuthenticationContainer.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        refreshToken,
        authenticated,
        ready,
        hasAccessPermission,
        getUser,
        signInAsync,
      }}
    >
      {children}
    </AuthenticationContainer.Provider>
  );
};
