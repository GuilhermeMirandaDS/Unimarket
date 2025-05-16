import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: number;
  seller: {
    name: string;
    avatar: string;
  };
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  rating,
  seller,
}: ProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, rating, seller, category: 0 });
    toast.success(`${name} adicionado ao carrinho!`);
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="group rounded-lg overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isHovered && "scale-105"
          )}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : i < rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({(rating * 10).toFixed(0)})
          </span>
        </div>

        <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1">{name}</h3>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="font-bold text-lg">R$ {price.toFixed(2)}</p>
          </div>

          <div className="flex items-center">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-5 h-5 rounded-full mr-1"
            />
            <span className="text-xs text-gray-500">{seller.name}</span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
