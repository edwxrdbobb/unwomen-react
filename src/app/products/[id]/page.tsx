"use client";

import ProductDetails from '@/components/productDetails';
import ProductImages from '@/components/productImages';
// import SimilarProducts from '@/components/similarProducts';
import {  useParams } from 'next/navigation'; // Import useParams hook
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  productName: string;
  currentPrice: string;
  category: string;
  description: string;
  productLocation: string;
  ProductImages: Array<{
    id: number;
    uuid: string;
    productImageOne: string;
    productImageTwo: string;
  }>;
  // Add other properties as necessary
}

// Explicitly declare the return type of the component as JSX.Element
const ProductDetailsPage: React.FC = (): JSX.Element => {
//   const router = useRouter();
  const params = useParams(); // Use useParams() to access the dynamic route
  const { id } = params; // Destructure the id from params
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch product data by ID
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://unwomenmarketsquare.online/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

    
  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap lg:flex-nowrap space-x-6">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <ProductImages images={product.ProductImages} />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 space-y-6">
            <ProductDetails
              name={product.productName}
              price={product.currentPrice}
              description={product.description}
              quantity={25}
              productLocation={product.productLocation}
            />

            {/* Icons: Chat, Add to Wishlist, Share */}
            <div className="flex space-x-4 items-center">
              <button className="flex items-center text-gray-600">
                <i className="fas fa-comment text-xl"></i>
                <span className="ml-2">Chat</span>
              </button>
              <button className="flex items-center text-gray-600">
                <i className="fas fa-heart text-xl"></i>
                <span className="ml-2">Add to Wishlist</span>
              </button>
              <button className="flex items-center text-gray-600">
                <i className="fas fa-share text-xl"></i>
                <span className="ml-2">Share</span>
              </button>
            </div>

            {/* Store and User Information */}
            <div className="flex items-center p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* Placeholder for profile image */}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Kadric Gadget</h4>
                <p className="text-gray-500">Store Location: Lumley, Regent Road</p>
              </div>
              <div className="ml-auto">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Follow</button>
                <button className="ml-2 border px-4 py-2 rounded-lg">Visit Store</button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-black">Description</h2>
          <p className="mt-4">
           {product.description}
          </p>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          {/* <SimilarProducts products={similarProducts} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
