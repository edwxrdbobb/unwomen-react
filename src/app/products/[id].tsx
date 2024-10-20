// pages/products/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  productName: string;
  currentPrice: string;
  category: string;
  description: string;
  // Add other properties as necessary
}

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; 
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
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <p className="text-lg text-blue-500">Price: {product.currentPrice}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="mt-4">{product.description}</p>

      {/* You can reuse components like ProductImages, ProductDetails, SimilarProducts here */}
    </div>
  );
};

export default ProductDetailsPage;
