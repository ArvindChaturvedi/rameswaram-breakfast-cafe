
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem, useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FoodCardProps {
  item: MenuItem;
  index: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index }) => {
  const { addItem } = useBasketStore();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleAddToBasket = () => {
    addItem(item);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="menu-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 overflow-hidden relative flex flex-col h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
        <div 
          className={`absolute inset-0 bg-gray-200 ${!imageLoaded ? 'shimmer' : ''}`}
          style={{ zIndex: imageLoaded ? -1 : 1 }}
        />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />
        {item.isPopular && (
          <Badge 
            className="absolute top-2 right-2 bg-restaurant-600 hover:bg-restaurant-600"
          >
            Popular
          </Badge>
        )}
        {item.veg && (
          <div className="absolute top-2 left-2 bg-white rounded p-1 shadow-sm">
            <div className="w-4 h-4 border border-green-500 flex items-center justify-center rounded-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base">{item.name}</h3>
          <span className="font-semibold text-sm ml-2">₹{item.price}</span>
        </div>
        
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleAddToBasket}
          size="sm"
          className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
