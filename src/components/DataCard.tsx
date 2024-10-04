import { memo } from 'react';
import type { MockData } from '../types/mock';

interface DataCardProps {
  data: MockData;
}

const DataCard = ({ data }: DataCardProps) => {
  const { productId, productName, price, boughtDate } = data;

  return (
    <div className='data-card'>
      <p>productId: {productId}</p>
      <p>productName: {productName}</p>
      <p>price: {price}</p>
      <p>boughtDate: {boughtDate}</p>
    </div>
  );
};

export default memo(DataCard);
