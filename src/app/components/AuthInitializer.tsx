"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/redux/AuthSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(loginSuccess({ user: data.user, token: "active" }));
        }
      } catch (err) {}
    };

    checkSession();
  }, [dispatch]);

  return null;
}
