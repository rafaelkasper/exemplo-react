import React from 'react';
import { LoaderContainer, Spinner } from './styles';

const LoadingScreen: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default LoadingScreen;
