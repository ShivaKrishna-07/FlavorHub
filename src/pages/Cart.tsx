
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { 
    items, 
    clearCart, 
    getSubtotal, 
    getTax, 
    getDeliveryFee, 
    getTotal,
    getTotalItems
  } = useCart();

  const itemCount = getTotalItems();
  const subtotal = getSubtotal();
  const tax = getTax();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">
                      Cart Items ({itemCount})
                    </h2>
                  </div>
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="px-6">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                  <div className="p-6 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="text-muted-foreground"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border overflow-hidden sticky top-20">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Empty Cart State
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="mb-6 bg-muted h-24 w-24 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
                Browse our menu to find your favorite meals.
              </p>
              <Button size="lg" asChild>
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
