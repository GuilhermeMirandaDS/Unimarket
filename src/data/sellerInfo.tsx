import { useEffect, useState } from 'react';

const tagMap: Record<number, string> = {
  1: 'Vendedor',
  2: 'Aluno',
  3: 'Funcionário',
};

export function useSellerInfo(userId: number) {
  const [seller, setSeller] = useState<null | {
    name: string;
    tag: string;
    avatar: string;
  }>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchSeller = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!res.ok) throw new Error("Erro ao buscar vendedor");
        const data = await res.json();
        console.log(data);

        setSeller({
          name: data.name,
          tag: tagMap[data.tag] || "Desconhecido",
          avatar: data.urlImg,
        });
      } catch (err) {
        console.error("Erro ao buscar vendedor:", err);
        setSeller(null);
      }
    };

    fetchSeller();
  }, [userId]);

  return seller;
}
