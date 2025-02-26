import { IconType } from 'react-icons';
import { FiHome, FiMail, FiUser, FiUsers } from 'react-icons/fi';

import { NivelAcesso } from '@/types';

export interface MainMenuItem {
  nome: string;
  url: string;
  roles?: NivelAcesso[];
  icone?: IconType;
  queryParams?: string | null;
  routes?: MainMenuItem[];
}

// Array com os itens do menu principal da aplicação
export const menu: MainMenuItem[] = [
  {
    nome: 'Home',
    url: '/',
    roles: ['administrador'],
    icone: FiHome,
    queryParams: null,
  },
  {
    nome: 'Services',
    url: '/services',
    roles: ['administrador'],
    icone: FiUsers,
    queryParams: null,
    routes: [
      {
        nome: 'Pagamentos',
        url: '/pagamentos',
        icone: FiHome,
      },
    ],
  },
  {
    nome: 'About',
    url: '/about',
    roles: ['administrador'],
    icone: FiUser,
    queryParams: null,
  },
  {
    nome: 'Contact',
    url: '/contact',
    roles: ['administrador'],
    icone: FiMail,
    queryParams: null,
  },
];
