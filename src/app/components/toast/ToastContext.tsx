"use client"
import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';

// Toast context types
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
  hideToast: () => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook to use the toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider to wrap the app
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast &&
        <Toast 
          message={toast?.message}
          type={toast.type}
          onClose={hideToast}
        />
     }
    </ToastContext.Provider>
  );
};
