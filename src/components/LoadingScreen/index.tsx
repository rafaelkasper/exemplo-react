import React from 'react';

import { CircularProgress, Box } from '@mui/material';

// Componente simples para tela de carregamento
export const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ocupa toda a altura da tela
        width: '100vw', // Ocupa toda a largura da tela
        backgroundColor: 'background.default', // Usa a cor de fundo do tema
      }}
    >
      <CircularProgress color="primary" /> {/* Spinner do Material-UI */}
    </Box>
  );
};
