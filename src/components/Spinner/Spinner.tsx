import React from 'react';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  loading: boolean;
};
const Spinner: React.FC<Props> = ({ loading }) => {
  const override: CSSProperties = {
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
