"use client";

// import ProductDetails from '@/components/productDetails';
// import ProductImages from '@/components/productImages';
// import ProductStoreOwner from '@/components/productStoreOwner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

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
}

const EditProductPage: React.FC = (): JSX.Element => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://unwomenmarketsquare.online/products/${id}`);
          const data = await response.json();
          setProduct(data);
          setFormData(data); // Initialize form data with fetched product data
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        const response = await fetch(`https://unwomenmarketsquare.online/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Product updated successfully!');
        } else {
          alert('Failed to update product.');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className='container mx-auto my-8 min-h-[25rem]'>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container px-12 my-8">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData?.productName || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="currentPrice" className="block">Current Price</label>
          <input
            type="text"
            id="currentPrice"
            name="currentPrice"
            value={formData?.currentPrice || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData?.description || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData?.category || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="productLocation" className="block">Product Location</label>
          <input
            type="text"
            id="productLocation"
            name="productLocation"
            value={formData?.productLocation || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
