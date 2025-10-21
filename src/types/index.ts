export interface User {
  email: string;
  password: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}
