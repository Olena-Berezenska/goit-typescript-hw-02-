import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
type Props = {
  IsError: boolean;
};
const ErrorMessage: React.FC<Props> = ({ IsError }) => {
  useEffect(() => {
    if (IsError) {
      toast.error('Try again later...');
    }
  }, [IsError]);

  return <Toaster />;
};

export default ErrorMessage;
