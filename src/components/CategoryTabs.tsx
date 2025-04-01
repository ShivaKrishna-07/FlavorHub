
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, getCategories } from "@/services/mealService";

interface CategoryTabsProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

export function CategoryTabs({ onCategoryChange, selectedCategory }: CategoryTabsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        
        // Set the first category as default if none is selected
        if (!selectedCategory && data.length > 0) {
          onCategoryChange(data[0].strCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [onCategoryChange, selectedCategory]);

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto pb-2">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="h-10 inline-flex w-auto min-w-full md:w-full">
          {categories.map((category) => (
            <TabsTrigger
              key={category.idCategory}
              value={category.strCategory}
              className="px-4 py-2 whitespace-nowrap"
            >
              {category.strCategory}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
