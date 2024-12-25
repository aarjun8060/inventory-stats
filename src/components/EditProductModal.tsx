'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { EditProductModalProps, Product } from '@/types';
import { useEffect, useState } from 'react';

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        category: product.category,
        price: Number(typeof product.price === 'string' ? product.price.replace(/[^0-9.-]+/g, '') : product.price),
        quantity: product.quantity,
        value: Number(typeof product.value === 'string' ? product.value.replace(/[^0-9.-]+/g, '') : product.value)
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product && formData.price !== undefined && formData.value !== undefined) {
      const cleanedData = {
        ...formData,
        price: Number(formData.price),
        value: Number(formData.value)
      };
      onSave({ ...product, ...cleanedData } as any);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a]/70 backdrop-blur-md border-gray-800 [&>button]:text-[#9bb537] [&>button]:scale-150 [&>button]:top-5 sm:max-w-[525px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-gray-200 text-xl">Edit product</DialogTitle>
          <p className="text-gray-400 text-sm mt-1">{product?.name}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm">Category</label>
              <Input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-[#2a2a2a] border-gray-700 text-gray-200 focus:border-[#9bb537] mt-1"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">price</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="bg-[#2a2a2a] border-gray-700 text-gray-200 focus:border-[#9bb537] mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm">quantity</label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="bg-[#2a2a2a] border-gray-700 text-gray-200 focus:border-[#9bb537] mt-1"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">value</label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: (e.target.value) })}
                className="bg-[#2a2a2a] border-gray-700 text-gray-200 focus:border-[#9bb537] mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-transparent text-[#9bb537] border-[#9bb537] hover:bg-[#9bb537] hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#9bb537] text-white hover:bg-[#8aa22f]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};