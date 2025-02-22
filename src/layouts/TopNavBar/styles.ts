import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const Icon = styled.div`
  font-size: 3rem;
  color: #fff;
  transition: color 0.3s ease;
`;

export const MenuItems = styled.div`
  display: flex;
  gap: 24px;
`;

export const MenuItem = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #ff5811;
  }
`;

export const ContentContainer = styled.div``;
