import { useCartState } from '@/components/Cart/CartContext';

const CartPage = () => {
  const cartState = useCartState();
  return (
    <div>
      <ul>
        {cartState.items.map((item, idx) => {
          return (
            <li key={`${item.title}_${idx}`}>
              {item.title} - <span>{item.price}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartPage;
