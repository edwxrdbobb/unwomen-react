"use client";

import { Heart, MessageCircleMore, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ProductDetailsProps {
  id: number;
  name: string;
  price: string;
  description: string;
  productLocation: string;
  productCategory: string;
  productImage: string;
  uuid: string;
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
  uuid: string;
  productName: string;
  price: number;
  image: string;
  category?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  id, 
  name, 
  price, 
  description, 
  productCategory, 
  productLocation,
  productImage,
  uuid
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if product is in cart
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(cartItems.some((item: CartItem) => item.id === id));
    
    // Check if product is in wishlist
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlistItems.some((item: WishlistItem) => item.id === id));
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: CartItem) => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      toast.success('Item quantity updated in cart!');
    } else {
      const cartItem: CartItem = {
        id,
        productName: name,
        price: Number(price),
        image: productImage,
        quantity: 1
      };
      existingCart.push(cartItem);
      toast.success('Added to cart successfully!');
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setIsInCart(true);
    
    // Trigger storage event for header count update
    window.dispatchEvent(new Event('storage'));
  };

  const addToWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!existingWishlist.find((item: WishlistItem) => item.id === id)) {
      const wishlistItem: WishlistItem = {
        id,
        uuid,
        productName: name,
        price: Number(price),
        image: productImage,
        category: productCategory
      };
      existingWishlist.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      toast.success('Added to wishlist successfully!');
      setIsInWishlist(true);
      
      // Trigger storage event for header count update
      window.dispatchEvent(new Event('storage'));
    } else {
      toast.error('Item already in wishlist!');
    }
  };
  return (
    <div className="w-full lg:w-2/3 space-y-6">
      <h1 className="text-3xl font-semibold text-black">{name}</h1>
      <p className="text-2xl font-bold text-yellow-500">NLE {price}</p>
      <div className="flex space-x-4">
        <button 
          onClick={addToCart}
          className={`px-6 py-3 rounded-full transition-colors duration-300 ${
            isInCart 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-yellow-200 text-black hover:bg-yellow-300'
          }`}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button 
          className={`px-6 py-3 rounded-full transition-colors duration-300 bg-blue-400 text-white hover:bg-blue-500`}
        >
         Buy this product now
        </button>
      </div>
      <p className='text-black'>{description}</p>
      <div>
        <h3 className="font-semibold text-black">Optional Details</h3>
        <ul className="list-disc list-inside">
          <li className='text-black'>Category: <Link href={`/products/shop/category/${productCategory}`}>{productCategory}</Link></li>
          <li className='text-black'>Product Location: {productLocation}</li>
        </ul>
      </div>

      <div className="flex space-x-4 items-center">
        <button className="flex items-center text-gray-600">
          <MessageCircleMore className="w-5 h-5" />
          <span className="ml-2">Chat</span>
        </button>
        <button onClick={addToWishlist} className={`flex items-center ${
            isInWishlist 
              ? 'text-green-500 hover:text-green-600' 
              : 'text-gray-600 hover:text-gray-400'
          }`} >
          <Heart className="w-5 h-5" />
          <span className="ml-2">
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </span>
        </button>
        <button className="flex items-center text-gray-600">
          <SquareArrowOutUpRight className="w-5 h-5" />
          <span className="ml-2">Share</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
