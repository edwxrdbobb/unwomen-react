"use client";

import ProductDetails from '@/components/productDetails';
import ProductImages from '@/components/productImages';
import ProductStoreOwner from '@/components/productStoreOwner';
// import SimilarProducts from '@/components/similarProducts';
import {  useParams } from 'next/navigation'; // Import useParams hook
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
// import { toast } from 'react-hot-toast';

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
  user: {
    id: number;
    name: string;
    email: string;
    url: string;
  };
  // Add other properties as necessary
}

interface CartItem {
  id: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  productName: string;
  price: number;
  image: string;
}

// Explicitly declare the return type of the component as JSX.Element
const ProductDetailsPage: React.FC = (): JSX.Element => {
//   const router = useRouter();
  const params = useParams(); // Use useParams() to access the dynamic route
  const { id } = params; // Destructure the id from params
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch product data by ID
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://unwomenmarketsquare.online/products/${id}`);
          const data = await response.json();
          setProduct(data);
          
          // Check if product is in cart
          const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
          setIsInCart(cartItems.some((item: CartItem) => item.id === data.id));
          
          // Check if product is in wishlist
          const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
          setIsInWishlist(wishlistItems.some((item: WishlistItem) => item.id === data.id));
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);


  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <p>Product not found.</p>;
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
              productCategory={product.category}
              productLocation={product.productLocation}
            />

            {/* Add to Cart and Wishlist Buttons */}
            <div className="flex space-x-4">
              {/* <button
                onClick={addToCart}
                className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                  isInCart 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-yellow-400 text-white hover:bg-yellow-500'
                }`}
              >
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button> */}
            </div>

            <ProductStoreOwner
              storeName={'Store Owner'}
              storeLocation={'freetown'}
              storeId={1}
              profileImage={'userimg.png'}
            />
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
