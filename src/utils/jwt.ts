import { fromUnixTime, compareAsc } from 'date-fns';
import { JwtPayload, jwtDecode } from 'jwt-decode';

// Verifica se o token JWT está expirado
export const isExpired = (jwtToken: string): boolean => {
  const decodedJwt = jwtDecode<JwtPayload>(jwtToken);

  if (!decodedJwt || !decodedJwt.exp) return false;

  const expirationDate = fromUnixTime(decodedJwt.exp);
  const today = new Date();

  return compareAsc(today, expirationDate) > 0;
};
