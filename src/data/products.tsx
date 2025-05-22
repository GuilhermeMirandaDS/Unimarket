
const products = [
  {
    id: 1,
    name: "Caixa de Chocolate Branco",
    price: 8.00,
    image: "https://imgprd.martinsatacado.com.br/catalogoimg/330862/01_330862_01.jpg?v=130220255414;ims=1000x",
    rating: 4.8,
    category: 2,
    desc: "Uma seleção irresistível de bombons de chocolate branco, perfeitos para presentear ou se presentear.",
    seller: {
      name: "Carlos Silva",
      avatar: "https://i.pravatar.cc/100?img=1",
      graduation: "Direito"
    }
  },
  {
    id: 2,
    name: "Notebook Gamer 2023",
    price: 3590.00,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format",
    rating: 4.9,
    category: 6,
    desc: "Potência máxima para rodar os melhores jogos com gráficos incríveis. Desempenho de sobra para vencer em qualquer arena!",
    seller: {
      name: "Tech Store",
      avatar: "https://i.pravatar.cc/100?img=2",
      graduation: "Direito"
    }
  },
  {
    id: 3,
    name: "Apostila de Física",
    price: 10.00,
    image: "https://down-br.img.susercontent.com/file/7c687ae666657f551eb3d8f4604fc74b",
    rating: 4.7,
    category: 1,
    desc: "Conteúdo atualizado, explicado de forma clara, com exercícios para fixação. Ideal para estudantes que querem dominar a matéria.",
    seller: {
      name: "Ana Paula",
      avatar: "https://i.pravatar.cc/100?img=3",
      graduation: "Direito"
    }
  },
  {
    id: 4,
    name: "Caneca de Design",
    price: 8.50,
    image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltcfkqs7pcvgd1",
    rating: 4.8,
    category: 5,
    desc: "Cheia de estilo, com estampa exclusiva. Acompanhe seu café com a vibe criativa do design!",
    seller: {
      name: "Maria Souza",
      avatar: "https://i.pravatar.cc/100?img=4",
      graduation: "Direito"
    }
  },
  {
    id: 5,
    name: "Caneca Edição Limitada Engenharia",
    price: 19.00,
    image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltcfkqs7mjqk93",
    rating: 4.9,
    category: 5,
    desc: "Robusta como um bom projeto estrutural! Caneca temática exclusiva para quem faz tudo com cálculo e paixão.",
    seller: {
      name: "Studio Design",
      avatar: "https://i.pravatar.cc/100?img=5",
      graduation: "Direito"
    }
  },
  {
    id: 6,
    name: "Brigadeiro Gourmet",
    price: 3.00,
    image: "https://a-static.mlcdn.com.br/1500x1500/brigadeiro-gourmet-com-chocolate-belga-4-un-caminho-da-fazenda-caminhodafazenda/caminhodafazenda/929p/82442043b03d9a5ab2bb28c6649cff5a.jpeg",
    rating: 4.9,
    category: 2,
    desc: "Delicioso, cremoso e feito com chocolate belga. O clássico brasileiro em sua versão mais refinada!",
    seller: {
      name: "Doces Uni",
      avatar: "https://i.pravatar.cc/100?img=52",
      graduation: "Direito"
    }
  },
  {
    id: 7,
    name: "Bolo de Chocolate",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=400&auto=format",
    rating: 4.7,
    category: 2,
    desc: "Massa fofinha e recheio cremoso. O sabor caseiro que derrete na boca em cada fatia.",
    seller: {
      name: "Nana Doces",
      avatar: "https://i.pravatar.cc/100?img=7",
      graduation: "Direito"
    }
  },
  {
    id: 8,
    name: "Bolo de cenoura",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400&auto=format",
    rating: 4.8,
    category: 2,
    desc: "Clássico brasileiro com cobertura generosa de chocolate. A combinação que nunca falha!",
    seller: {
      name: "Padaria Uni",
      avatar: "https://i.pravatar.cc/100?img=8",
      graduation: "Direito"
    }
  },
  {
    id: 9,
    name: "Fone de Ouvido Bluetooth",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=400&auto=format",
    rating: 4.6,
    category: 6,
    desc: "Som de alta qualidade sem fio. Perfeito para música, chamadas ou foco total nos estudos.",
    seller: {
      name: "Tech Connect",
      avatar: "https://i.pravatar.cc/100?img=9",
      graduation: "Direito"
    }
  },
  {
    id: 10,
    name: "Livro Clean Code",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format",
    rating: 4.9,
    category: 7,
    desc: "Aprenda a escrever códigos legíveis, eficientes e profissionais. Um clássico essencial para qualquer programador.",
    seller: {
      name: "Livraria do Estudante",
      avatar: "https://i.pravatar.cc/100?img=10",
      graduation: "Direito"
    }
  },
  {
    id: 11,
    name: "Almoço Executivo",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?q=80&w=400&auto=format",
    rating: 4.5,
    category: 3,
    desc: "Prato completo, saboroso e equilibrado. Ideal para sua pausa de meio-dia com qualidade de restaurante.",
    seller: {
      name: "Restaurante Universitário",
      avatar: "https://i.pravatar.cc/100?img=11",
      graduation: "Direito"
    }
  },
  {
    id: 12,
    name: "Marmita Fitness",
    price: 15.90,
    image: "https://images.unsplash.com/photo-1611599654038-15ee752a8d53?q=80&w=400&auto=format",
    rating: 4.7,
    category: 3,
    desc: "Prática, saudável e saborosa. Preparada com ingredientes frescos para quem cuida do corpo e da rotina.",
    seller: {
      name: "Saúde na Mesa",
      avatar: "https://i.pravatar.cc/100?img=12",
      graduation: "Direito"
    }
  }
];

export default products;
