import { MOCK_DATA } from '../data/mock';
import type { MockData } from '../types/mock';

export default function getMockData(
  pageNum: number
): Promise<{ datas: MockData[]; isEnd: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const PER_PAGE = 10;
      const datas: MockData[] = MOCK_DATA.slice(
        PER_PAGE * pageNum,
        PER_PAGE * (pageNum + 1)
      );
      const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

      resolve({ datas, isEnd });
    }, 1500);
  });
}
