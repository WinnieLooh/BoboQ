export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export type FilterCategory = 'all' | 'boba' | 'tapioka' | 'tee' | 'sirup' | 'zubehor';
