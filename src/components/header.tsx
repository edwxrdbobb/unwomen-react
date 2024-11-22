'use client'

import Image from "next/image"
import logo from '@/images/unwomenlogo.png'
import { useEffect, useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import Link from "next/link"
import { useAuth } from '@/context/AuthContext'

export default function Component() {
  const { user, loading } = useAuth()
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    // Update cart and wishlist counts
    const updateCounts = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
      const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setCartCount(cartItems.length)
      setWishlistCount(wishlistItems.length)
    }

    // Initial count
    updateCounts()

    // Listen for storage changes
    window.addEventListener('storage', updateCounts)

    // Cleanup
    return () => window.removeEventListener('storage', updateCounts)
  }, [])

  const renderProfileImage = () => {
    if (user && user.profileImage) {
      return <img className="rounded-full w-[30px] h-[30px]" src={user.profileImage} alt={user.name} />
    }
    return (
      <div className="rounded-full w-[30px] h-[30px] flex items-center justify-center bg-gray-300">
        <span className="text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
      </div>
    )
  }

  const renderAuthLinks = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
        </div>
      )
    }

    if (user) {
      return (
        <>
          <a href="/wishlist" className="text-gray-600 text-xs flex items-center relative">
            <Heart className="w-4 h-4 mr-1" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {wishlistCount}
              </span>
            )}
          </a>
          <a href="/cart" className="text-gray-600 text-xs flex items-center relative">
            <ShoppingCart className="w-4 h-4 mr-1" />
            My Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {cartCount}
              </span>
            )}
          </a>
          {user.role === 'Vendor' ? (
            <a href="/user/dashboard/vendor" className="text-gray-600 text-xs flex items-center">
              {renderProfileImage()}
              <span className="ml-2 text-blue-800 font-bold">{user.name} - Dashboard</span>
            </a>
          ) : (
            <a href="/user/profile" className="text-gray-600 text-xs flex items-center">
              {renderProfileImage()}
              <span className="ml-2 text-black font-bold">{user.name}</span>
            </a>
          )}
        </>
      )
    }

    return (
      <>
        <a href="/auth/login" className="text-gray-600 text-xs">
          Login
        </a>
        <a href="/auth/signup" className="text-gray-600 text-xs">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Sign Up</button>
        </a>
      </>
    )
  }

  return (
    <div className="bg-white main-navbar">
      <header className="flex justify-between items-center p-4 bg-white shadow-md border-solid border-b border-x-0 border-gray-200">
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src={logo} 
            alt="UN Women Logo" 
            width={50} 
            height={50} 
            className="w-auto h-auto"
          />
          <h1 className="text-lg font-bold text-blue-300">UN Women</h1>
        </Link>
        <div className="search-wrapper w-[45%]">
          <form action="#" className="search-form w-full">
            <div className="input-holder w-full">
              <input
                type="text"
                id="searchInput"
                className="search-input rounded-md px-4 py-2 border-solid border-gray-200 border w-full text-xs"
                placeholder="Search Products"
              />
            </div>
          </form>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-gray-600 text-xs">
            Home
          </a>
          <a href="/products/shop" className="text-gray-600 text-xs">
            Store
          </a>
          {!loading && user && user.role === 'Vendor' && (
            <a href="/mentors" className="text-gray-600 text-xs">
              Mentor
            </a>
          )}
          {renderAuthLinks()}
        </nav>
      </header>
      <div className="category-nav py-4 px-2 bg-white border-solid border-b border-x-0 border-gray-200">
        <div className="flex justify-between items-center">
          <div className="category-drop">
            <button className="py-2 px-4 rounded-md bg-yellow-200 text-black text-sm">Business Categories</button>
          </div>
          <nav className="space-x-6">
            <Link href="/products/shop/category/business/SME" className="text-blue-700 font-600 text-md">
              SME
            </Link>
            <Link href="/products/shop/category/business/SOHO" className="text-blue-700 font-600 text-md">
              SOHO
            </Link>
            <Link href="/products/shop/category/business/MICRO" className="text-blue-700 font-600 text-md">
              MICRO
            </Link>
            <Link href="/products/shop/category/business/MACRO" className="text-blue-700 font-600 text-md">
              MACRO
            </Link>
          </nav>
          <div className="team-support">
            <div className="p-2">
              <p className="text-xs">call the team for support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

