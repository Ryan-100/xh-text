import React from "react";

const Modal = ({ open, onClose,title ,children }) => {
  const modalClasses = open
    ? "fixed inset-0 flex items-center justify-center !z-[999]"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className="fixed inset-0 bg-black opacity-50"  onClick={onClose}></div>
      <div className="absolute bg-white p-8 rounded-lg flex flex-col space-y-4 min-w-[300px]">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{title}</p>
        <button
          className="self-end text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
