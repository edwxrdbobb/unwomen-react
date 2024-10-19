import Image from "next/image";
import logo from '@/images/unwomenlogo.png';

const Header = () => {

    return(
        <div className="bg-white">
          <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="flex items-center space-x-3">
              <Image src={logo} alt="UN Women Logo" width={50} height={50} />
              <h1 className="text-lg font-bold">UN Women</h1>
            </div>
            <div className="search-wrapper w-[45%]">
              <form action="#" className="search-form w-full">
                <div className="input-holder w-full">
                  <input type="text" name="" id="searchInput" className="search-input rounded-md px-4 py-2 border-solid border-gray-200 border-focus-none w-full text-xs" style={{borderWidth: '1px'}} placeholder="Search Products" />
                </div>
              </form>
            </div>
            <nav className="space-x-6">
              <a href="/" className="text-gray-600 text-xs">Home</a>
              {/* <a href="#" className="text-gray-600">Who We Are</a> */}
              <a href="/products/shop" className="text-gray-600 text-xs">Store</a>
              <a href="/mentors" className="text-gray-600 text-xs">Mentor</a>
              <a href="/auth/login" className="text-gray-600 text-xs">Login</a>
              <a href="/auth/signup" className="text-gray-600 text-xs">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Sign Up</button>
              </a>
            </nav>


          </header>
          <div className="category-nav py-4 px-2 bg-white">
            <div className="flex justify-between">

              <div className="category-drop">
                <div className="">
                  <button className="py-2 px-4 rounded-md bg-green-700 text-white text-sm">All Categories</button>
                </div>
              </div>

              <nav className="space-x-6">
                <a href="/" className="text-gray-600 text-xs">Fashion</a>
                <a href="/products/shop" className="text-gray-600 text-xs">Electronics</a>
                <a href="/mentors" className="text-gray-600 text-xs">Bags</a>
                <a href="/auth/login" className="text-gray-600 text-xs">Shoes</a>
                <a href="/auth/login" className="text-gray-600 text-xs">Cars</a>
            </nav>

              <div className="team-support">
                <div className="p-2">
                  <p>call the team for support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Header;