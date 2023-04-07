/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';

const useDataQuery = (queryKey: any, api: any, options?: any) => {
  return useQuery(queryKey, api, {
    retry: 0,
    ...options,
  });
};

export default useDataQuery;
