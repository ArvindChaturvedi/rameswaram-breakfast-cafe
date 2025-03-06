
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, QrCode, ChevronRight, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import BasketItem from '../components/BasketItem';
import { businessInfo } from '../lib/data';
import { useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const QR_CODE_IMAGE_URL = "https://i.imgur.com/kFgKEcb.png";
const BUSINESS_UPI_ID = "7406062351@paytm";
const WHATSAPP_NUMBER = "7406062351"; // Plain number without country code or special characters

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearBasket } = useBasketStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (totalItems === 0) {
    navigate('/');
    return null;
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const formatWhatsAppNumber = (number: string) => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    // Ensure it has the country code (91 for India)
    return `91${cleanNumber}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsProcessing(true);
    
    // Prepare order message for WhatsApp
    const itemsList = items.map(item => 
      `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('%0A');
    
    const orderMessage = 
      `New Order!%0A%0ACustomer: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email || 'Not provided'}%0AAddress: ${formData.address}%0ANotes: ${formData.notes || 'None'}%0A%0AItems:%0A${itemsList}%0A%0ATotal: ${formatPrice(totalPrice)}%0APayment: ${paymentMethod === 'upi' ? 'UPI/QR' : 'Cash on Delivery'}`;
    
    // Format WhatsApp number properly (add country code, remove any non-digits)
    const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${orderMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Complete order and navigate to confirmation
    setTimeout(() => {
      clearBasket();
      navigate('/confirmation', { 
        state: { 
          orderData: {
            items,
            totalPrice,
            customer: formData,
            paymentMethod,
            orderTime: new Date().toISOString(),
            orderNumber: `RM${Math.floor(Math.random() * 10000)}`
          } 
        } 
      });
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Basket
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-medium text-lg">Your Details</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +91 9876543210"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Enter your complete delivery address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests or instructions"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="font-medium text-lg">Payment Method</h2>
                  
                  <Tabs value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="upi">
                        <QrCode className="h-4 w-4 mr-2" />
                        UPI / QR Code
                      </TabsTrigger>
                      <TabsTrigger value="cod">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Cash on Delivery
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upi">
                      <div className="bg-secondary rounded-lg p-4 space-y-4">
                        <div className="flex justify-center">
                          <div className="w-48 h-48 bg-white rounded-lg p-2 shadow-sm">
                            <img
                              src={QR_CODE_IMAGE_URL}
                              alt="Payment QR Code"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm">Scan to pay using any UPI app</p>
                          <p className="mt-2 font-medium">or pay to</p>
                          <p className="font-medium">{BUSINESS_UPI_ID}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cod">
                      <div className="bg-secondary rounded-lg p-4">
                        <p className="text-center">
                          You will pay at the time of delivery
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-12 bg-restaurant-600 hover:bg-restaurant-700 text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Order
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="bg-secondary/50 rounded-xl p-6">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <BasketItem key={item.id} item={item} />
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Payment;
