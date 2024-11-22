"use client"

import { useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  role: string
  homeAddress: string
  phoneNo: string
  url: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userInfo = JSON.parse(atob(token.split('.')[1]))
      setUser(userInfo)
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Info */}
        <div className="bg-white overflow-hidden rounded-lg border p-6">
          <div className="flex items-center">
            <img
              src={user.url || "/placeholder.svg"}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.role}</p>
              <button className="mt-2 text-blue-600 text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white overflow-hidden rounded-lg border p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Contact Info
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-500">{user.homeAddress}</p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.phoneNo}</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm">
              Edit Address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

