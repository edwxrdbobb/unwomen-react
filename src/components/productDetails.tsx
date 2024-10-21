import React from 'react';

interface ProductDetailsProps {
  name: string;
  price: string;
  description: string;
  quantity: number;
  productLocation: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price, description, quantity, productLocation }) => {
  return (
    <div className="w-full lg:w-2/3 space-y-6">
      <h1 className="text-3xl font-semibold text-black">{name}</h1>
      <p className="text-2xl font-bold text-yellow-500">NLE {price}</p>
      <div className="flex space-x-4">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg">Buy this product</button>
        <button className="border border-gray-400 px-6 py-3 rounded-lg">Add To Cart</button>
      </div>
      <p className='text-black'>{description}</p>
      <div>
        <h3 className="font-semibold font-black">Optional Details</h3>
        <ul className="list-disc list-inside">
          <li className='text-black'>Quantity: {quantity}</li>
          <li className='text-black'>Product Location: {productLocation}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
