"use client";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { getUserFavorites } from "@/lib/api/api";
import { useFavoriteTeachers } from "@/lib/store/teachersFavoriteStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true);
  const setFavorites = useFavoriteTeachers((state) => state.setFavorites);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const favoriteIds = await getUserFavorites(user.uid);
        setFavorites(favoriteIds);
      } else {
        clearIsAuthenticated();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearIsAuthenticated, setFavorites]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
}
