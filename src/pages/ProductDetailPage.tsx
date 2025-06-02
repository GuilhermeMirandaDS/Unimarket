import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllProducts } from "@/back/api";
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { useCart } from '@/hooks/use-cart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetailPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [bestOffers, setBestOffers] = useState(products.slice(0, 6));
  
  useEffect(() => {
    const fetchProducts = async () => {
        const response = await getAllProducts();

        if (response.ok) {
            setProducts(response.data);
        } else {
            setError(response.error);
        }

        setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  
  if (!products) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/products')}>Voltar para produtos</Button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(products);
    toast.success(`${products.name} adicionado ao carrinho!`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para produtos
        </Button>
        
        <div className="product-container section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="img-container bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={imagemUrl} 
              alt={product.name} 
              className="product-page-image rounded-lg object-cover"
            />
          </div>
          
          <div className="product-info">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <h3 className="product-desc">{product.desc}</h3>
            
            <div className="mb-4 flex items-center">
              <StarRating rating={product.rating} size="lg" />
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">R$ {product.price.toFixed(2)}</span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Vendedor</h3>
              <div className="flex items-center">
                <img 
                  src={product.seller.avatar} 
                  alt={product.seller.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{product.seller.name}</span>
              </div>
            </div>

            <div className="additional-message">
              <h3>15% de desconto para VIPs</h3>
              <p>Quer 15% de desconto nas suas compras? Torne-se VIP agora mesmo e aproveite essa oferta exclusiva! Não perca tempo, vire VIP hoje e economize nas suas compras!</p>
            </div>
            
              <Button 
                size="lg"
                className="btn-cart w-full md:w-auto mr-6"
                onClick={handleAddToCart}
              >
              Adicionar ao Carrinho
              </Button>
            <Link to="/checkout">
              <Button 
                size="lg"
                className="btn-buy-now w-full md:w-auto"
                onClick={handleAddToCart}
              >
                Comprar agora
              </Button>
            </Link>
          </div>
        </div>
        
        {/* <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Avaliações</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i+20}`} 
                    alt="Reviewer" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium">Estudante {i+1}</h4>
                    <StarRating rating={4.5 + i/10} size="sm" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Este produto atendeu todas as minhas expectativas! Qualidade excelente e entrega rápida.
                  {i % 2 === 0 ? ' Recomendo fortemente para outros estudantes.' : ''}
                </p>
              </div>
            ))}
          </div>
        </div> */}
        <Carousel className="w-full section mt-6" opts={{ loop: true }}>
        <h2 className="title-sugestion">Avaliações:</h2>
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

        {/* Relacionados - Carousel */}
        <div className="section showcase-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="title-sugestion">Você também pode <p className='color-blue'>gostar</p>:</h2>
            <Button
              variant="link"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Ver todos
            </Button>
          </div>

          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {bestOffers.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <ProductCard {...product} />
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
