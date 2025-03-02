import { Container, Typography } from '@mui/material';

// Componente simples para tela de não autorizado
const Unauthorized = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh', // Ocupa toda a altura da tela
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2, // Espaçamento entre os elementos
      }}
    >
      {/* Título */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        Não autorizado
      </Typography>

      {/* Mensagem */}
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Seu usuário não tem autorização para acessar esta página.
      </Typography>
    </Container>
  );
};

export default Unauthorized;
