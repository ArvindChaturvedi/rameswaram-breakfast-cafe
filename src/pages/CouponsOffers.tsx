
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Gift, Copy, CheckCircle, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const CouponsOffers: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Code copied!",
      description: `${code} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Mock data for available coupons
  const availableCoupons = [
    {
      id: 1,
      code: 'WELCOME20',
      discount: '20% OFF',
      description: 'Get 20% off on your first order',
      minOrder: 200,
      expiryDate: 'June 30, 2023',
      isNew: true
    },
    {
      id: 2,
      code: 'STUDENT10',
      discount: '10% OFF',
      description: 'Special discount for students',
      minOrder: 150,
      expiryDate: 'July 15, 2023',
      isNew: false
    },
    {
      id: 3,
      code: 'BREAKFAST15',
      discount: '15% OFF',
      description: 'Morning special: 15% off on all breakfast items',
      minOrder: 250,
      expiryDate: 'June 25, 2023',
      isNew: false
    }
  ];

  // Mock data for special offers
  const specialOffers = [
    {
      id: 1,
      title: 'Combo Meals',
      description: 'Get a complimentary filter coffee with any combo meal',
      validUntil: 'July 10, 2023',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: 'Buy 2 dosas, get 1 vada free on weekends',
      validUntil: 'July 31, 2023',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Happy Hours',
      description: '25% off on all beverages between 3PM to 5PM',
      validUntil: 'June 30, 2023',
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const CouponCard = ({ coupon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.1 * coupon.id }}
      className="relative bg-white border border-dashed border-gray-300 rounded-lg overflow-hidden mb-6"
    >
      <div className="absolute top-0 bottom-0 left-8 my-auto w-5 h-5 bg-gray-100 rounded-full" />
      <div className="absolute top-0 bottom-0 right-8 my-auto w-5 h-5 bg-gray-100 rounded-full" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-xl">{coupon.discount}</h3>
            {coupon.isNew && (
              <div className="inline-block bg-restaurant-100 text-restaurant-800 text-xs font-medium px-2 py-0.5 rounded mt-1">
                NEW
              </div>
            )}
          </div>
          <Scissors className="h-5 w-5 text-restaurant-600" />
        </div>
        
        <p className="text-muted-foreground mb-4">{coupon.description}</p>
        
        <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center mb-4">
          <span className="font-mono font-medium">{coupon.code}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-restaurant-600"
            onClick={() => handleCopy(coupon.code)}
          >
            {copiedCode === coupon.code ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-1">Min. Order:</span>
            <span className="font-medium">₹{coupon.minOrder}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Valid till {coupon.expiryDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const OfferCard = ({ offer }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.1 * offer.id }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="aspect-video relative">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="font-semibold text-xl">{offer.title}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-muted-foreground mb-4">{offer.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Valid till {offer.validUntil}</span>
          </div>
          <Button 
            variant="link" 
            className="h-8 p-0 text-restaurant-600"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">
            Coupons & Offers
          </h1>
          <p className="text-muted-foreground">
            Exclusive deals and discounts just for you
          </p>
        </motion.div>

        <Tabs defaultValue="coupons" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-8">
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Special Offers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="coupons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCoupons.map(coupon => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <div className="text-center py-6 px-4 bg-restaurant-50 rounded-lg">
              <Gift className="mx-auto h-10 w-10 text-restaurant-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Refer & Earn</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Invite your friends to Rameswaram Cafe and get ₹100 off on your next order when they place their first order.
              </p>
              <Button 
                className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
              >
                Invite Friends
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="offers">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-restaurant-50 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="font-semibold text-xl mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-muted-foreground">
                    Stay updated with our latest offers and promotions.
                  </p>
                </div>
                <Button 
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CouponsOffers;
