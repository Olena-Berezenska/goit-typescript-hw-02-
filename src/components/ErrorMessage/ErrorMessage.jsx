import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ErrorMessage = ({ IsError }) => {
  useEffect(() => {
    if (IsError) {
      toast.error('Try again later...');
    }
  }, [IsError]);

  return <Toaster />;
};

export default ErrorMessage;
