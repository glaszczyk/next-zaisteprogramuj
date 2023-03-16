import { CartItem } from '@/components/Cart/CartContext';

interface CartStorageService {
  getCart: (id: string) => CartItem[];
  setCart: (id: string, cart: CartItem[]) => void;
}

export const LocalStorageCartService: CartStorageService = {
  getCart: (id) => {
    const cartFromLocalStorage = localStorage.getItem(id);
    if (!cartFromLocalStorage) {
      return [];
    }
    return JSON.parse(cartFromLocalStorage);
  },
  setCart: (id, cart: CartItem[]) => {
    localStorage.setItem(id, JSON.stringify(cart));
  },
};
