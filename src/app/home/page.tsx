import Image from 'next/image'
import prod_img from '@/images/macbook.jpg'
import ImageSlider from '@/components/ImageSlider'
import CategoryHorizontal from '@/components/categoryHorizontal';

export default function HomeScreen() {

  const images = [
    "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/5women.jpg",
    "https://africaexpo2020dubai.au.int/sites/default/files/styles/default/public/images/2021-03/african-woman.jpg?itok=84ORFocB",
    "https://i2.wp.com/commonwealthbc.com/wp-content/uploads/2021/03/iStock-1151111572.jpg?fit=1360%2C770",
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slider Banner Section */}
        <ImageSlider images={images} />

      {/* Category Section */}
        <CategoryHorizontal />

      {/* Product Listing Section */}
      <section className="py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Example of a product card */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <Image src={prod_img} alt="MacBook Pro" width={200} height={150} className="w-full h-40 object-cover rounded" />
          <h4 className="mt-4 text-lg font-semibold">MacBook Pro 2022 M2</h4>
          <p className="text-gray-500">NLe 32,000.00</p>
          <p className="text-sm text-gray-400">Category: Phones & Laptops</p>
        </div>
        {/* Repeat product cards */}
        {/* Example product cards can be looped */}
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About UN Women */}
          <div>
            <h5 className="font-semibold">About UN Women</h5>
            <p className="mt-4">
              UN Women is the UN organization delivering programs, policies and standards that uphold women’s rights.
            </p>
          </div>
          
          {/* Subscribe */}
          <div>
            <h5 className="font-semibold">Subscribe for our latest product news</h5>
            <form className="mt-4">
              <input type="email" className="p-2 rounded bg-gray-200" placeholder="example@mail.com" />
              <button className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold">Contact</h5>
            <p className="mt-4">Freetown Sierra Leone</p>
            <p>Email: info@unwomenmarketsquare.org</p>
            <p>Phone: +232 79 366 751</p>
          </div>

          {/* Opening Hours */}
          <div>
            <h5 className="font-semibold">Opening Hours</h5>
            <p className="mt-4">Mon - Thu: 8am - 9pm</p>
            <p>Fri - Sat: 8am - 1am</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2023 Copyright: UN Women Market Square</p>
        </div>
      </footer>
    </div>
  )
}
