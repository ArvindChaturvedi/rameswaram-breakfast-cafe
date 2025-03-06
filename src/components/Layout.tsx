
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import BasketDrawer from './BasketDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <BasketDrawer />
    </div>
  );
};

export default Layout;
