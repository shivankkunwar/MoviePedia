import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Please wait...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-700">{message}</p>
        <p className="mt-2 text-sm text-gray-500">This might take a few moments</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;