import Image from "next/image";
import logo from '@/images/unwomenlogo.png';

const Header = () => {

    return(
        <div>
          <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="flex items-center space-x-3">
              <Image src={logo} alt="UN Women Logo" width={50} height={50} />
              <h1 className="text-lg font-bold">UN Women</h1>
            </div>
            <nav className="space-x-6">
              <a href="#" className="text-gray-600">Home</a>
              <a href="#" className="text-gray-600">Who We Are</a>
              <a href="#" className="text-gray-600">Store</a>
              <a href="#" className="text-gray-600">Mentor</a>
              <a href="#" className="text-gray-600">Login</a>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Sign Up</button>
            </nav>
          </header>
        </div>
    );
}

export default Header;