import React from 'react';
import { FiUsers } from 'react-icons/fi';
import {
  NavbarContainer,
  MenuItems,
  MenuItem,
  ContentContainer,
  Icon,
} from './styles';

interface NavbarProps {
  children?: React.ReactNode;
}

const TopNavbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <>
      <NavbarContainer>
        <Icon>
          <FiUsers />
        </Icon>
        <MenuItems>
          <MenuItem href="/home">Home</MenuItem>
          <MenuItem href="/services">Services</MenuItem>
          <MenuItem href="/about">About</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
        </MenuItems>
      </NavbarContainer>
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default TopNavbar;
