import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { getProductById, getAllProducts } from "@/back/api";
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from '@/components/ProductCard';

const tagMap = {
  1: 'Vendedor',
  2: 'Aluno',
  3: 'Funcionário',
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [bestOffers, setBestOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(Number(id));
      console.log('Produto:', response.data);
      if (response.ok) {
        setProduct(response.data);
      } else {
        setError(response.error);
      }
    };

    const fetchBestOffers = async () => {
      const response = await getAllProducts();
      if (response.ok) {
        setBestOffers(response.data.slice(0, 6));
      }
    };

    fetchProduct();
    fetchBestOffers();
    setLoading(false);
  }, [id]);

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!product) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Button onClick={() => navigate('/products')}>Voltar para produtos</Button>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para produtos
        </Button>

        <div className="product-container">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={product.imagemUrl} alt={product.nome} className="rounded-lg object-cover product-img" />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{product.nome}</h1>
            <h3 className="text-gray-700 mb-4">{product.descricao}</h3>
            <div className="mb-4">
              <StarRating rating={product.rating || 4.5} size="lg" />
            </div>
            <div className="mb-6 text-3xl font-bold">R$ {product.price.toFixed(2)}</div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Vendedor</h3>
              <div className="flex items-center">
                <img src={product?.seller?.urlImg || '/avatar.png'} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                <div className="flex flex-col">
                  <span>{product?.seller?.name || 'Usuário Anônimo'}</span>
                  <span className='color-blue'>{tagMap[product?.seller?.tag]}</span>
                </div>
              </div>
            </div>
            <div className="additional-message">
              <h3>15% de desconto para VIPs</h3>
              <p>Quer 15% de desconto nas suas compras? Torne-se VIP agora mesmo!</p>
            </div>
            <Button size="lg" className="w-full md:w-auto mr-4" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <Link to="/checkout">
              <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
                Comprar agora
              </Button>
            </Link>
          </div>
        </div>

        {/* Reviews - Carousel */}
        <div className="reviews section">
        <Carousel className="w-full section mt-6" opts={{ loop: true }}>
            <h2>Feedbacks:</h2>
                <CarouselContent className="-ml-2 md:-ml-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <CarouselItem
                    key={i}
                    className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                    >
                    <div className="bg-white rounded-lg p-4 border border-gray-200 h-full">
                        <div className="flex items-center mb-2">
                        <img 
                            src={`https://i.pravatar.cc/100?img=${i+20}`} 
                            alt="Reviewer" 
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <div>
                            <h4 className="font-medium">Estudante {i+1}</h4>
                            <StarRating rating={4.5 + i/10} size="sm" />
                            </div>
                            <p className="text-gray-700">
                            Este produto atendeu todas as minhas expectativas! Qualidade excelente e entrega rápida.
                            {i % 2 === 0 ? ' Recomendo fortemente para outros estudantes.' : ''}
                            </p>
                        </div>
                        </div>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mr-2 translate-y-0" />
                <CarouselNext className="relative static ml-2 translate-y-0" />
                </div>
        </Carousel>
        </div>

        {/* Produtos relacionados */}
        <div className="section mt-12 bg-f1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Você também pode gostar:</h2>
            <Button variant="link" size="sm" onClick={() => navigate('/products')}>
              Ver todos
            </Button>
          </div>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {bestOffers.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <ProductCard {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2 translate-y-0" />
              <CarouselNext className="relative static ml-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
