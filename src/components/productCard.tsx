import React from 'react';
import Image from 'next/image';
import img from '@/images/macbook.jpg';
import { Product } from '@/types/products'; // Adjust the path as necessary

interface ProductCardProps {
  product: Product; // Use the Product type here
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <Image src={img} alt={product.name} width={200} height={150} className="w-full h-40 object-cover rounded" />
      <h2 className="font-semibold text-lg mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-xl font-bold mt-2">NLE {product.price}</p>
      <button className="bg-yellow-500 text-white w-full py-2 rounded mt-4">Buy this product</button>
    </div>
  );
}