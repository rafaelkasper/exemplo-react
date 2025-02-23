import { AuthenticationProvider } from './authentication';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
