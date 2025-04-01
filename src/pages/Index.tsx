
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoodCard } from "@/components/FoodCard";
import { MealSummary, getFeaturedMeals } from "@/services/mealService";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";

const Index = () => {
  const [featuredMeals, setFeaturedMeals] = useState<MealSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMeals = async () => {
      try {
        const meals = await getFeaturedMeals(6);
        setFeaturedMeals(meals);
      } catch (error) {
        console.error("Error loading featured meals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedMeals();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center">
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
        </div>
        
        <div className="container relative mx-auto px-4 py-24 md:py-32 text-white">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Delicious Food Delivered To Your Doorstep
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Order your favorite meals from the best restaurants in town. Fast delivery, fresh food, and amazing taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/menu">Order Now</Link>
              </Button>
                
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TastyEats?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best food delivery experience with these amazing features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Your food will be delivered in 30 minutes or less. Quick and reliable service.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-tasty-purple-500/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-tasty-purple-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Quality Food</h3>
              <p className="text-muted-foreground">
                We only partner with restaurants that maintain the highest quality standards.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-tasty-orange-500/10 flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-tasty-orange-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Easy Tracking</h3>
              <p className="text-muted-foreground">
                Track your order in real time. Know exactly when your food will arrive.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Meals Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Meals</h2>
            <Button variant="ghost" asChild className="hidden sm:flex gap-2">
              <Link to="/menu">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading placeholders
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="tasty-card p-4 space-y-3">
                  <div className="w-full pt-[75%] relative bg-muted rounded-md"></div>
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              ))
            ) : (
              featuredMeals.map((meal) => (
                <FoodCard
                  key={meal.idMeal}
                  id={meal.idMeal}
                  name={meal.strMeal}
                  image={meal.strMealThumb}
                  price={meal.price}
                  category={meal.category}
                />
              ))
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link to="/menu">View All Meals</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Hungry? We've Got You Covered</h2>
            <p className="text-lg mb-8 opacity-90">
              Use code <span className="font-bold">TASTY25</span> for 25% off your first order
            </p>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/menu">Order Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
