import axiosInstance from '../axios';

export interface RepositoryDTO {
  id: number;
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  watchers_count: number;
  language: string;
}

export const getReposGithub = async (): Promise<RepositoryDTO> => {
  const response = await axiosInstance.get(
    `https://api.github.com/users/rafaelkasper/repos`
  );

  return response.data;
};

export const saveTodo = async (newTodo: any): Promise<any> => {
  await axiosInstance.post(`/todo`, newTodo);
};
