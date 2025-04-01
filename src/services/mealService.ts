
import { toast } from "sonner";

// Define meal-related types
export type Meal = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

// For compatibility with existing components
export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  price: number;
  category: string;
};

export type Category = {
  idCategory: string;
  strCategory: string;
};

// Placeholder implementation of meal services
// In a real app, this would fetch from an API

const MEALS: Meal[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 12.99,
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
    category: "Pizza"
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    price: 14.99,
    image: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
    category: "Curry"
  },
  {
    id: "3",
    name: "Caesar Salad",
    price: 8.99,
    image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    category: "Salad"
  },
  {
    id: "4",
    name: "Beef Burger",
    price: 10.99,
    image: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
    category: "Burger"
  },
  {
    id: "5",
    name: "Vegetable Pasta",
    price: 11.99,
    image: "https://www.themealdb.com/images/media/meals/uttuxy1487348128.jpg",
    category: "Pasta"
  },
  {
    id: "6",
    name: "Sushi Rolls",
    price: 15.99,
    image: "https://www.themealdb.com/images/media/meals/g046bb1663013291.jpg",
    category: "Sushi"
  }
];

// Get all meals
export const getAllMeals = async (): Promise<MealSummary[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mealSummaries = MEALS.map(meal => convertToMealSummary(meal));
      resolve(mealSummaries);
    }, 500);
  });
};

// Get meal by ID
export const getMealById = async (id: string): Promise<Meal | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const meal = MEALS.find(meal => meal.id === id);
      resolve(meal);
    }, 300);
  });
};

// Get meals by category
export const getMealsByCategory = async (category: string): Promise<MealSummary[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredMeals = category === 'All' 
        ? MEALS 
        : MEALS.filter(meal => meal.category === category);
      
      // Convert to MealSummary format
      const mealSummaries = filteredMeals.map(meal => convertToMealSummary(meal));
      resolve(mealSummaries);
    }, 300);
  });
};

// Get available categories
export const getCategories = async (): Promise<Category[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    const uniqueCategories = [...new Set(MEALS.map(meal => meal.category))];
    const categories = [
      { idCategory: "0", strCategory: "All" },
      ...uniqueCategories.map((cat, index) => ({
        idCategory: (index + 1).toString(),
        strCategory: cat
      }))
    ];
    
    setTimeout(() => resolve(categories), 300);
  });
};

// Search meals by name
export const searchMeals = async (query: string): Promise<MealSummary[]> => {
  if (!query.trim()) return getAllMeals();
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = MEALS.filter(meal => 
        meal.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Convert to MealSummary format
      const mealSummaries = results.map(meal => convertToMealSummary(meal));
      resolve(mealSummaries);
    }, 300);
  });
};

// Get featured meals (for homepage)
export const getFeaturedMeals = async (limit = 3): Promise<MealSummary[]> => {
  // Simulate API call to get featured meals
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert Meal to MealSummary format
      const featuredMeals: MealSummary[] = MEALS.slice(0, limit).map(meal => convertToMealSummary(meal));
      
      resolve(featuredMeals);
    }, 500);
  });
};

// Convert meal to the format expected by components
export const convertToMealSummary = (meal: Meal): MealSummary => {
  return {
    idMeal: meal.id,
    strMeal: meal.name,
    strMealThumb: meal.image,
    price: meal.price,
    category: meal.category
  };
};
