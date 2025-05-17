import AsyncStorage from "@react-native-async-storage/async-storage";
import { INote, noteSchema } from "./model";
import { format, isValid } from "date-fns";

const NOTE_KEY_PREFIX = "note:";

export function convertTimestampToNoteKeyDate(timestamp: number): string {
  if (!isValid(new Date(timestamp))) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
  return format(new Date(timestamp), "yyyy-MM-dd");
}

function convertNoteKeyDateToTimestamp(dateString: string): number {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date.getTime();
}

export interface INoteRepository {
  getNote(timestamp: number): Promise<INote | null>;
  setNote(timestamp: number, text: string): Promise<void>;
  getNotesRange(
    startTimestamp: number,
    endTimestamp: number
  ): Promise<Record<number, INote>>;
  getExistingNoteDates(): Promise<number[]>;
}

export const noteRepository: INoteRepository = {
  async getNote(timestamp) {
    const key = NOTE_KEY_PREFIX + convertTimestampToNoteKeyDate(timestamp);
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    try {
      const parsed = JSON.parse(value);
      const note = noteSchema.safeParse(parsed);
      if (note.success) return note.data;
      return null;
    } catch {
      return null;
    }
  },

  async setNote(timestamp, text) {
    const key = NOTE_KEY_PREFIX + convertTimestampToNoteKeyDate(timestamp);
    const note: INote = { text, updatedAtISO: new Date().toISOString() };
    await AsyncStorage.setItem(key, JSON.stringify(note));
  },

  async getNotesRange(startTimestamp, endTimestamp) {
    if (startTimestamp > endTimestamp) {
      throw new Error(
        "Start timestamp must be less than or equal to end timestamp"
      );
    }

    const keys = await AsyncStorage.getAllKeys();
    const noteKeys = keys.filter((key: string) =>
      key.startsWith(NOTE_KEY_PREFIX)
    );
    const dateStrings = noteKeys.map((key: string) =>
      key.replace(NOTE_KEY_PREFIX, "")
    );
    const inRange = dateStrings.filter((dateString: string) => {
      try {
        const timestamp = convertNoteKeyDateToTimestamp(dateString);
        return timestamp >= startTimestamp && timestamp <= endTimestamp;
      } catch {
        return false;
      }
    });

    const result: Record<number, INote> = {};
    for (const dateString of inRange) {
      try {
        const timestamp = convertNoteKeyDateToTimestamp(dateString);
        const note = await this.getNote(timestamp);
        if (note) result[timestamp] = note;
      } catch {
        // TODO: Log to external service
      }
    }
    return result;
  },

  async getExistingNoteDates() {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((key: string) => key.startsWith(NOTE_KEY_PREFIX))
      .map((key: string) => {
        try {
          return convertNoteKeyDateToTimestamp(
            key.replace(NOTE_KEY_PREFIX, "")
          );
        } catch {
          return 0;
        }
      })
      .filter((timestamp: number) => timestamp > 0);
  },
};
