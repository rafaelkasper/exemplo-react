import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const LoginScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Verifica se a tela é pequena

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'} // Coluna em telas pequenas, linha em telas grandes
      component="main"
      sx={{ height: '100vh' }}
    >
      {/* Coluna da Esquerda: Informações da Empresa */}
      <Box
        sx={{
          width: isMobile ? '100%' : '50%', // Largura total em telas pequenas, metade em telas grandes
          height: isMobile ? '30vh' : '100vh', // Altura menor em telas pequenas
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper, // Cor de fundo
          color: 'white', // Cor do texto
          p: 4, // Padding interno
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Bem-vindo à Empresa XYZ
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Somos líderes em soluções inovadoras para o seu negócio.
        </Typography>
        <Typography variant="body2" align="center">
          Conecte-se conosco e descubra como podemos ajudar você a alcançar seus
          objetivos.
        </Typography>
      </Box>

      {/* Coluna da Direita: Formulário de Login */}
      <Box
        sx={{
          width: isMobile ? '100%' : '50%', // Largura total em telas pequenas, metade em telas grandes
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400, // Largura máxima do formulário
          }}
        >
          {/* Ícone de Cadeado (Centralizado) */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', // Centraliza horizontalmente
              mb: 2, // Margem inferior
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>

          {/* Título */}
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>

          {/* Formulário */}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            {/* Campo de E-mail */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {/* Campo de Senha */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {/* Botão de Login */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Entrar
            </Button>

            {/* Links Adicionais */}
            <Stack direction="row" justifyContent="space-between">
              <Link href="#" variant="body2">
                Esqueci minha senha
              </Link>
              <Link href="#" variant="body2">
                Criar uma conta
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
};

export default LoginScreen;
