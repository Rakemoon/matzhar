export interface CartItem {
  name: string;
  amount: number;
}

export const CartState = $state<CartItem[]>([]);
