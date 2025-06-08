import { useQuery, useQueryClient } from '@tanstack/react-query';
import { diaryRepository } from './diaryRepository';
import { IDiary } from './model';

function getDiaryQueryKey(timestamp: number) {
  return ['diary', String(timestamp)];
}

export function useDiaryQuery(timestamp: number) {
  return useQuery<IDiary | null>({
    queryKey: getDiaryQueryKey(timestamp),
    queryFn: () => diaryRepository.getDiary(timestamp),
  });
}

export function useInvalidateDiary(timestamp: number) {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: getDiaryQueryKey(timestamp) });
}
