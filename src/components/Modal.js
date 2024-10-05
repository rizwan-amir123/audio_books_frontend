import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-10 flex justify-center items-center">
      {/* Modal content is solid */}
      <div className="bg-white p-6 rounded shadow-lg relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;

