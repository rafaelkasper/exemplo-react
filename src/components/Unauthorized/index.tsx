import { Container, Heading, Message } from './styles';

// Componente simples para tela de não autorizado
const Unauthorized = () => {
  return (
    <Container>
      <Heading>Não autorizado</Heading>
      <Message>
        Seu usuário não tem autorização para acessar esta página
      </Message>
    </Container>
  );
};

export default Unauthorized;
