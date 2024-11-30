"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  description: string
  skills: string
  experience: string
  education: string
  languages: string
  availability: string
  linkedinProfile: string
  website: string
  noOfMentee: number
}

export default function CreateProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    skills: "",
    experience: "",
    education: "",
    languages: "",
    availability: "",
    linkedinProfile: "",
    website: "",
    noOfMentee: 0
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch('https://unwomenmarketsquare.online/mentor-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create profile')
      }

      router.push('/dashboard/mentor/profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create Your Mentor Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            id="education"
            name="education"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.education}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages</label>
          <input
            type="text"
            id="languages"
            name="languages"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
          <input
            type="text"
            id="availability"
            name="availability"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            id="linkedinProfile"
            name="linkedinProfile"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="noOfMentee" className="block text-sm font-medium text-gray-700">Number of Mentees</label>
          <input
            type="number"
            id="noOfMentee"
            name="noOfMentee"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.noOfMentee}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  )
}

