
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, ShoppingBasket, X, FileText, TicketPercent } from 'lucide-react';
import { businessInfo } from '../lib/data';
import { useBasketStore } from '../store/basketStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useBasketStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Coupons & Offers', path: '/coupons' },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-restaurant-950">
            {businessInfo.shortName}
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            {mainNavItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-restaurant-600'
                    : 'text-muted-foreground hover:text-foreground'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <Link to="/basket">
              <Button 
                variant="outline" 
                size="sm" 
                className="group relative flex items-center gap-2"
              >
                <ShoppingBasket className="h-4 w-4" />
                <span>Basket</span>
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 bg-restaurant-600 text-white 
                    rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium"
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Link to="/basket">
            <Button 
              variant="outline" 
              size="sm" 
              className="relative h-9 w-9 p-0"
            >
              <ShoppingBasket className="h-4 w-4" />
              {totalItems > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-restaurant-600 text-white 
                  rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium"
                >
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xl font-bold tracking-tight">
                    {businessInfo.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <nav className="space-y-4">
                  {mainNavItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 py-2 ${
                        location.pathname === item.path
                          ? 'text-restaurant-600 font-medium'
                          : 'text-foreground hover:text-restaurant-600'
                      } transition-colors`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.path === '/' && <FileText className="h-5 w-5" />}
                      {item.path === '/menu' && <FileText className="h-5 w-5" />}
                      {item.path === '/coupons' && <TicketPercent className="h-5 w-5" />}
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-auto pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    {businessInfo.phone}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {businessInfo.email}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
