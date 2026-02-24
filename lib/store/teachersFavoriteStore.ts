import { create } from "zustand";

interface FavoriteTeachersState {
  favoriteTeachers: string[];

  setFavorites: (ids: string[]) => void;
  addFavoriteStore: (id: string) => void;
  removeFavoriteStore: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteTeachers = create<FavoriteTeachersState>(
  (set, get) => ({
    favoriteTeachers: [],

    setFavorites: (ids) => set({ favoriteTeachers: ids }),

    addFavoriteStore: (id) =>
      set((state) => ({
        favoriteTeachers: [...state.favoriteTeachers, id],
      })),

    removeFavoriteStore: (id) =>
      set((state) => ({
        favoriteTeachers: state.favoriteTeachers.filter(
          (teacherId) => teacherId !== id,
        ),
      })),

    isFavorite: (id) => get().favoriteTeachers.includes(id),
    clearFavorites: () => set(() => ({ favoriteTeachers: [] })),
  }),
);
