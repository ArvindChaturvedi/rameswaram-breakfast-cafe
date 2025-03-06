
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Calendar, Clock, Share2 } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { toast } from 'sonner';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  
  // Redirect if no order data
  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);
  
  if (!orderData) {
    return null;
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'p');
  };

  const handleShareOrder = () => {
    // Format order details for sharing
    const items = orderData.items.map((item: any) => 
      `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const shareText = `My order #${orderData.orderNumber} at Rameswaram Breakfast Cafe:\n\n${items}\n\nTotal: ${formatPrice(orderData.totalPrice)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Order at Rameswaram',
        text: shareText,
      }).catch(err => {
        toast.error('Could not share order details');
        console.error('Share failed:', err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success('Order details copied to clipboard'))
        .catch(() => toast.error('Could not copy order details'));
    }
  };
  
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12 max-w-3xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Your order #{orderData.orderNumber} has been received</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <span className="text-muted-foreground">Order Number</span>
              <p className="font-semibold">{orderData.orderNumber}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(orderData.orderTime)}
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(orderData.orderTime)}
              </div>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Order Items</h3>
              <div className="space-y-3">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                    </div>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(orderData.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(orderData.totalPrice)}</span>
                </div>
                <div className="pt-2 text-muted-foreground text-sm">
                  Payment Method: {orderData.paymentMethod === 'upi' ? 'UPI/QR Code' : 'Cash on Delivery'}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Delivery Information</h3>
              <div className="space-y-2">
                <p><span className="text-muted-foreground">Name:</span> {orderData.customer.name}</p>
                <p><span className="text-muted-foreground">Phone:</span> {orderData.customer.phone}</p>
                {orderData.customer.email && (
                  <p><span className="text-muted-foreground">Email:</span> {orderData.customer.email}</p>
                )}
                <p><span className="text-muted-foreground">Address:</span> {orderData.customer.address}</p>
                {orderData.customer.notes && (
                  <p><span className="text-muted-foreground">Notes:</span> {orderData.customer.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
          <Button
            variant="secondary"
            onClick={handleShareOrder}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Order Details
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default OrderConfirmation;
