
import { MenuItem } from '../store/basketStore';

export const menuCategories = [
  { id: 'dosa', name: 'Dosa' },
  { id: 'idli', name: 'Idli' },
  { id: 'vadai', name: 'Vadai' },
  { id: 'rice', name: 'Rice Varieties' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'beverages', name: 'Beverages' },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Plain Dosa",
    description: "Crispy rice crepe served with sambar and chutney",
    price: 60,
    category: "dosa",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "2",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with sambar and chutney",
    price: 90,
    category: "dosa",
    image: "https://plus.unsplash.com/premium_photo-1683657860377-3811a31b8d48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    veg: true
  },
  {
    id: "3",
    name: "Ghee Roast Dosa",
    description: "Extra crispy dosa roasted with ghee, served with sambar and chutney",
    price: 100,
    category: "dosa",
    image: "https://images.unsplash.com/photo-1667037229257-a0a06c4f4c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "4",
    name: "Onion Dosa",
    description: "Dosa topped with chopped onions, served with sambar and chutney",
    price: 90,
    category: "dosa",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "5",
    name: "Rava Dosa",
    description: "Crispy semolina dosa with a unique texture, served with sambar and chutney",
    price: 95,
    category: "dosa",
    image: "https://plus.unsplash.com/premium_photo-1668144590034-b8f3aedb2044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "6",
    name: "Idli",
    description: "Steamed rice cakes served with sambar and chutney",
    price: 50,
    category: "idli",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    veg: true
  },
  {
    id: "7",
    name: "Mini Idli Sambar",
    description: "Tiny idlis immersed in flavored sambar",
    price: 80,
    category: "idli",
    image: "https://images.unsplash.com/photo-1637502302671-a14a11269b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "8",
    name: "Rava Idli",
    description: "Semolina idli with a different texture, served with sambar and chutney",
    price: 70,
    category: "idli",
    image: "https://plus.unsplash.com/premium_photo-1673708179438-8584c8120323?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "9",
    name: "Medu Vada",
    description: "Crispy lentil donuts served with sambar and chutney",
    price: 60,
    category: "vadai",
    image: "https://images.unsplash.com/photo-1626776876729-bab4991d07e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    veg: true
  },
  {
    id: "10",
    name: "Sambar Vada",
    description: "Medu vada soaked in hot sambar",
    price: 75,
    category: "vadai",
    image: "https://images.unsplash.com/photo-1689091050792-03c153fdcc78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "11",
    name: "Curd Vada",
    description: "Medu vada soaked in seasoned yogurt",
    price: 75,
    category: "vadai",
    image: "https://images.unsplash.com/photo-1605888649693-282d1e3dc247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "12",
    name: "Vegetable Biryani",
    description: "Fragrant rice cooked with mixed vegetables and spices",
    price: 130,
    category: "rice",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "13",
    name: "Curd Rice",
    description: "Soft rice mixed with yogurt and tempering, served with pickle",
    price: 90,
    category: "rice",
    image: "https://images.unsplash.com/photo-1630409351217-bc4cf83945a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "14",
    name: "Lemon Rice",
    description: "Rice flavored with lemon juice, mustard seeds, and curry leaves",
    price: 90,
    category: "rice",
    image: "https://images.unsplash.com/photo-1596952954288-16862d37405b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "15",
    name: "Tomato Rice",
    description: "Rice cooked with tomatoes, onions, and spices",
    price: 90,
    category: "rice",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "16",
    name: "Pongal",
    description: "Rice and lentils cooked together with pepper, cumin, and ghee",
    price: 90,
    category: "rice",
    image: "https://plus.unsplash.com/premium_photo-1664648005496-936e65e4c1ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    veg: true
  },
  {
    id: "17",
    name: "Upma",
    description: "Semolina cooked with vegetables and spices",
    price: 70,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "18",
    name: "Puri Bhaji",
    description: "Fried bread served with potato curry",
    price: 90,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "19",
    name: "Masala Chai",
    description: "Spiced tea with milk",
    price: 30,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  },
  {
    id: "20",
    name: "Filter Coffee",
    description: "Traditional South Indian coffee",
    price: 40,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    veg: true
  },
  {
    id: "21",
    name: "Buttermilk",
    description: "Spiced yogurt drink with curry leaves and mustard seeds",
    price: 35,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1626200925643-241b10cf381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    veg: true
  }
];

export const businessInfo = {
  name: "Rameswaram Breakfast Cafe",
  shortName: "Rameswaram Breakfast Cafe",
  address: "Near Bhawani Dham hostel, Indrapuri, Bhopal",
  phone: "+91 7406062351",
  email: "Arvind.Chaturvedi1092@gmail.com",
  whatsapp: "+917406062351",
  upiId: "rohitkuyare@abcdbank",
  openingHours: {
    monday: "3:00 AM - 10:00 PM",
    tuesday: "3:00 AM - 10:00 PM",
    wednesday: "3:00 AM - 10:00 PM",
    thursday: "3:00 AM - 10:00 PM",
    friday: "3:00 AM - 10:00 PM",
    saturday: "3:00 AM - 11:00 PM",
    sunday: "3:00 AM - 11:00 PM",
  },
};
