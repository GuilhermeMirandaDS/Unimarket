import { jwtDecode } from 'jwt-decode';

type UserTokenPayload = {
  id: number;
  email: string;
  name: string;
  tag: number;
};

const tagMap: Record<number, string> = {
  1: 'Vendedor',
  2: 'Aluno',
  3: 'Funcionário',
};

export function getUserInfo() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const userData = jwtDecode<UserTokenPayload>(token);
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      tagNumber: userData.tag,
      tag: tagMap[userData.tag] || 'Desconhecido',
    };
  } catch (e) {
    console.error('Token inválido ou mal formatado');
    return null;
  }
}
