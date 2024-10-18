import React from "react";
import Image from "next/image";
import mac from "@/images/macbook.jpg"

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <div className="flex items-center">
          <Image src={mac} alt="profile" width={200} height={150}  className="w-32 h-32 rounded-lg object-cover mr-4" />
          <div>
            <h2 className="text-3xl font-bold">Furtune Christiana Turay</h2>
            <p className="text-lg mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-700 px-4 py-2 rounded-lg">Setting</button>
          <button className="bg-blue-700 px-4 py-2 rounded-lg">Share</button>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg">
            Become a Vendor
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ul className="flex space-x-6 border-b-2 pb-2">
          <li className="font-bold text-blue-700">Products</li>
          <li className="text-gray-500">Wish-List</li>
        </ul>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-lg">No Product Yet</p>
          <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg">
            Upload Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
