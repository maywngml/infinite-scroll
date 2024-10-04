import React, { useEffect, useRef, useState } from 'react';
import DataCard from './components/DataCard';
import getMockData from './lib/getMockData';
import type { MockData } from './types/mock';
import './App.css';

function App() {
  const [datas, setDatas] = useState<MockData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const pageNum = useRef<number>(0);

  const createObserver = (target: HTMLDivElement) => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver(handleIntersect, options);
    observer.current.observe(target);
  };

  const fetchMockData = async () => {
    setIsLoading(true);
    try {
      const { datas, isEnd } = await getMockData(pageNum.current);
      let currentTotalPrice = 0;

      datas.forEach(({ price }: MockData) => {
        currentTotalPrice += price;
      });

      setDatas((prevDatas) => [...prevDatas, ...datas]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + currentTotalPrice);
      setIsEnd(isEnd);
      pageNum.current += 1;
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (isLoading) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isEnd) {
        fetchMockData();
      }
    });
  };

  useEffect(() => {
    const target = scrollEndRef.current;

    if (!target) return;

    if (isEnd) {
      observer.current?.unobserve(target);
    } else {
      createObserver(target);
    }

    return () => {
      if (!target) return;
      observer.current?.disconnect();
    };
  }, [isEnd]);

  return (
    <main className='App'>
      <p className='total-price'>Total Price: {totalPrice}</p>
      <div className='data-list'>
        {datas.map((data: MockData) => (
          <DataCard
            data={data}
            key={`product-${data.productId}`}
          ></DataCard>
        ))}
      </div>
      <div
        className='scroll-end'
        ref={scrollEndRef}
      >
        {isLoading && <span className='loading'>Loading...</span>}
      </div>
    </main>
  );
}

export default App;
