import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeachersClient from "./Teachers.client";

export default async function Teachers() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["tools", search, []],
  //   queryFn: ({ pageParam = 1 }) =>
  //     fetchTools({
  //       page: pageParam,
  //       perPage: 16,
  //       search,
  //       categories: [],
  //     }),
  //   initialPageParam: 1,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeachersClient />
    </HydrationBoundary>
  );
}
