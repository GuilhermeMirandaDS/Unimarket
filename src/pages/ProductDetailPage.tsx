
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import products from '@/data/products';
import { ProductProps } from '@/components/ProductCard';
import { useCart } from '@/hooks/use-cart';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id.toString() === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);
  
  if (!product) {
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
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
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
            
            <Button 
              size="lg"
              className="w-full md:w-auto"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
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
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
