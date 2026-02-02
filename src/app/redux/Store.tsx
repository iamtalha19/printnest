import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/redux/CartSlice";
import wishlistReducer from "@/app/redux/WishListSlice"; // If you created this earlier
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;