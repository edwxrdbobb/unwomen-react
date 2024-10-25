"use client"
export default function Login() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        try {
            const response = await fetch('https://unwomenmarketsquare.online/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Read the response once
            const data = await response.json();

            if (response.ok) {
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                // Handle successful login (e.g., redirect)
                console.log('Login successful:', data.token);
            } else {
                // Handle errors (e.g., show error message)
                console.error('Login failed:', data.msg);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-4 text-black">Login</h2>
          <p className="text-center mb-4 text-black">Sign in to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
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
