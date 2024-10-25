
const Footer = () =>{


    return(
        <div>
            <footer className="bg-blue-500 text-white p-8 mt-8" >
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
          <p>© 2024 Copyright: UN Women Market Square</p>
        </div>
      </footer>
        </div>
    )
}

export default Footer;