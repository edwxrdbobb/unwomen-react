"use client"
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
    // const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
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

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Login successful!');
                setTimeout(() => {
                    window.location.href = '/'
                }, 2500);
            } else {
                toast.error(data.msg || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md border border-yellow-300">
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
                    <button 
                        className="w-full bg-yellow-200 p-2 text-black font-bold rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Submit'}
                    </button>
                    <p className="text-center text-sm mt-4 text-blue-500 cursor-pointer">
                        Forgot Password
                    </p>
                    <Link href={`/auth/signup`} >
                        <p className="text-center text-sm mt-4 text-blue-600 cursor-pointer">
                            Sign up for free
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
}
