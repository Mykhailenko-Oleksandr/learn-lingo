import { create } from "zustand";
import { persist } from "zustand/middleware";

type DraftStore = {
  favoriteTeachers: string[];
  setFavoriteTeachers: (id: string) => void;
  removeFavoriteTeachers: (id: string) => void;
};

export const useFavoriteTeachers = create<DraftStore>()(
  persist(
    (set) => ({
      favoriteTeachers: [],
      setFavoriteTeachers: (id) =>
        set((state) => ({
          favoriteTeachers: [...state.favoriteTeachers, id],
        })),
      removeFavoriteTeachers: (id) =>
        set((state) => ({
          favoriteTeachers: state.favoriteTeachers.filter(
            (teacherId) => teacherId !== id,
          ),
        })),
    }),
    {
      name: "teachersFavorite",
      partialize: (state) => ({ favoriteTeachers: state.favoriteTeachers }),
    },
  ),
);
