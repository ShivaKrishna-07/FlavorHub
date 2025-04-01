
import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchBar } from "@/components/SearchBar";
import { FoodCard } from "@/components/FoodCard";
import { MealSummary, getMealsByCategory, searchMeals } from "@/services/mealService";
import { Skeleton } from "@/components/ui/skeleton";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadMealsByCategory = useCallback(async (category: string) => {
    if (!category) return;
    
    setIsLoading(true);
    try {
      const data = await getMealsByCategory(category);
      setMeals(data);
      // Clear search query when changing categories
      setSearchQuery("");
      setIsSearching(false);
    } catch (error) {
      console.error(`Error loading meals for category ${category}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    loadMealsByCategory(category);
  }, [loadMealsByCategory]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is cleared, load the current category
      if (selectedCategory) {
        loadMealsByCategory(selectedCategory);
      }
      return;
    }
    
    setIsLoading(true);
    setIsSearching(true);
    try {
      const data = await searchMeals(query);
      setMeals(data);
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [loadMealsByCategory, selectedCategory]);

  useEffect(() => {
    if (selectedCategory && !isSearching) {
      loadMealsByCategory(selectedCategory);
    }
  }, [selectedCategory, loadMealsByCategory, isSearching]);

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <div key={index} className="tasty-card space-y-3">
        <Skeleton className="w-full h-48 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header Section */}
        <section className="bg-accent/30 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
            
            <div className="flex justify-center mb-8">
              <SearchBar 
                onSearch={handleSearch}
                initialQuery={searchQuery}
              />
            </div>
            
            <CategoryTabs 
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          </div>
        </section>
        
        {/* Menu Items Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            {searchQuery && (
              <h2 className="text-xl font-medium mb-6">
                {isLoading 
                  ? "Searching..." 
                  : meals.length > 0 
                    ? `Search results for "${searchQuery}" (${meals.length})` 
                    : `No results found for "${searchQuery}"`
                }
              </h2>
            )}
            
            {!searchQuery && selectedCategory && (
              <h2 className="text-xl font-medium mb-6">
                {isLoading ? "Loading..." : `${selectedCategory} (${meals.length})`}
              </h2>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                renderSkeletons()
              ) : meals.length > 0 ? (
                meals.map((meal) => (
                  <FoodCard
                    key={meal.idMeal}
                    id={meal.idMeal}
                    name={meal.strMeal}
                    image={meal.strMealThumb}
                    price={meal.price}
                    category={meal.category}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery 
                      ? "No meals found matching your search. Try a different keyword."
                      : "No meals found in this category. Please try another category."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
