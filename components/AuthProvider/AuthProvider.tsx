"use client";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
}
