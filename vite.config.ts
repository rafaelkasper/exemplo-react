import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Configuração do Vite
// Adiciona o plugin do React
// Adiciona um alias para o diretório src para facilitar a importação de arquivos com @/caminho
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
