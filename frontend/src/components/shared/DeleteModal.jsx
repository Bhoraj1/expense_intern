import { FaSpinner, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteModal = ({
  show = false,
  onClose,
  onConfirm,
  itemName = "item",
  isLoading = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-secondary-yellow hover:text-primary-blue focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="pt-10 pb-6 px-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <FaExclamationTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Delete {itemName}?
            </h3>
          </div>

          {/* Body */}
          <div className="px-6 pb-4 text-center">
            <p className="text-gray-600">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-md disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
