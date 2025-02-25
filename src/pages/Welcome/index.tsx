import { useGetReposGithub } from '@/api/querys/example';
import { Container, Subtitle, Title } from './styles';
import { useSaveTodo } from '@/api/mutations/example';

const WelcomeScreen = () => {
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

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Subtitle>Estamos felizes em tê-lo aqui.</Subtitle>
    </Container>
  );
};

export default WelcomeScreen;
