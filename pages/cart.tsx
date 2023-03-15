import { useCartState } from '@/components/Cart/CartContext';

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
                className="p-2 border-b-2 flex justify-between"
              >
                <p>{item.title}</p>
                <div>
                  <span>{item.price}</span>
                  <button
                    className="ml-4 text-red-600"
                    onClick={() => {
                      console.log('Product removed');
                    }}
                  >
                    Usuń
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
