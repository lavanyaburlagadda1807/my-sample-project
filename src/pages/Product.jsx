import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Product {id}</h1>
      <img
        src={`https://source.unsplash.com/random/600x400?sig=${id}`}
        alt={`Product ${id}`}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-gray-700 mb-4">Detailed description of product {id}...</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
