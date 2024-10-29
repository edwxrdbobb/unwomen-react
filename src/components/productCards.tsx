'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import Loader from "./Loader"
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Product {
  id: number
  uuid: string
  productName: string
  ProductImages: Array<{
    id: number
    uuid: string
    productImageOne: string
    productImageTwo: string
  }>
  currentPrice: number
  originalPrice: number
  category: string
  rating: number
  soldCount: number
  productLocation?: string
}

interface ProductCardProps {
  size?: number
}

interface CartItem {
  id: number;
  uuid: string;
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
}

export default function ProductCard({ size = 3 }: ProductCardProps) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const productsPerPage = 24

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("https://unwomenmarketsquare.online/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const addToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = existingCart.find((item: CartItem) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      toast.success('Item quantity updated in cart!');
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        id: product.id,
        uuid: product.uuid,
        productName: product.productName,
        price: product.currentPrice,
        image: product.ProductImages[0]?.productImageOne || '/placeholder.svg',
        quantity: 1
      };
      existingCart.push(cartItem);
      toast.success('Added to cart successfully!');
    }
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  const addToWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get existing wishlist items from localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if product already exists in wishlist
    if (!existingWishlist.find((item: WishlistItem) => item.id === product.id)) {
      const wishlistItem: WishlistItem = {
        id: product.id,
        uuid: product.uuid,
        productName: product.productName,
        price: product.currentPrice,
        image: product.ProductImages[0]?.productImageOne || '/placeholder.svg'
      };
      existingWishlist.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      toast.success('Added to wishlist successfully!');
    } else {
      toast.info('Item already in wishlist!');
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.uuid}`} passHref>
            <div className="backdrop-blur-sm bg-white/30 rounded-lg overflow-hidden shadow-sm 
              hover:bg-white hover:shadow-lg transition-all duration-300 h-[250px] relative
              group">
              <div className="action-overlay absolute bg-black-1/2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                style={{top: 5, right: 5}}>
                <button
                  onClick={(e) => addToCart(product, e)}
                  className="bg-white text-yellow-400 shadow-sm hover:text-black hover:bg-yellow-300 text-white mr-2 p-2 rounded-full transition-colors duration-300"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => addToWishlist(product, e)}
                  className="bg-white text-yellow-400 shadow-sm hover:text-black hover:bg-yellow-300 text-white p-2 rounded-full transition-colors duration-300"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <img
                src={
                  product.ProductImages && product.ProductImages.length > 0
                    ? product.ProductImages[0].productImageOne
                    : "/placeholder.svg"
                }
                alt={product.productName}
                className="w-full h-[135px] bg-gray-300 object-cover"
              />
              <div className="p-4" style={{lineHeight: 1}}>
                <h3 className="text-sm text-gray-800 truncate">{product.productName}</h3>
                <div className="flex items-center justify-between" style={{margin: '5px 0'}}>
                  <div>
                    <span className="text-md font-bold text-gray-700">Le {product.currentPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="text-indigo-400 text-xs">{product.productLocation}</span>
                  </div>
                  {/* Replace the nested Link with a span or div */}
                  <span 
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/products/shop/category/${product.category}`);
                    }}
                    className="bg-yellow-100 p-1 rounded-full cursor-pointer" 
                    style={{fontSize: 10}}
                  >
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 bg-yellow-200 hover:bg-yellow-300 text-black rounded-full transition-colors duration-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <span className="px-4 py-2 text-gray-600">Page <span className="text-blue-300">{currentPage}</span> of {totalPages}</span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 bg-yellow-200 hover:bg-yellow-300 text-black rounded-full transition-colors duration-300 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
