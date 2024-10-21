"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  uuid: string,
  productName: string;
  ProductImages: Array<{
    id: number;
    uuid: string;
    productImageOne: string;
    productImageTwo: string;
  }>;
  currentPrice: string;
  category: string;
}

const ProductCardCategory = ({category}) => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 24; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://unwomenmarketsquare.online/products-by-categories/${category}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data); // Set the fetched products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage); // Total number of pages

  // Event handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <section className="py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
        <Link key={product.id} href={`/products/${product.uuid}`} passHref>
          <div className="bg-white rounded-lg shadow-lg p-4" key={product.id}>
            <img
              src={
                product.ProductImages && product.ProductImages.length > 0
                  ? product.ProductImages[0].productImageOne
                  : "fallback-image-url.jpg"
              }
              alt={product.productName}
              className="w-full h-[220px] object-cover rounded bg-gray-200"
            />
            <h4 className="mt-4 text-lg font-semibold text-black pb-2">{product.productName}</h4>
            <p className="text-blue-500 pb-2">Nle {product.currentPrice}</p>
            <p className="text-sm text-gray-400 pb-2">Category: {product.category}</p>
          </div>
        </Link>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCardCategory;
