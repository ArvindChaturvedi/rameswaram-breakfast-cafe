
import { create } from 'zustand';
import { toast } from "sonner";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular?: boolean;
  veg?: boolean;
}

export interface BasketItem extends MenuItem {
  quantity: number;
}

interface BasketStore {
  items: BasketItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
}

export const useBasketStore = create<BasketStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (item: MenuItem) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((i) => i.id === item.id);
    
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      }));
    }
    
    toast.success(`Added ${item.name} to basket`);
  },
  
  removeItem: (id: string) => {
    const currentItems = get().items;
    const itemToRemove = currentItems.find((i) => i.id === id);
    
    if (!itemToRemove) return;
    
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
      totalItems: state.totalItems - itemToRemove.quantity,
      totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
    }));
  },
  
  updateQuantity: (id: string, quantity: number) => {
    const currentItems = get().items;
    const itemToUpdate = currentItems.find((i) => i.id === id);
    
    if (!itemToUpdate) return;
    
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    const quantityDiff = quantity - itemToUpdate.quantity;
    
    set((state) => ({
      items: state.items.map((i) => 
        i.id === id 
          ? { ...i, quantity } 
          : i
      ),
      totalItems: state.totalItems + quantityDiff,
      totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff),
    }));
  },
  
  clearBasket: () => {
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  },
}));
