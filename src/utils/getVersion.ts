import packageJson from '../../package.json';

export const getVersionName = (): string => {
  return packageJson.version;
};
