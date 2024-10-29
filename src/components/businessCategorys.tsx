"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import macro from '@/images/MACRO.png';
import micro from '@/images/MICRO.jpeg';
import sme from '@/images/SME.jpg';
import soho from '@/images/SOHO.jpg';

import Link from 'next/link';

interface Category {
  category: string;
}

const BusinessCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Move the categories data outside of useEffect
  const businessCategories = [
    { category: 'SME' },
    { category: 'MACRO' },
    { category: 'MICRO' },
    { category: 'SOHO' }
  ];
  
  useEffect(() => {
    setCategories(businessCategories);
  }, []); // Empty dependency array to run only once

  const categoryIconSelector = (category: string) => {
    switch (category.toUpperCase()) {
      case 'SOHO':
        return <Image width={100} height={100} className='rounded-full w-auto h-auto' src={soho} alt={category} />;
      case 'MACRO':
        return <Image width={100} height={100} className='rounded-full w-auto h-auto' src={macro} alt={category} />;
      case 'MICRO':
        return <Image width={100} height={100} className='rounded-full w-auto h-auto' src={micro} alt={category} />;
      case 'SME':
        return <Image width={100} height={100} className='rounded-full w-auto h-auto' src={sme} alt={category} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <section className="py-8 px-4">
        <h3 className="text-xl text-black mb-6">Search by Business</h3>
        <div className="flex items-center">
          <div ref={scrollRef} className="flex overflow-x-hidden whitespace-nowrap">
            {categories.map((category, index) => (
              <Link 
                key={`${category.category}-${index}`} 
                href={`/products/shop/category/business/${category.category}`} 
                passHref
              >
                <button className="flex flex-col items-center px-4 py-2">
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
