import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import CategoryButton from "@/components/CategoryButton";
import ProductCard from "@/components/ProductCard";
import categories from "@/data/categories";
import products from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [bestOffers, setBestOffers] = useState(products.slice(0, 6));
  const [displayCount, setDisplayCount] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const handleCategorySelect = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setBestOffers(filtered.slice(0, 6));
  }, [selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/products${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  const handleShowMore = () => {
    setDisplayCount(filteredProducts.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bem-vindo ao Unimarket
              </h1>
              <p className="text-lg md:text-xl mb-4">
                O que você está procurando?
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Ver descontos
                </Button>
                <Button variant="secondary" size="sm">
                  Novidades
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=300&auto=format"
                alt="Estudantes"
                className="w-48 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Categorias</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                icon={category.icon}
                name={category.name}
                isActive={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Best Offers - Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Melhores Ofertas</h2>
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
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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

        {/* All Products - Limited to 3 rows initially */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Todos os Produtos</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.slice(0, displayCount).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length > displayCount && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleShowMore}>Ver todos</Button>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>

        {/* Community Comments - Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Comentários da comunidade</h2>
          </div>

          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <CarouselItem
                  key={i}
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="bg-white rounded-lg p-4 border border-gray-200 h-full">
                    <div className="flex items-center mb-2">
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Estudante {i}</h4>
                        <p className="text-xs text-gray-500">
                          Ciências da Computação
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Os produtos do Unimarket têm me ajudado muito na rotina
                      universitária. Recomendo!"
                    </p>
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
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">
            © 2024 Unimarket - Todos os direitos reservados
          </p>
          <p className="text-xs mt-1">Desenvolvido para universitários</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;
