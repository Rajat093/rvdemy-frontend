import React from "react";

const DeleteModal = ({ show, onClose, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50"
      style={{ backdropFilter: "blur(1px)" }}
    >
      <div className="bg-white rounded-lg p-2 pb-4 w-11/12 max-w-lg border-2 border-black">
        <div className="flex justify-end mx-2">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            &#10006;
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
          <p className="mb-6">Are you sure you want to delete this item?</p>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white py-2 px-4 rounded mr-2 hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
