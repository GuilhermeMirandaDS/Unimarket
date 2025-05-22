import { cn } from "@/lib/utils";

interface CategoryButtonProps {
  icon: string;
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({
  icon,
  name,
  isActive = false,
  onClick,
}: CategoryButtonProps) => {
  return (
    <button
      className={cn(
        "flex flex-col items-center p-3  transition-all"
      )}
      onClick={onClick}
    >
      <div className="category-icon rounded-full bg-blue-100 flex items-center justify-center mb-2 overflow-hidden">
        <img src={icon} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="category-name">{name}</span>
    </button>
  );
};

export default CategoryButton;
