import { z } from 'zod';

export interface IDiary {
  text: string;
  updatedAtISO: string;
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export const diarySchema = z.object({
  text: z.string(),
  updatedAtISO: z.string().regex(isoDatePattern, 'Must be a valid ISO date string'),
});

export const DIARY_MAX_LENGTH = 10000;

export function isDiaryLengthValid(text: string): boolean {
  return text.length <= DIARY_MAX_LENGTH;
}
