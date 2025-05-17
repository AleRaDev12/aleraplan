import { z } from 'zod';

export interface INote {
  text: string;
  updatedAtISO: string;
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export const noteSchema = z.object({
  text: z.string(),
  updatedAtISO: z.string().regex(isoDatePattern, 'Must be a valid ISO date string'),
});

export const NOTE_MAX_LENGTH = 10000;

export function isNoteLengthValid(text: string): boolean {
  return text.length <= NOTE_MAX_LENGTH;
} 