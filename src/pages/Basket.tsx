
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import BasketItem from '../components/BasketItem';
import { useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Basket: React.FC = () => {
  const { items, totalPrice, clearBasket } = useBasketStore();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Your Basket</h1>
          <p className="text-muted-foreground mb-6">Your basket is empty</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-restaurant-600 hover:bg-restaurant-700"
          >
            Browse Menu
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8 max-w-3xl"
      >
        <h1 className="text-2xl font-semibold mb-6">Your Basket</h1>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="space-y-1 mb-6">
            {items.map((item) => (
              <BasketItem key={item.id} item={item} />
            ))}
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Add More Items
            </Button>
            <Button 
              className="flex-1 bg-restaurant-600 hover:bg-restaurant-700 text-white"
              onClick={handleCheckout}
            >
              Proceed to Payment <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Basket;
