import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showCount = true,
}: StarRatingProps) => {
  const sizesMap = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSize = sizesMap[size];
  const textSize = textSizeMap[size];

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            iconSize,
            index < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : index < rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
      {showCount && (
        <span className={cn("text-gray-500 ml-1", textSize)}>
          ({(rating * 10).toFixed(0)})
        </span>
      )}
    </div>
  );
};

export default StarRating;
