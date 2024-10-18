// components/Sidebar.js
import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">By Category</h2>
      <ul className="space-y-2">
        <li><a href="#" className="text-blue-600">All (1,253)</a></li>
        <li><a href="#" className="text-gray-600">Food & Agriculture (210)</a></li>
        <li><a href="#" className="text-gray-600">Clothing & Fashion (142)</a></li>
        {/* Add other categories here */}
      </ul>
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
        {/* Add other price ranges */}
      </div>
    </div>
  );
}
