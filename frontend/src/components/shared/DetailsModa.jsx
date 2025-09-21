import { FiX } from "react-icons/fi";

const DetailsModal = ({
  show = false,
  onClose,
  title = "Details",
  children,
  footerContent = null,
  size = "md",
}) => {
  if (!show) return null;

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal container */}
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full relative`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FiX className="h-6 w-6" />
          </button>

          {/* Header */}
          <div className="pt-8 pb-4 px-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {title}
            </h3>
          </div>

          {/* Content - accepts any children */}
          <div className="p-6">{children}</div>

          {/* Optional footer */}
          {footerContent && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
