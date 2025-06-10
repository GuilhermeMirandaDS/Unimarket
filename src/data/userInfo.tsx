import { useEffect, useState } from 'react';

const tagMap: Record<number, string> = {
  1: 'Vendedor',
  2: 'Aluno',
  3: 'Funcionário',
};

export function useUserInfo(id: number | null) {
  const [user, setUser] = useState<null | {
    name: string;
    tag: string;
    avatar: string;
  }>(null);

  useEffect(() => {
    if (!id) return;
    console.log(id);

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        const data = await res.json();

        setUser({
          name: data.name,
          tag: tagMap[data.tag] || "Desconhecido",
          avatar: data.urlImg,
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [id]);

  return user;
}
