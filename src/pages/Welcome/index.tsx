// import { useGetReposGithub, useSaveTodo } from '@/api';
import { Container, Subtitle, Title } from './styles';

const WelcomeScreen = () => {
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

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Subtitle>Estamos felizes em tê-lo aqui.</Subtitle>
    </Container>
  );
};

export default WelcomeScreen;
