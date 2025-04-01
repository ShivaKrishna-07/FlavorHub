
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Plus } from "lucide-react";

type FoodCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
};

export function FoodCard({ id, name, image, price, category }: FoodCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      image,
      price,
      category,
    });
  };

  // Fallback image in case the provided image URL is invalid
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"; // Default image
  };

  return (
    <Card className="tasty-card overflow-hidden h-full flex flex-col">
      <div className="relative w-full pt-[75%] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-medium text-lg line-clamp-1 mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-1">{category}</p>
        <p className="font-semibold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2" 
          variant="default"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
