export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export type NewProduct = Omit<Product, "id">;

export type ProductUpdate = Partial<NewProduct>;

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
}

export interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  customer: CustomerInfo;
  totalPrice: number;
  createdAt: string;
}

export interface NewOrder {
  items: Array<Pick<OrderItem, "productId" | "quantity">>;
  customer: CustomerInfo;
}
