"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "./Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Business {
  id: number;
  uuid: string;
  businessName: string;
  businessLogo: string;
  businessEmail: string;
  businessPhoneNo: number;
  businessCategory: string;
}

interface ProductCardBusinessCategoryProps {
  category: string;
  size?: number;
}

const ProductCardBusinessCategory: React.FC<ProductCardBusinessCategoryProps> = ({category, size}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 24; 

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://unwomenmarketsquare.online/businessProfile-categories/${category}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // Ensure data is an array before setting it
        setBusinesses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setBusinesses([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [category]);

  // Calculate the index range for the current page
  const currentBusinesses = Array.isArray(businesses) 
    ? businesses.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
    : [];

  const totalPages = Math.ceil((Array.isArray(businesses) ? businesses.length : 0) / productsPerPage);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <section 
        className={
          size === 2 ? 
          "py-8 px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6"
          :
          "py-8 px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {currentBusinesses.map((business) => (
          <Link key={business.id} href={`/business/${business.uuid}`} passHref>
            <div className="bg-white rounded-lg shadow-lg p-4 flex h-auto">
              <img
                src={business.businessLogo || "fallback-image-url.jpg"}
                alt={business.businessName}
                className={
                  size === 3 ?
                    "h-[120px] w-[120px] object-cover rounded bg-gray-200" :
                    "h-[200px] w-[200px] object-cover rounded bg-gray-200" 
                }
              />
              <div className="ml-4 flex-1">
                {size === 3 ? (
                  <div>
                    <h4 className="mt-4 text-[14px] font-semibold text-black pb-2">{business.businessName}</h4>
                    <p className="text-blue-500 text-[12px] line-h-['2px'] pb-2">Email: {business.businessEmail}</p>
                    <p className="text-[12px] line-h-['2px'] text-gray-400 pb-2">Phone: <span className="font-bold text-black">{business.businessPhoneNo}</span></p>
                    <p className="text-[12px] line-h-['2px'] text-gray-400 pb-2">Category: <span className="font-bold text-black">{business.businessCategory}</span></p>
                  </div>
                ) : (
                  <div>
                    <h4 className="mt-4 text-lg font-semibold text-black pb-2">{business.businessName}</h4>
                    <p className="text-blue-500 pb-2">Email: {business.businessEmail}</p>
                    <p className="text-sm text-gray-400 pb-2">Phone: {business.businessPhoneNo}</p>
                    <p className="text-sm text-gray-400 pb-2">Category: {business.businessCategory}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {businesses.length > 0 && (
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

          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>

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
      )}
    </div>
  );
};

export default ProductCardBusinessCategory;
