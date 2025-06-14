import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllProducts } from "@/back/api";
import Header from "@/components/Header";
import CategoryButton from "@/components/CategoryButton";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import categories from "@/data/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductsPage = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [bestOffers, setBestOffers] = useState(products.slice(0, 6));
  const [displayCount, setDisplayCount] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  

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
        (product) => product.categoria === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setBestOffers(filtered.slice(0, 6));
  }, [products, selectedCategory, searchQuery]);

  const handlerSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/products${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  const handleShowMore = () => {
    setDisplayCount(filteredProducts.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handlerSearch} />

      <main className="container mx-auto px-4 py-6">
        {/* Banner principal */}
        <div className="banner-home section rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="apresentation mb-6 md:mb-0 md:mr-6">
              <div className="pre-top">
                <h1 className="text-lg md:text-xl mb-4">
                  Bem-vindo ao Unimarket
                </h1>
                <p className="home-frase">
                  O que você está procurando?
                </p>  
              </div>
              <div className="hidden md:flex flex-1 max-w-xl relative">
                <form onSubmit={handleSearch} className="search-form w-full">
                  <Input
                    type="text"
                    placeholder="O que você está procurando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="banner-search-input w-full pr-10 focus-visible:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute"
                  >
                    Procurar
                  </button>
                </form>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Ver descontos
                </Button>
                <Button variant="secondary" size="sm">
                  Novidades
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="section">
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

        {/* Recém publicados - Carousel */}
        <div className="section showcase-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Produtos publicados recentemente:</h2>
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

        {/* Todos os produtos */}
        <div className="section bg-f1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Todos os Produtos:</h2>
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

        {/* Comentários - Carousel */}
        <div className="section">
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
