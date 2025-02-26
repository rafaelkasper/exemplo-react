import packageJson from '../../package.json';

// Retorna a versão do projeto
export const getVersionName = (): string => {
  return packageJson.version;
};
