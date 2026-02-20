import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeachersClient from "./Teachers.client";
import { getAllData } from "@/lib/api/clientApi";

export default async function Teachers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["teachers"],
    queryFn: getAllData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeachersClient />
    </HydrationBoundary>
  );
}
