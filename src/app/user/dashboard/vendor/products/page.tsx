"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Filter, Edit2 } from 'lucide-react'

interface ProductImage {
  productImageOne: string
  productImageTwo: string
  productImageThree: string | null
  productImageFour: string | null
  productImageFive: string | null
  productImageSix: string | null
}

interface Product {
  id: number
  uuid: string
  productName: string
  productLocation: string
  category: string
  currentPrice: number
  previousPrice: number
  discription: string
  DateCreated: string
  ProductImages: ProductImage[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch('https://unwomenmarketsquare.online/products-by-role', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <p className="text-sm text-gray-500">Total: {products.length} Products</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Product..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>Sort by: Date Created</option>
            <option>Sort by: Price</option>
            <option>Sort by: Name</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 text-center">
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-6">
          <div className="bg-white rounded-lg border">
            <div className="grid grid-cols-7 gap-4 p-4 border-b text-sm font-medium text-gray-500">
              <div>Image</div>
              <div>Title</div>
              <div>Category</div>
              <div>Location</div>
              <div>Current Price</div>
              <div>Previous Price</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-7 gap-4 p-4 text-sm text-gray-900 items-center"
                >
                  <div className="w-32 h-32 relative">
                    <img
                      src={product.ProductImages[0]?.productImageOne || "/placeholder.svg"}
                      alt={product.productName}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md bg-gray-200 w-full h-full object-cover p-2"
                    />
                  </div>
                  <div>{product.productName}</div>
                  <div>{product.category}</div>
                  <div>{product.productLocation}</div>
                  <div>Nle {product.currentPrice.toFixed(2)}</div>
                  <div>Nle {product.previousPrice.toFixed(2)}</div>
                  <div>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => router.push(`/vendor/products/edit/${product.id}`)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

