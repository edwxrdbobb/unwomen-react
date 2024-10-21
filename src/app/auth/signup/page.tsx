"use client";
import { useState } from "react";

// pages/register.jsx
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    role: '',
    phoneNo: '',
    homeAddress: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confPassword) {
      alert("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('phoneNo', formData.phoneNo);
    formDataToSend.append('homeAddress', formData.homeAddress);
    formDataToSend.append('file', formData.file);

    try {
      const response = await fetch('https://unwomenmarketsquare.online/users', {
        method: 'POST',
        body: formDataToSend,
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the response text
        console.error('Error response:', errorText); // Log the error response
        alert(`Error: ${errorText}`); // Alert the user with the error message
        return;
      }

      const data = await response.json(); // Parse the response as JSON
      alert(data.msg); // Success message
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md border border-gray-300">
        <h2 className="text-center text-2xl font-bold mb-4 text-black">Register</h2>
        <p className="text-center mb-4 text-black">Create An Account With Us Today For Free</p>
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              required
            />
            <label htmlFor="file-upload" className="text-blue-500 cursor-pointer">Choose Cover</label>
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              {/* Add more roles as needed */}
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
          <button type="submit" className="w-full bg-yellow-400 p-2 text-white font-bold rounded">
            Submit
          </button>
          <p className="text-center text-sm mt-4 text-blue-500 cursor-pointer">
            Forgot Password
          </p>
        </form>
      </div>
    </div>
  );
}
