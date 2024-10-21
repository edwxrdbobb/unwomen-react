// components/Sidebar.js
import React from 'react';
import CategoryVertical from './categoryVertical';

export default function Sidebar({currentCategory}) {
  return (
    <div className="w-64 p-4 bg-white ">
      <div className="category-filter shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">By Category</h2>
        <CategoryVertical currentCategory={currentCategory} />
      </div>

      <div className="price-filter rounded-md shadow-md p-4 mt-4 text-black">
        <h2 className="text-xl font-bold mt-6 mb-4">Pricing</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            1 - 100
          </label>
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            100 - 300
          </label>
        </div>
      </div>
    </div>
  );
}
