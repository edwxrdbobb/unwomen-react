"use client";
import { useState, useEffect } from 'react';

interface Category {
  name: string;
  icon: string;
}

const CategoryHorizontal = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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
        setCategories(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <section className="py-8 px-4">
        <h3 className="text-xl text-black mb-6">Search by category</h3>
        <div className="flex flex-wrap gap-4">
          {categories.map((category, key) => (
            <button key={key} className="flex flex-col items-center px-4 py-2">
              <img src={category.icon} alt={category.name} className="mb-1 text-" />
              <span className="text-black text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryHorizontal;
