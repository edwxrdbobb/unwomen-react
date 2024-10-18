// pages/login.jsx
export default function Login() {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-4 text-black">Login</h2>
          <p className="text-center mb-4 text-black">Sign in to your account</p>
          <form>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
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
  