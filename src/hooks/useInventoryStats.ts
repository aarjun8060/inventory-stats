'use client';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { InventoryStats } from '../types';

export const useInventoryStats = (): InventoryStats => {
  const products = useSelector((state: RootState) => state.inventory.products);

  return useMemo(() => {
    const activeProducts = products.filter((p: any) => !p.isDisabled);
    const categories = new Set(activeProducts.map((p: { category: string }) => p.category));

    const totalValue = activeProducts.reduce((sum: number, p: any) => {
      const numericValue = +p.value;
      return sum + numericValue;
    }, 0);

    return {
      totalProducts: activeProducts.length,
      value: totalValue,
      outOfStock: activeProducts.filter((p: { quantity: number }) => p.quantity === 0).length,
      categories: categories.size,
    };
  }, [products]);
};