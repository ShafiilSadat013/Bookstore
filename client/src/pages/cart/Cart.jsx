import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={item.book_id}
                className="bg-slate-900 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h2>{item.title}</h2>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.book_id)}
                  className="text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-6 bg-red-600 px-6 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
