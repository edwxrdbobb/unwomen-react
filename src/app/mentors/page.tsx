const mentors = [
    { name: 'Ms. Fatmata Musa', imgSrc: '/path/to/image1.jpg' },
    { name: 'Laila Sarah Jones', imgSrc: '/path/to/image2.jpg' },
    { name: 'David M.S Bangura', imgSrc: '/path/to/image3.jpg' },
    { name: 'Jariatu Salima Kamara', imgSrc: '/path/to/image4.jpg' },
  ];
  
  export default function Mentors() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6 text-black">Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <img
                src={mentor.imgSrc}
                alt={mentor.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-center text-lg font-bold">{mentor.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
  