import { useCartState } from '@/components/Cart/CartContext';
import { TrashIcon } from '@/components/Cart/TrashIcon';

const CartPage = () => {
  const cartState = useCartState();
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ul>
          {cartState.items.map((item, idx) => {
            return (
              <li
                key={`${item.title}_${idx}`}
                className="p-2 border-b-2 flex justify-between align-middle"
              >
                <p>{item.title}</p>
                <div className="flex align-middle">
                  <span>{item.price}</span>
                  <span className="ml-4">{item.count} szt.</span>
                  <button
                    className="ml-4 text-red-600"
                    onClick={() => {
                      cartState.removeFromCart(item.id);
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Podsumowanie koszyka</p>
        <p>
          Liczba produktów: <span>{cartState.items.length}</span>
        </p>
      </div>
    </div>
  );
};

export default CartPage;
