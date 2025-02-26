import { AuthenticationProvider } from './authentication';

// Exporta o provedor de contexto da aplicação
// Ele é responsável por prover todos os contextos necessários para a aplicação
// e encapsular todos os provedores de contexto

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
