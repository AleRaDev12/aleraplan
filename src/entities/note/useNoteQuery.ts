import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  noteRepository,
  convertTimestampToNoteKeyDate,
} from "./noteRepository";
import { INote } from "./model";

function getNoteQueryKey(timestamp: number) {
  return ["note", String(timestamp)];
}

export function useNoteQuery(timestamp: number) {
  return useQuery<INote | null>({
    queryKey: getNoteQueryKey(timestamp),
    queryFn: () => noteRepository.getNote(timestamp),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useInvalidateNote(timestamp: number) {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: getNoteQueryKey(timestamp) });
}
