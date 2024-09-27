"use client"

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${bgColor} fixed top-4 right-4 px-4 py-2 text-white rounded shadow-lg z-50`}>
      <div>{message}</div>
      <button onClick={onClose} className="text-sm underline mt-2">
        Close
      </button>
    </div>
  );
};

export default Toast;
