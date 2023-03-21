import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LocalStorageCartService } from '@/components/Cart/CartStorageService';

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addToCart: (item: CartItem) => void;
  readonly removeFromCart: (id: CartItem['id']) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

const SHOP_KEY = 'COURSE_SHOPPING_CART';

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(LocalStorageCartService.getCart(SHOP_KEY));
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    LocalStorageCartService.setCart(SHOP_KEY, cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevState = []) => {
      const existingItem = prevState?.find(
        (existingItem) => existingItem.id === item.id
      );
      if (!existingItem) {
        return [...prevState, item];
      }
      return prevState?.map((existingItem) => {
        if (existingItem.id === item.id) {
          return { ...existingItem, count: existingItem.count + 1 };
        }
        return existingItem;
      });
    });
  };

  const removeFromCart = (id: CartItem['id']) => {
    setCartItems((prevState = []) => {
      return prevState
        .map((existingItem) => {
          if (existingItem.id === id) {
            return { ...existingItem, count: existingItem.count - 1 };
          }
          return existingItem;
        })
        .filter((existingItem) => existingItem.count > 0);
    });
  };

  const contextValue = {
    items: cartItems || [],
    addToCart,
    removeFromCart,
  };

  return (
    <CartStateContext.Provider value={contextValue}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error('You forgot CartStateContextProvider');
  }
  return cartState;
};
