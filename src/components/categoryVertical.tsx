"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import fashionSVG from '@/images/SVGs/clothing-summer-svg.svg';
import beautySVG from '@/images/SVGs/makeup-woman-svg.svg';
import apparelSVG from '@/images/SVGs/clothes-svg.svg';
import foodSVG from '@/images/SVGs/food-svg.svg';
import stationarySVG from '@/images/SVGs/printer-svg.svg';
import serviceSVG from '@/images/SVGs/briefcase-svg.svg';
import householdSVG from '@/images/SVGs/bed-svg.svg';
import electronicSVG from '@/images/SVGs/laptop-svg.svg';
import questionSVG from '@/images/SVGs/question-circle-svg.svg';
import Link from 'next/link';

interface Category {
  category: string; // Updated to match the new data structure
}

interface CategoryVerticalProps {
  currentCategory: string; // New prop to receive the current category
}

const CategoryVertical: React.FC<CategoryVerticalProps> = ({ currentCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); // Create a ref for the scroll container

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://unwomenmarketsquare.online/distintproducts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        const data = await response.json();
        setCategories(data.map((item: { category: string }) => ({ category: item.category }))); // Map to only include category
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

   // New useEffect to log categories when they change
   useEffect(() => {
    console.log(`Category: ${categories}`);
  }, [categories]); // This will log categories whenever they change

  const categoryIconSelector = (category: string) => { // Changed parameter type to string
    switch (category) {
      case 'fashion':
        return <Image width={45} height={45} className='rounded-full' src={fashionSVG} alt={category} />;
      case 'Others':
        return <Image width={45} height={45} className='rounded-full' src={questionSVG} alt={category} />;
      case 'Beauty':
        return <Image width={45} height={45} className='rounded-full' src={beautySVG} alt={category} />;
      case 'Apparel':
        return <Image width={45} height={45} className='rounded-full' src={apparelSVG} alt={category} />;
      case 'Food':
        return <Image width={45} height={45} className='rounded-full' src={foodSVG} alt={category} />;
      case 'Stationary':
        return <Image width={45} height={45} className='rounded-full' src={stationarySVG} alt={category} />;
      case 'Services':
        return <Image width={45} height={45} className='rounded-full' src={serviceSVG} alt={category} />;
      case 'Household':
        return <Image width={45} height={45} className='rounded-full' src={householdSVG} alt={category} />;
      case 'Electronics':
        return <Image width={45} height={45} className='rounded-full' src={electronicSVG} alt={category} />;
      case 'Select Category':
        return <Image width={45} height={45} className='rounded-full' src={questionSVG} alt={category} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <section className="py-8 px-4">
        <h3 className="text-xl text-black mb-6">Search by category</h3>
        <div className="flex items-center">
          <div ref={scrollRef} className="flex flex-col overflow-y-auto whitespace-nowrap">
            {categories.map((category, key) => (
              <Link key={key} href={`/products/shop/category/${category.category}`} passHref>
                <button
                  className={`flex flex-col items-center px-4 py-2 ${currentCategory === category.category ? 'bg-blue-500' : 'bg-gray-200'}`} // Change background color based on currentCategory
                >
                  <span className="bg-gray-200 p-2 rounded-full m-2">
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

export default CategoryVertical;
