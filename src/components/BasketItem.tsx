
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BasketItem as BasketItemType, useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';

interface BasketItemProps {
  item: BasketItemType;
}

const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useBasketStore();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-4 py-4 border-b border-gray-100"
    >
      <div className="w-16 h-16 rounded-md overflow-hidden relative flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-muted-foreground">
            {formatPrice(item.price)} each
          </p>
          <p className="font-semibold">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        
        <div className="flex items-center mt-2 justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-6 text-center">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BasketItem;
