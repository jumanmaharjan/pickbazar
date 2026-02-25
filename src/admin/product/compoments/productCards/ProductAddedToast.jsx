import { useEffect } from "react";

export default function ProductAddedToast({ show, onClose, message }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 transform ${
        show
          ? "translate-x-0 opacity-100"
          : "translate-x-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-primary-color relative capitalize text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 min-w-70">
        <div className="flex-1 relative text-sm font-medium">
          {message || "Product added successfully!"}
          <div className=" absolute -bottom-0.5 left-0 right-0 h-0.5 rounded bg-white"></div>
        </div>

        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
