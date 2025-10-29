'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import mockData from '@/data/mockData.json';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const setData = useStore((state) => state.setData);

  useEffect(() => {
    // Load mock data on mount
    setData(mockData as any);
  }, [setData]);

  return <>{children}</>;
}
