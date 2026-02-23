import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeachersClient from "./Teachers.client";
import { getTeachers } from "@/lib/api/api";

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
