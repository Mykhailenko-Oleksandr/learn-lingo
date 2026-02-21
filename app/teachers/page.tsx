import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeachersClient from "./Teachers.client";
import { getTeachers } from "@/lib/api/clientApi";

export default async function Teachers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["teachers"],
    queryFn: ({ pageParam }) => getTeachers(4, pageParam),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeachersClient />
    </HydrationBoundary>
  );
}
