import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockCartItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1580894894513-1a1d3ddf6a25'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="text-right mt-4">
            <p className="text-lg font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Your cart is currently empty.</p>
      )}
    </div>
  );
};

export default Cart;
