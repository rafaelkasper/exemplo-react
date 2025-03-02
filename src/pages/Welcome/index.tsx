// import { useGetReposGithub, useSaveTodo } from '@/api';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import {
  Container,
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const WelcomeScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena
  /*
  const { mutateAsync: saveTodoAsync, isPending: isPendindSaveTodo } =
    useSaveTodo({
      onError: (data) => {
        console.log(data);
      },
    });

  const {
    data,
    isLoading,
    refetch: refetchRepos,
  } = useGetReposGithub({ enabled: false });


  saveTodoAsync({ id: 123, content: 'abc' });
  console.log(data);
  refetchRepos();

  if (isLoading || isPendindSaveTodo) {
    console.log('carregando');
  }
  
  useEffect(() => {
    console.log('data');
  }, [data]); 
  */

  // Componente de tela de boas-vindas
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 4,
      }}
    >
      {/* Ilustração ou ícone */}
      <Box
        sx={{
          fontSize: isMobile ? '4rem' : '6rem', // Tamanho do ícone responsivo
          color: theme.palette.primary.main, // Cor do ícone
        }}
      >
        <EmojiPeopleIcon fontSize="inherit" />
      </Box>

      {/* Título */}
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
        Bem-vindo ao Nosso Sistema!
      </Typography>

      {/* Mensagem de boas-vindas */}
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Estamos muito felizes em tê-lo aqui. Comece agora mesmo a explorar todas
        as funcionalidades que preparamos para você.
      </Typography>

      {/* Botão de ação */}
      <Button
        variant="contained"
        size="large"
        onClick={() => console.log('Começar agora')}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        Começar Agora
      </Button>
    </Container>
  );
};

export default WelcomeScreen;
