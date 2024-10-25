"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import macro from '@/images/MACRO.png';
import micro from '@/images/MICRO.jpeg';
import sme from '@/images/SME.jpg';
import soho from '@/images/SOHO.jpg';

import Link from 'next/link';

interface Category {
  category: string; // Updated to match the new data structure
}

const BusinessCategory = () => {
  const [categories, setCategories] = useState<Category[]>([
    { category: 'SME' },
    { category: 'MACRO' },
    { category: 'MICRO' },
    { category: 'SOHO' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null); // Create a ref for the scroll container

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://unwomenmarketsquare.online/distintproducts', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//         const data = await response.json();
//         setCategories(data.map((item: { category: string }) => ({ category: item.category }))); // Map to only include category
//         console.log(data);
        
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

   // New useEffect to log categories when they change
   useEffect(() => {
    console.log(`Category: ${categories}`);
  }, [categories]); // This will log categories whenever they change

  const categoryIconSelector = (category: string) => { // Changed parameter type to string
    switch (category) {
      case 'SOHO':
        return <Image width={200} height={100} className='rounded-full' src={soho} alt={category} />;
      case 'MACRO':
        return <Image width={200} height={100} className='rounded-full' src={macro} alt={category} />;
      case 'MICRO':
        return <Image width={200} height={100} className='rounded-full' src={micro} alt={category} />;
      case 'SME':
        return <Image width={200} height={100} className='rounded-full' src={sme} alt={category} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <section className="py-8 px-4">
        <h3 className="text-xl text-black mb-6">Search by Business</h3>
        <div className="flex items-center">
          <div ref={scrollRef} className="flex overflow-x-hidden whitespace-nowrap"> {/* Scroll container */}
            {categories.map((category, key) => (
            <Link key={key} href={`/products/shop/category/business/${category.category}`} passHref>
              <button key={key} className="flex flex-col items-center px-4 py-2">
                <span className="bg-gray-200 p-4 rounded-full m-2">
                  {categoryIconSelector(category.category)} 
                </span>
                <span className="text-black text-xs">{category.category}</span>
              </button>
            </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessCategory;
