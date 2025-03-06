
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Utensils, Leaf, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { businessInfo } from '../lib/data';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Features section data
  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-restaurant-600" />,
      title: "Natural Ingredients",
      description: "We use only the freshest, locally-sourced ingredients in all our dishes, ensuring authentic taste and nutrition."
    },
    {
      icon: <Utensils className="w-10 h-10 text-restaurant-600" />,
      title: "Fusion Recipes",
      description: "Experience the perfect blend of traditional South Indian recipes with modern culinary techniques."
    },
    {
      icon: <Award className="w-10 h-10 text-restaurant-600" />,
      title: "Quality Assurance",
      description: "Our chefs maintain the highest standards of quality and cleanliness in food preparation."
    },
    {
      icon: <Clock className="w-10 h-10 text-restaurant-600" />,
      title: "Quick Service",
      description: "Enjoy prompt service without compromising on the authentic taste and quality of our food."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      text: "The dosas are crispy, the idlis are soft, and the sambhar is just perfect! Reminds me of home.",
      author: "Priya S.",
      rating: 5
    },
    {
      text: "Best South Indian breakfast in town! The filter coffee is to die for!",
      author: "Rahul M.",
      rating: 5
    },
    {
      text: "Authentic taste and quick service. Perfect for my busy college mornings.",
      author: "Aditya K.",
      rating: 4
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-restaurant-950 mb-4">
                Authentic South Indian <span className="text-restaurant-600">Cuisine</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:max-w-md">
                Experience the true flavors of South India with our traditional recipes passed down through generations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
                >
                  <Link to="/menu">
                    View Our Menu <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                >
                  <Link to="/signup">
                    Create Account
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="South Indian Food Platter" 
                  className="rounded-lg shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 font-semibold">4.9/5 Rating</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 1000+ reviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What Makes Us Special
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At {businessInfo.name}, we take pride in offering an authentic culinary experience that combines tradition with innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-restaurant-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See what our regular customers have to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              className="border-restaurant-600 text-restaurant-600 hover:bg-restaurant-50"
            >
              <Link to="/menu">
                Explore Our Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-restaurant-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Experience Authentic South Indian Flavors?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Create an account now and enjoy exclusive deals, track your orders, and earn rewards with every visit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="bg-white text-restaurant-600 hover:bg-gray-100"
            >
              <Link to="/signup">
                Sign Up Now
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-restaurant-700"
            >
              <Link to="/menu">
                Browse Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
