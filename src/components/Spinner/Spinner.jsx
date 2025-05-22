import React from 'react';
import { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };
  return (
    <div>
      <ClipLoader
        color="#ffffff"
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
