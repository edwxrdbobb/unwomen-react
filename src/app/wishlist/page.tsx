'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBasket, Trash } from 'lucide-react';

interface WishlistItem {
  id: number;
  uuid: string;
  productName: string;
  price: number;
  image: string;
  category?: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(items);
    console.log(items);
    
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (e: React.MouseEvent, itemId: number) => {
    e.preventDefault(); // Prevent Link navigation
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    toast.success('Item removed from wishlist');
    
    // Trigger storage event for header count update
    window.dispatchEvent(new Event('storage'));
  };

  const moveToCart = (e: React.MouseEvent, item: WishlistItem) => {
    e.preventDefault(); // Prevent Link navigation
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add item to cart with quantity 1
    existingCart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Remove from wishlist
    removeFromWishlist(e, item.id);
    
    toast.success('Item moved to cart');
    
    // Trigger storage event for header count update
    window.dispatchEvent(new Event('storage'));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-black">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {wishlistItems.map((item) => (
            <Link key={item.id} href={`/products/${item.uuid}`} passHref>
              <div className="backdrop-blur-sm bg-white/30 rounded-lg overflow-hidden shadow-sm 
                hover:bg-white hover:shadow-lg transition-all duration-300 h-[300px] relative
                group">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.productName}
                  className="w-full h-[135px] bg-gray-300 object-cover"
                />
                <div className="p-4" style={{lineHeight: 1}}>
                  <h3 className="text-sm text-gray-800 truncate">{item.productName}</h3>
                  <div className="flex items-center justify-between" style={{margin: '5px 0'}}>
                    <div>
                      <span className="text-md font-bold text-gray-700">Le {item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* {item.category && (
                    <div className="flex items-center justify-end text-sm text-gray-600">
                      <span 
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/products/shop/category/${item.category}`);
                        }}
                        className="bg-yellow-100 p-1 rounded-full cursor-pointer" 
                        style={{fontSize: 10}}
                      >
                        {item.category}
                      </span>
                    </div>
                  )} */}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={(e) => removeFromWishlist(e, item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                    <button
                      className="bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-yellow-400"
                      onClick={(e) => moveToCart(e, item)}
                    >
                      <ShoppingBasket />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
