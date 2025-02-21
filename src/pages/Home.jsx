import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="container py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Simplified Amazon Clone</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div key={id} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={`https://source.unsplash.com/random/300x200?sig=${id}`}
              alt={`Product ${id}`}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">Product {id}</h2>
            <p className="text-gray-700 mb-4">Description of product {id}...</p>
            <Link to={`/product/${id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
