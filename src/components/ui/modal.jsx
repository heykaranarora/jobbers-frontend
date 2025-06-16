import React from "react";

export const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <div className="mb-4">{children}</div>
        <div className="flex justify-between">
        </div>
      </div>
    </div>
  );
};
