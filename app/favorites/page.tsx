import { Metadata } from "next";
import FavoritesClient from "./Favorites.client";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "View and manage your favorite language teachers. Quickly access saved profiles and book lessons with ease on Learn Lingo.",
  openGraph: {
    title: "Learn Lingo – Your Favorite Teachers",
    description:
      "Keep track of your saved teachers, compare their profiles, and continue your learning journey with Learn Lingo.",
    url: "https://learn-lingo-orcin-kappa.vercel.app/favorites",
    images: [{ url: "/images/head.png" }],
  },
};

export default function Favorites() {
  return <FavoritesClient />;
}
