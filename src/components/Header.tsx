import { useState, useEffect } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useUserInfo } from "@/data/userInfo";
import { jwtDecode } from "jwt-decode";
import ProfileSideBar from "@/components/Profile";



const Header = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []);

  const user = useUserInfo(userId);

  if (!userId || !user) {
    return <p>Carregando usuário...</p>;
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }


  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img src="..\public\Assets\img\logosvg.svg" alt="Unimarket Logo" />
          </Link>

          <div className="menu-nav">
            <div className="container md:flex mx-auto px-4 py-3" style={{gap: "20px"}}>
              <a className="menu-tab" href="/">Página Inicial</a>
              <div className="menu-tab first-level md:flex items-end px-2">
                Categorias
                <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >

                <path d="M0 0h48v48H0z" fill="none"/>
                <g id="Shopicon">
                  <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586 	"/>
                </g>
                </svg>
                <ul className="second-level">
                  <li className="menu-subitem">Apostilas</li>
                  <li className="menu-subitem">Doces</li>
                  <li className="menu-subitem">Roupas</li>
                  <li className="menu-subitem">Livros</li>
                  <li className="menu-subitem">Comida</li>
                  <li className="menu-subitem">Eletrônicos</li>
                  <li className="menu-subitem">Atlética</li>
                </ul>
              </div>
              <a className="menu-tab" href="/">Sobre Nós</a>
              <a className="menu-tab" href="/">Sobre a Unimar</a>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl relative">
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 focus-visible:ring-blue-500"
                />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Link>
            </Button>
          ) : (
            <Button className="user-btn first-level-user" variant="ghost" size="icon">
                <img src={user?.avatar} alt={user?.name} className="user-pfp"/>
                <div className="user-info-header">
                  <span className="user-name-header">{user?.name}</span>
                  <p className="user-tag-header">{user?.tag}</p>
                </div>
                <ul className="second-level-user">
                  <li className="menu-subitem">
                    <span onClick={() => setIsProfileOpen(true)} style={{ cursor: "pointer" }}>
                      Perfil
                    </span>
                    </li>
                  <li className="menu-subitem">
                    <Link to="/user">
                      Meus Anúncios
                    </Link>
                  </li>
                  <li className="menu-subitem">
                    <a onClick={logOut}>
                      Sair
                    </a>
                    </li>
                </ul>
            </Button>
          )}

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrinho</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {isMobile && (
          <form onSubmit={handleSearch} className="mt-2 relative">
            <Input
              type="text"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10"
              />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              >
              <Search className="h-5 w-5" />
            </button>
          </form>
        )}
      </div>
    </header>
    <ProfileSideBar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
  </>
  );
};

export default Header;
