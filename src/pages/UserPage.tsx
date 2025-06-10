import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from "@/back/api";
import StarRating from '@/components/StarRating';
import ProductCard, { ProductProps } from "@/components/ProductCard";
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useUserInfo } from "@/data/userInfo";
import { jwtDecode } from "jwt-decode";
import ModalCadastro from '@/components/AddProduct';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

const UserPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        try {
            const decoded: any = jwtDecode(token);
            setUserId(decoded.id);
        } catch (e) {
            console.error("Erro ao decodificar o token:", e);
        }
        }

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

    const user = useUserInfo(userId);

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p className="text-red-500">Erro: {error}</p>;


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container">
                <div className="presentation section">
                    <div className="text-welcome">
                        <div className="user-welcome">
                            <h1>Olá,</h1>
                            <h1 className='usuario-nome'>{user?.name}</h1>
                            <h1>!</h1>
                        </div>
                        <p className='welcome-frase'>Bem-vindo(a) ao perfil de vendedor</p>
                    </div>
                    <Button 
                        className="add-btn" 
                        onClick={openModal}
                        >
                        Adicionar produto
                        <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1V14M1 7.5H14" stroke="#ffffff"/></svg>
                    </Button>
                </div>

                <div className="my-products section">
                    <h2>Meus produtos anunciados:</h2>
                    <div className="userpage-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {products
                            .filter(product => product.userId === userId)
                            .map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </div>

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
            </main>

            {isModalOpen && <ModalCadastro onClose={closeModal} />}
        </div>
    );
};

export default UserPage;