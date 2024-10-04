import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white border-b-2 border-[#0191da] shadow-lg">
      <div className="flex items-center">
        <img 
          src="/images/logo.svg" // Replace with your logo path
          alt="Logo" 
          className="h-14 w-auto ml-4" // Increased size and added margin to the right
        />
      </div>
      <button 
        onClick={onLogout} 
        className="bg-[#0191da] hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;

