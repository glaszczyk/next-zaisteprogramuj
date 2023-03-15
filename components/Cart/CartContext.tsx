import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addToCart: (item: CartItem) => void;
  readonly removeFromCart: (item: CartItem) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (existingItem) => existingItem.title === item.title
      );
      if (!existingItem) {
        return [...prevState, item];
      }
      return prevState.map((existingItem) => {
        if (existingItem.title === item.title) {
          return { ...existingItem, count: existingItem.count + 1 };
        }
        return existingItem;
      });
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((prevState) => {
      return prevState
        .filter((existingItem) => existingItem.count > 1)
        .map((existingItem) => {
          if (existingItem.title === item.title) {
            return { ...existingItem, count: existingItem.count - 1 };
          }
          return existingItem;
        });
    });
  };

  const contextValue = {
    items: cartItems,
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
