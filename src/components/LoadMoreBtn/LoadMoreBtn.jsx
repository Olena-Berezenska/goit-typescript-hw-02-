import React from 'react';
import stll from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ pagesDiff, OnClickLoadMore, loading, picts }) => {
  return (
    pagesDiff > 0 &&
    picts.length !== 0 &&
    !loading && (
      <div className={stll.loadmoreBtnwrapp}>
        <button onClick={OnClickLoadMore}>Load more</button>
      </div>
    )
  );
};

export default LoadMoreBtn;
