"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    role: '',
    phoneNo: '',
    homeAddress: '',
    file: null as File | null,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.file) {
      const objectUrl = URL.createObjectURL(formData.file);
      setFilePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setFilePreview(null);
    }
  }, [formData.file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('https://unwomenmarketsquare.online/users', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      toast.success(data.msg || 'Registration successful!');
      router.push('/auth/login'); // Redirect to login page
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while signing up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white my-14">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md border border-yellow-100">
        <h2 className="text-center text-2xl font-bold mb-4 text-blue-500">Register</h2>
        <p className="text-center mb-4 text-black">Create An Account With Us Today For Free</p>
        <div className="flex justify-center mb-4">
          <div 
            className="h-32 w-32 bg-gray-200 rounded-full shadow flex items-center justify-center overflow-hidden relative cursor-pointer"
            onClick={handleImageClick}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              ref={fileInputRef}
              required
            />
            {filePreview ? (
              <img
                src={filePreview}
                alt="File Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <p className="text-blue-500">Choose Cover</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Fullname"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Choose Role</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendors</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm Password"
              value={formData.confPassword}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="homeAddress"
              placeholder="Home Address"
              value={formData.homeAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-yellow-200 p-2 text-black font-bold rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
          <Link href={`/auth/login`}>
            <p className="text-center text-sm mt-4 text-blue-600 cursor-pointer">
              Already have an account? <b>Login</b>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

