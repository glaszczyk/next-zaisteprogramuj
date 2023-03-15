import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  price: number;
  title: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      price: 20,
      title: 'My item',
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevState) => [...prevState, item]);
  };

  const contextValue = {
    items: cartItems,
    addToCart,
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
