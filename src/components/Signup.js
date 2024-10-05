import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
		const response = await fetch('http://127.0.0.1:5000/signup', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ "username": email, "password": password }),
		});
		const data = await response.json();
		if (data.message === 'User created successfully') {
		  navigate('/');
		} else {
		  setError(true)
		}
    } catch (error) {
		//console.error('Error during signup:', error);
		setError(true); // Optionally, set an error state to inform the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-[#0191da] relative p-4">
      {/* Left Image */}
      <div className="hidden md:flex absolute left-0 top-20 h-full w-1/2 flex justify-start">
        <img 
          src="/images/books.png" // Replace with your left image path
          alt="Left" 
          className="h-full w-auto object-cover"
        />
      </div>
      
      {/* Right Image */}
      <div className="hidden md:flex absolute right-12 bottom-10 h-full w-1/2 flex justify-end">
        <img 
          src="/images/headphone.png" // Replace with your right image path
          alt="Right" 
          className="h-full w-auto object-cover"
        />
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-sm z-10 relative">
        <div className="flex justify-center mb-4">
          <img 
            src="/images/logo.svg" // Replace with your logo path
            alt="Logo" 
            className="h-16 w-auto" // Adjust size as needed
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 w-full border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 w-full border border-gray-300 rounded"
        />
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition-colors duration-200">
          Sign Up
        </button>
        {error && (
		  <p className="text-xs mt-3 text-left text-red-500"> 
			Signup failed. Try to login; maybe the user exists already.
		  </p>
		)}

        <p className="text-xs mt-3 text-center"> 
          After successful signup, you will be redirected to the sign-in page. 
          Enter your email and password there to continue to the voting page.
        </p>
        
        <p className="mt-4 text-center">
          Go back to Sign In?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/')}>
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

