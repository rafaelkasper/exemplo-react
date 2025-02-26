// Objetivo: Definir as chaves de armazenamento local.
export enum StorageKeyEnum {
  AccessToken = 'nomeAplicacao_accessToken',
  RefreshToken = 'nomeAplicacao_refreshToken',
  User = 'nomeAplicacao_user',
}

export type StorageKey = StorageKeyEnum | string;
