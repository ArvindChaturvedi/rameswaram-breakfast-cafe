
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import FoodCard from '../components/FoodCard';
import { Input } from '@/components/ui/input';
import { menuItems, menuCategories } from '../lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter menu items based on search query and active category
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of authentic South Indian dishes made with love and tradition
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search dishes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full flex overflow-x-auto justify-start mb-6 pb-1 scrollbar-hide">
              <TabsTrigger value="all" className="flex-shrink-0">All</TabsTrigger>
              {menuCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item, index) => (
                  <FoodCard key={item.id} item={item} index={index} />
                ))}
              </div>
              {filteredMenuItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No dishes found matching your search.</p>
                </div>
              )}
            </TabsContent>
            
            {menuCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenuItems.map((item, index) => (
                    <FoodCard key={item.id} item={item} index={index} />
                  ))}
                </div>
                {filteredMenuItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No dishes found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
