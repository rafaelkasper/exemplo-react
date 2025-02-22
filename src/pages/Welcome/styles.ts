import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-top: 10px;
`;
