"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import mac from "@/images/macbook.jpg";
import ProductCardIndividual from "@/components/ProductCardIndividual"; 

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = JSON.parse(atob(token.split('.')[1])); 
            setUser(userInfo);
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-blue-200 text-gray-700 p-6 rounded-lg">
                <div className="flex items-center">
                    <Image src={mac} alt="profile" width={200} height={150} className="w-32 h-32 rounded-lg object-cover mr-4" />
                    <div>
                        {user ? (
                            <>
                                <h2 className="text-3xl font-bold">{user.name}</h2>
                                <p className="text-lg mt-2">{user.email}</p>
                            </>
                        ) : (
                            <p className="text-lg mt-2">User not logged in</p>
                        )}
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-700 px-4 py-2 rounded-lg text-white">Setting</button>
                    <button className="bg-blue-700 px-4 py-2 rounded-lg text-white">Share</button>
                    <button className="bg-white text-blue-700 px-4 py-2 rounded-lg">Become a Vendor</button>
                </div>
            </div>
            <div className="mt-6">
                <ul className="flex space-x-6 border-b-2 pb-2">
                    <li className="font-bold text-blue-700">Products</li>
                    <li className="text-gray-500">Wish-List</li>
                </ul>
                <div className="mt-6">
                    {user ? (
                        <ProductCardIndividual userId={user.id} /> 
                    ) : (
                        <p className="text-gray-600 text-lg">No Products Available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
