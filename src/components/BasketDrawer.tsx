
import React, { useState } from 'react';
import { ShoppingBag, X, Minus, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const BasketDrawer: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useBasketStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/payment');
  };
  
  const handleViewBasket = () => {
    setIsOpen(false);
    navigate('/basket');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (totalItems === 0) return null;

  return (
    <>
      {/* Basket Trigger Button */}
      <AnimatePresence>
        {!isOpen && totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden"
          >
            <Button
              onClick={toggleDrawer}
              className="bg-restaurant-600 hover:bg-restaurant-700 text-white shadow-lg rounded-full px-6 h-12"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>{totalItems} items • {formatPrice(totalPrice)}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={toggleDrawer}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl shadow-2xl md:max-w-md md:left-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-display font-semibold">Your Basket</h2>
                <Button variant="ghost" size="icon" onClick={toggleDrawer}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mb-6 max-h-[calc(100vh-280px)] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="py-3">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex space-x-2 items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-5 text-center text-sm">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>
                      
                      <p className="font-medium text-right">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleViewBasket}
                >
                  View Basket
                </Button>
                <Button
                  className="flex-1 bg-restaurant-600 hover:bg-restaurant-700 text-white"
                  onClick={handleCheckout}
                >
                  Checkout <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BasketDrawer;
