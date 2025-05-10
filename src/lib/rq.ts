import { useQuery, UseQueryOptions, QueryKey, useMutation, UseMutationOptions, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

function useAppQuery<TData>(queryKey: QueryKey, queryFn: () => Promise<TData>, options?: UseQueryOptions<TData>) {
  return useQuery<TData>({
    queryKey,
    queryFn,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5분 캐시
    ...options
  });
}

function useAppMutation<TData, TVariables = void>(mutationFn: (variables: TVariables) => Promise<TData>, options?: UseMutationOptions<TData, unknown, TVariables>) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    retry: false,
    ...options
  });
}

declare global {
  var $query: typeof useAppQuery;
  var $mutation: typeof useAppMutation;
  var $queryClient: QueryClient;
}

globalThis.$query = useAppQuery;
globalThis.$mutation = useAppMutation;
globalThis.$queryClient = queryClient;
