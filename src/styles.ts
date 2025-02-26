import { createGlobalStyle } from 'styled-components';

// Define o estilo global da aplicação
// Aqui são definidas as fontes, tamanhos, cores e demais estilos que serão aplicados
// em toda a aplicação
// O tema é passado como propriedade para que as cores sejam dinâmicas
// de acordo com o tema escolhido
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Noto Sans", serif;
    font-size: 16px;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: ${({ theme }) => theme.palette.background.default};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;
