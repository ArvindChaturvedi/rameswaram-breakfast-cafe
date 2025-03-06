
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import CouponsOffers from "./pages/CouponsOffers";
import Basket from "./pages/Basket";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// AnimatePresence wrapper component to fix React hooks error
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/coupons" element={<CouponsOffers />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton expand={false} />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
