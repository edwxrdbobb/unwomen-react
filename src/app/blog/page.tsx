import React from "react";
import Image from "next/image";

const Blog = () => {
  const blogs = [
    {
      image: "/path/to/image1.jpg",
      title: "Leone Makeover is offering a 35% this weekend",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "20 min ago",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Saint Mary Supermarket is now on UN Women Market",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "2 hrs ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div key={index} className="flex bg-white shadow-md rounded-lg p-4">
             <Image src={blog.image} alt={blog.title} width={200} height={150}  className="w-32 h-32 rounded-lg object-cover mr-4" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600">{blog.description}</p>
              <div className="text-right text-gray-400">{blog.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
