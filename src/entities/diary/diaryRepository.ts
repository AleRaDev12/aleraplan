import AsyncStorage from '@react-native-async-storage/async-storage';
import { IDiary, diarySchema } from './model';
import { format, isValid } from 'date-fns';

const DIARY_KEY_PREFIX = 'diary:';

export function convertTimestampToDiaryKeyDate(timestamp: number): string {
  if (!isValid(new Date(timestamp))) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
  return format(new Date(timestamp), 'yyyy-MM-dd');
}

function convertDiaryKeyDateToTimestamp(dateString: string): number {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date.getTime();
}

export interface IDiaryRepository {
  getDiary(timestamp: number): Promise<IDiary | null>;
  setDiary(timestamp: number, text: string): Promise<void>;
  getDiariesRange(startTimestamp: number, endTimestamp: number): Promise<Record<number, IDiary>>;
  getExistingDiaryDates(): Promise<number[]>;
}

export const diaryRepository: IDiaryRepository = {
  async getDiary(timestamp) {
    const key = DIARY_KEY_PREFIX + convertTimestampToDiaryKeyDate(timestamp);
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    try {
      const parsed = JSON.parse(value);
      const diary = diarySchema.safeParse(parsed);
      if (diary.success) return diary.data;
      return null;
    } catch {
      return null;
    }
  },

  async setDiary(timestamp, text) {
    const key = DIARY_KEY_PREFIX + convertTimestampToDiaryKeyDate(timestamp);
    const diary: IDiary = { text, updatedAtISO: new Date().toISOString() };
    await AsyncStorage.setItem(key, JSON.stringify(diary));
  },

  async getDiariesRange(startTimestamp, endTimestamp) {
    if (startTimestamp > endTimestamp) {
      throw new Error('Start timestamp must be less than or equal to end timestamp');
    }

    const keys = await AsyncStorage.getAllKeys();
    const diaryKeys = keys.filter((key: string) => key.startsWith(DIARY_KEY_PREFIX));
    const dateStrings = diaryKeys.map((key: string) => key.replace(DIARY_KEY_PREFIX, ''));
    const inRange = dateStrings.filter((dateString: string) => {
      try {
        const timestamp = convertDiaryKeyDateToTimestamp(dateString);
        return timestamp >= startTimestamp && timestamp <= endTimestamp;
      } catch {
        return false;
      }
    });

    const result: Record<number, IDiary> = {};
    for (const dateString of inRange) {
      try {
        const timestamp = convertDiaryKeyDateToTimestamp(dateString);
        const diary = await this.getDiary(timestamp);
        if (diary) result[timestamp] = diary;
      } catch {
        // TODO: Log to external service
      }
    }
    return result;
  },

  async getExistingDiaryDates() {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((key: string) => key.startsWith(DIARY_KEY_PREFIX))
      .map((key: string) => {
        try {
          return convertDiaryKeyDateToTimestamp(key.replace(DIARY_KEY_PREFIX, ''));
        } catch {
          return 0;
        }
      })
      .filter((timestamp: number) => timestamp > 0);
  },
};
