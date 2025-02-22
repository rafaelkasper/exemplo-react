import React from 'react';
import { FiUsers } from 'react-icons/fi';

import { useAuthentication } from '@/contexts';

import { menu } from '../Navigation';
import {
  NavbarContainer,
  MenuItems,
  MenuItem,
  ContentContainer,
  IconContainer,
} from './styles';

interface NavbarProps {
  children?: React.ReactNode;
}

const TopNavbar: React.FC<NavbarProps> = ({ children }) => {
  const { user, hasAccessPermission } = useAuthentication();

  console.log(user);

  return (
    <>
      <NavbarContainer>
        <IconContainer>
          <FiUsers />
        </IconContainer>
        <MenuItems>
          {menu.map((item) => {
            if (
              !item.roles ||
              (item.roles && /*user?.roles &&*/ hasAccessPermission(item.roles))
            ) {
              const Icon = item.icone;
              return (
                <MenuItem href={item.url} key={item.url}>
                  <IconContainer>
                    {Icon && <Icon />}
                    {item.nome}
                  </IconContainer>
                </MenuItem>
              );
            }
            return null;
          })}
        </MenuItems>
      </NavbarContainer>
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default TopNavbar;
