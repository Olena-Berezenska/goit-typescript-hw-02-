import React from 'react';
import stll from './LoadMoreBtn.module.css';
import { Picture } from '../../App';
type Props = {
  loading: boolean;
  picts: Picture[];
  pagesDiff: number;
  OnClickLoadMore: () => void;
};
const LoadMoreBtn: React.FC<Props> = ({
  pagesDiff,
  OnClickLoadMore,
  loading,
  picts,
}) => {
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
