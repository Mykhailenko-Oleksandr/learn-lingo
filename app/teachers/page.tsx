import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeachersClient from "./Teachers.client";
import { getTeachers } from "@/lib/api/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teachers",
  description:
    "Browse experienced language teachers, filter by price, level, and language, and book your perfect match on Learn Lingo.",
  openGraph: {
    title: "Learn Lingo – Find Your Language Teacher",
    description:
      "Discover top-rated teachers, compare prices, and choose the right level for your learning journey.",
    url: "https://learn-lingo-orcin-kappa.vercel.app/teachers",
    images: [{ url: "/images/head.png" }],
  },
};

export default async function Teachers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["teachers", null, null, null],
    queryFn: ({ pageParam }) => getTeachers(4, pageParam, null, null, null),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeachersClient />
    </HydrationBoundary>
  );
}
