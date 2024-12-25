'use client';
import { Switch } from '@/components/ui/switch';
import { rawProducts } from '@/data';
import { RootState } from '@/store';
import { Product } from '@/types';
import { AlertTriangle, CircleDollarSign, ShoppingCart, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInventoryStats } from '../hooks/useInventoryStats';
import {
  deleteProduct,
  setProducts,
  toggleProductStatus,
  updateProduct,
} from '../store/inventorySlice';
import { EditProductModal } from './EditProductModal';
import { ProductTable } from './ProductTable';
import { StatsWidget } from './StatsWidget';

export const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const products = useSelector((state: RootState) => state.inventory.products);
  const stats = useInventoryStats();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
        const data = await response.json();
        mapProduct(data || rawProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const mapProduct = (rawProducts: Product[]) => {
    const products = rawProducts.map(product => ({
      ...product,
      value: product?.value?.toString().replace('$', ''),
      price: product?.price?.toString().replace('$', ''),
      id: Math.random()
    }));

    dispatch(setProducts(products));
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-300 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200">Inventory stats</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <span>admin</span>
          <Switch
            checked={!isAdmin}
            onCheckedChange={() => setIsAdmin(prev => !prev)}
            className="data-[state=checked]:bg-[#FFD700]"
          />
          <span>user</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsWidget
          title="Total product"
          value={stats.totalProducts}
          icon={<ShoppingCart className="h-8 w-8" />}
        />
        <StatsWidget
          title="Total store value"
          value={stats.value}
          icon={<CircleDollarSign className="h-8 w-8" />}
        />
        <StatsWidget
          title="Out of stocks"
          value={stats.outOfStock}
          icon={<AlertTriangle className="h-8 w-8" />}
        />
        <StatsWidget
          title="No of Category"
          value={stats.categories}
          icon={<Tags className="h-8 w-8" />}
        />
      </div>

      <ProductTable
        products={products}
        isAdmin={isAdmin}
        onEdit={setEditingProduct}
        onDelete={(id: string) => {
          if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
          }
        }}
        onToggleStatus={(id: any) => dispatch(toggleProductStatus(id))}
      />

      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={(product) => {
          dispatch(updateProduct(product));
          setEditingProduct(null);
        }}
      />
    </div>
  );
};