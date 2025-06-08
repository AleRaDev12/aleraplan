import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { diaryRepository } from '../api/repository';
import { APP_CONSTANTS } from '../../../shared/config';

export const DIARY_QUERY_KEY = 'diary';

export const useDiaryEntry = (date: string) => {
  return useQuery({
    queryKey: [DIARY_QUERY_KEY, date],
    queryFn: () => diaryRepository.getEntry(date),
    staleTime: APP_CONSTANTS.CACHE.STALE_TIME,
  });
};

export const useSaveDiaryEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ date, text }: { date: string; text: string }) => diaryRepository.setEntry(date, text),
    onSuccess: (savedEntry, { date }) => {
      queryClient.setQueryData([DIARY_QUERY_KEY, date], savedEntry);
      queryClient.invalidateQueries({ queryKey: [DIARY_QUERY_KEY, 'dates'] });
    },
  });
};

export const useDiaryExistingDates = () => {
  return useQuery({
    queryKey: [DIARY_QUERY_KEY, 'dates'],
    queryFn: () => diaryRepository.getExistingDates(),
    staleTime: APP_CONSTANTS.CACHE.STALE_TIME,
  });
};

export const useDeleteDiaryEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (date: string) => diaryRepository.deleteEntry(date),
    onSuccess: (_, date) => {
      queryClient.invalidateQueries({ queryKey: [DIARY_QUERY_KEY, date] });
      queryClient.invalidateQueries({ queryKey: [DIARY_QUERY_KEY, 'dates'] });
    },
  });
};
