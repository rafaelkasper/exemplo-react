export interface User {
  id_token: string;
  session_state?: string;
  access_token: string;
  refresh_token?: string;
  scope: string;
  profile: UserProfile;
  expires_at: number;
  expires_in: number;
  expired: boolean;
  scopes: string[];
}

export interface UserProfile {
  roles?: NivelAcesso[];
}

export type NivelAcesso = 'administrador' | 'user';
