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

interface BusinessCategoryVerticalProps {
  currentCategory: string; // New prop to receive the current category
}

const BusinessCategoryVertical: React.FC<BusinessCategoryVerticalProps> = ({ currentCategory }) => {
    
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

   useEffect(() => {
    console.log(`Category: ${categories}`);
  }, [categories]);

  const categoryIconSelector = (category: string) => { // Changed parameter type to string
    switch (category) {
      case 'SOHO':
        return <Image width={50} height={50} className='rounded-full' src={soho} alt={category} />;
      case 'MACRO':
        return <Image width={50} height={50} className='rounded-full' src={macro} alt={category} />;
      case 'MICRO':
        return <Image width={50} height={50} className='rounded-full' src={micro} alt={category} />;
      case 'SME':
        return <Image width={50} height={50} className='rounded-full' src={sme} alt={category} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <section className="mb-8 p-4">
        <h3 className="text-lg text-black mb-6 font-bold">Search by Business</h3>
        <div className="">
          
          <div ref={scrollRef} className="flex flex-col overflow-y-auto whitespace-nowrap">
            {categories.map((category, key) => (
              <Link key={key} href={`/products/shop/category/business/${category.category}`} passHref>
                <button
                  className={`flex flex-row items-center p-[5px] my-2 w-[200px] h-[50px] rounded-md ${currentCategory === category.category ? 'bg-blue-500 text-white' : 'bg-white'}`} 
                  style={{border: '1px solid #e5e7eb'}}
                >
                  <span className="bg-gray-200 rounded-full m-2">
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

export default BusinessCategoryVertical;
