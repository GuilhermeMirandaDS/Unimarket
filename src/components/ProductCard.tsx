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
    graduation: string;
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
        <h3 className="product-name">{name}</h3>
        <div className="rating flex items-center space-x-1">
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

        <span className="seller-title">Vendedor(a):</span>
        <div className="seller flex items-center">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="seller-img"
          />
          <div className="seller-info">
            <span className="seller-name">{seller.name}</span>
            <span className="seller-grad">{seller.graduation}</span>
          </div>
        </div>


        <div className="buy-form">
          <p className="card-price">R$ {price.toFixed(2)}</p>
          <Button
            onClick={handleAddToCart}
            className="buy-btn mt-3 bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
