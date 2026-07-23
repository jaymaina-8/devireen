import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

interface QuoteCartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  getSummary: () => {
    subtotal: number;
    itemCount: number;
    vatAmount: number;
    total: number;
  };
}

export const useQuoteCart = create<QuoteCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
            ),
            isOpen: true,
          };
        }
        return { 
          items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          isOpen: true,
        };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      getSummary: () => {
        const state = get();
        const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const vatAmount = subtotal * 0.16;
        const total = subtotal + vatAmount;
        
        return { itemCount, subtotal, vatAmount, total };
      },
    }),
    {
      name: 'devireen-quote-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
