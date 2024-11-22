"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

interface FormData {
  productName: string
  productLocation: string
  discription: string
  category: string
  previousPrice: string
  currentPrice: string
  [key: string]: string | File | null
}

export default function CreateProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productLocation: '',
    discription: '',
    category: '',
    previousPrice: '',
    currentPrice: '',
    productImageOne: null,
    productImageTwo: null,
    productImageThree: null,
    productImageFour: null,
    productImageFive: null,
    productImageSix: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size <= maxSize) {
        setFormData(prev => ({ ...prev, [controlName]: file }))
      } else {
        alert('Please select an image that is less than 5MB in size.')
        event.target.value = ''
      }
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingMessage('Creating your Product...')

    const submitFormData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) {
          submitFormData.append(key, value, value.name)
        } else {
          submitFormData.append(key, value)
        }
      } else if (key.startsWith('productImage')) {
        // Append empty string for null image fields
        submitFormData.append(key, '')
      }
    })

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication token is missing or expired')
      }

      const response = await fetch('https://unwomenmarketsquare.online/productsAndProductImages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitFormData,
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      const result = await response.json()
      console.log('Product created successfully:', result)
      router.push('/user/dashboard/vendor/products')
    } catch (error) {
      console.error('Error creating Product:', error)
      alert('Failed to create product. Please try again.')
    } finally {
      setIsLoading(false)
      setLoadingMessage('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Product</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="productLocation" className="block text-sm font-medium text-gray-700">Product Location</label>
            <input
              type="text"
              id="productLocation"
              name="productLocation"
              value={formData.productLocation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="previousPrice" className="block text-sm font-medium text-gray-700">Previous Price</label>
            <input
              type="text"
              id="previousPrice"
              name="previousPrice"
              value={formData.previousPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Current Price</label>
            <input
              type="text"
              id="currentPrice"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="discription" className="block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            id="discription"
            name="discription"
            value={formData.discription}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Upload product images</h2>
          <p className="text-sm text-gray-500 mb-1">Click on box to add product image</p>
          <p className="text-sm text-gray-500 mb-4">
            Note: <span className="text-orange-500">image 1 & 2 are required</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((num, index) => (
              <div
                key={num}
                className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden"
              >
                <label className="cursor-pointer w-full h-full flex items-center justify-center">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelected(e, `productImage${num}`)}
                    ref={el => fileInputRefs.current[index] = el}
                  />
                  {formData[`productImage${num}`] ? (
                    <img
                      src={URL.createObjectURL(formData[`productImage${num}`] as File)}
                      alt={`Product ${num}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Plus className="h-6 w-6 text-gray-400" />
                  )}
                </label>
                <div className="absolute -top-3 -left-3 bg-white rounded-full w-6 h-6 flex items-center justify-center border">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? loadingMessage : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

