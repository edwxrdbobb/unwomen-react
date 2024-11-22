"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = JSON.parse(atob(token.split('.')[1])); 
            setUser(userInfo);
        }
        console.log(JSON.stringify(user));
        
    }, [user]);

    return (
        <div className="flex max-w-6xl mx-auto py-10 px-4">
            <aside className="w-1/4 p-4 border-r">
                <nav className="space-y-4">
                    <button className="block w-full text-left text-gray-700 font-bold">Dashboard</button>
                    <button className="block w-full text-left text-gray-500">Wishlist</button>
                    <button className="block w-full text-left text-gray-500">Shopping Cart</button>
                    <button className="block w-full text-left text-gray-500">Settings</button>
                    <button className="block w-full text-left text-gray-500">Log-out</button>
                </nav>
            </aside>
            <main className="w-3/4 p-4">
                {user ? (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <img src={user.url} alt="Profile Picture" width={100} height={100} className="w-24 h-24 rounded-full object-cover mr-4 bg-gray-200" />
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-600">{user.name}</h2>
                                    <p className="text-gray-600">{user.role}</p>
                                    <button className="text-green-600 mt-2">Edit Profile</button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">Contact Info</h3>
                            <p className="text-gray-600 my-2">{user.homeAddress}</p>
                            <p className="text-gray-600 my-2">{user.email}</p>
                            <p className="text-gray-600 my-2">{user.phoneNo}</p>
                            <button className="text-green-600 mt-2">Edit Address</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-lg text-gray-600">Please log in to view your profile.</div>
                )}
            </main>
        </div>
    );
};

export default Profile;