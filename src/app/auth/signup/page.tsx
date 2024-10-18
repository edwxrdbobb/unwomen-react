// pages/register.jsx
export default function Register() {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-4 text-black">Register</h2>
          <p className="text-center mb-4 text-black">Create An Account With Us Today For Free</p>
          <div className="flex justify-center mb-4">
            <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-blue-500 cursor-pointer">Choose Cover</span>
            </div>
          </div>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Fullname"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Choose Role</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="password"
                placeholder="Password"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Home Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button className="w-full bg-yellow-400 p-2 text-white font-bold rounded">
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
  