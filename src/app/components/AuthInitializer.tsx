"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/redux/AuthSlice";
import { initializeCart } from "@/app/redux/CartSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(loginSuccess({ user: data.user, token: "active" }));
          if (data.user.cart && Array.isArray(data.user.cart)) {
            const totalQty = data.user.cart.reduce(
              (acc: number, item: any) => acc + (item.quantity || 1),
              0,
            );
            const totalAmt = data.user.cart.reduce(
              (acc: number, item: any) =>
                acc + item.price * (item.quantity || 1),
              0,
            );

            dispatch(
              initializeCart({
                cartItems: data.user.cart,
                totalQuantity: totalQty,
                totalAmount: totalAmt,
              }),
            );
          }
        }
      } catch (err) {}
    };

    checkSession();
  }, [dispatch]);

  return null;
}
