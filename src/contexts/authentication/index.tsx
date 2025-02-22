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

  useEffect(() => {
    async function getUserFromStorage() {
      const userFromStorage = await getObject<SessionUser>(StorageKeyEnum.User);
      setUser(userFromStorage || null);
    }

    async function verifyTokenExpiration() {
      const accessToken = await getValue(StorageKeyEnum.AccessToken);

      if (!accessToken) return;

      const tokenExpired = Jwt.isExpired(accessToken);

      if (tokenExpired) clearState();
    }

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

    initContext();
  }, []);

  const getUser = (accessToken: string): SessionUser | undefined => {
    const decodedJwt = jwtDecode<AccessTokenPayload>(accessToken);

    if (!decodedJwt) return undefined;

    return {
      name: decodedJwt.name,
      email: decodedJwt.email,
    };
  };

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

  const clearState = () => {
    setUser(null);
    clear(StorageKeyEnum.User);
    clear(StorageKeyEnum.RefreshToken);
    clear(StorageKeyEnum.AccessToken);
  };

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

  const authenticated = useMemo(() => user !== null, [user]);

  const hasAccessPermission = (requiredRoles: NivelAcesso[]) => {
    console.log(requiredRoles);
    // return requiredRoles.some((role) => user?.roles?.includes(role));
    return true;
  };

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
