import { useQuery, useQueryClient } from 'react-query';

import api from '@/services/apiTmdb';

export function useFetch(key: string | [], url: string, options?: {}) {
   const queryClient = useQueryClient();

   const fetcher = ({ signal }: any) =>
      api.get(url, { signal }).then(({ data }) => data);

   const { data, isError, isLoading } = useQuery(key, fetcher, options);

   return {
      data,
      isError,
      isLoading,
   };
}
