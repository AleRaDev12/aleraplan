import { QueryClient } from '@tanstack/react-query';
import { APP_CONSTANTS } from './constants';

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: APP_CONSTANTS.CACHE.STALE_TIME,
      gcTime: APP_CONSTANTS.CACHE.GC_TIME,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
};

export const createQueryClient = () => new QueryClient(queryClientConfig);
