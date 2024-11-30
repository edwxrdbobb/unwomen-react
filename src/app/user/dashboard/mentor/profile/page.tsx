"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateProfileForm from './create/page'

interface User {
  id: number
  name: string
  email: string
  role: string
  homeAddress: string
  phoneNo: string
  url: string
  Active: boolean
}

interface MentorProfile {
  id: number
  description: string | null
  skills: string
  experience: string
  education: string
  languages: string
  availability: string
  linkedinProfile: string
  website: string
  noOfMentee: number
  user: User
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<MentorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch('https://unwomenmarketsquare.online/mentor/my-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          if (response.status === 404) {
            // Profile not found, redirect to create profile
            router.push('/dashboard/mentor/profile/create')
            return
          }
          throw new Error('Failed to fetch profile data')
        }

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  if (loading) {
    return <div className="space-y-6">
      <div className="h-12 w-[200px] bg-gray-200 animate-pulse" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-[200px] bg-gray-200 animate-pulse" />
        <div className="h-[200px] bg-gray-200 animate-pulse" />
      </div>
    </div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!profile || !profile.user.Active) {
    return <CreateProfileForm />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        {/* Profile Info */}
        <div className="p-6 border rounded-lg shadow">
          <div className="flex items-center">
            <img
              src={profile.user.url || "/placeholder.svg"}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-900">{profile.user.name}</h2>
              <p className="text-sm text-gray-500">{profile.user.role}</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 border rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Contact Info
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-500">{profile.user.homeAddress}</p>
                <p className="text-gray-500">{profile.user.email}</p>
                <p className="text-gray-500">{profile.user.phoneNo}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Edit Contact
            </button>
          </div>
        </div>
      </div>

      {/* Mentor Details */}
      <div className="grid grid-cols-1 gap-6">
        {/* About Me */}
        <div className="p-6 border rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">About Me</h3>
          <p className="text-gray-500">{profile.description || 'No description provided'}</p>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Experience</h3>
            <p className="text-gray-500">{profile.experience}</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
            <p className="text-gray-500">{profile.education}</p>
          </div>
        </div>

        {/* Skills & Languages */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
            <p className="text-gray-500">{profile.skills}</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Languages</h3>
            <p className="text-gray-500">{profile.languages}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
            <p className="text-gray-500">{profile.availability}</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Links</h3>
            <div className="space-y-2">
              <p className="text-gray-500">
                LinkedIn: <a href={profile.linkedinProfile} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{profile.linkedinProfile}</a>
              </p>
              <p className="text-gray-500">
                Website: <a href={profile.website} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{profile.website}</a>
              </p>
              <p className="text-gray-500">Number of Mentees: {profile.noOfMentee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

