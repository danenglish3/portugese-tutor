"use client"

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const handleClose = () => {
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
            X
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
