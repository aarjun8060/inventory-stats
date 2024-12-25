export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number | string;
    quantity: number;
    isDisabled?: boolean;
    value?: string | number;
}
  
export interface InventoryStats {
    totalProducts: number;
    value: any;
    outOfStock: number;
    categories: number;
}

export interface EditProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

export interface StatsWidgetProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

export interface InventoryState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }