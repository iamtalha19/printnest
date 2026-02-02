import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<
        Omit<CartItem, "quantity" | "totalPrice"> & { quantity?: number }
      >,
    ) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id,
      );
      const quantityToAdd = newItem.quantity || 1;

      state.totalQuantity += quantityToAdd;
      state.totalAmount += newItem.price * quantityToAdd;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: quantityToAdd,
          totalPrice: newItem.price * quantityToAdd,
        });
      } else {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += newItem.price * quantityToAdd;
      }
    },

    removeFromCart: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },

    deleteItem: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
