"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  uuid: string;
  productName: string;
  ProductImages: Array<{
    id: number;
    uuid: string;
    productImageOne: string;
    productImageTwo: string;
  }>;
  currentPrice: string;
  category: string;
  description: string; 
}

// const ProductCardIndividual = ({ userId }) => { 
const ProductCardIndividual = () => { 

    const userId = 400;
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (userId) {
        try {
          const response = await fetch(`https://unwomenmarketsquare.online/individualProducts/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProducts(data); // Set the fetched products to state
          } else {
            console.error('Failed to fetch products:', response.statusText);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [userId]);

  if (products.length === 0) {
    return <p>No Products Available</p>; // Loading state
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
         <Link key={product.id} href={`/products/${product.uuid}`} passHref>
        <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
          <img
            src={product.ProductImages && product.ProductImages.length > 0
              ? product.ProductImages[0].productImageOne
              : "fallback-image-url.jpg"}
            alt={product.productName}
            className="w-full h-[220px] object-cover rounded bg-gray-200"
          />
          <h4 className="mt-4 text-lg font-semibold text-black">{product.productName}</h4>
          <p className="text-blue-500">Nle {product.currentPrice}</p>
          <p className="text-sm text-gray-400">Category: {product.category}</p>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCardIndividual;
