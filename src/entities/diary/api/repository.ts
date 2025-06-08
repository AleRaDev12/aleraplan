import { TDiaryEntry, TDiaryRepository } from '../model/types';
import { storageUtils } from '../../../shared/lib/storage';

const DIARY_KEY_PREFIX = 'diary:';

export const diaryRepository: TDiaryRepository = {
  async getEntry(date: string): Promise<TDiaryEntry | null> {
    const key = `${DIARY_KEY_PREFIX}${date}`;
    return await storageUtils.getItem<TDiaryEntry>(key);
  },

  async setEntry(date: string, text: string): Promise<TDiaryEntry> {
    const key = `${DIARY_KEY_PREFIX}${date}`;
    const entry: TDiaryEntry = {
      text,
      updatedAt: new Date().toISOString(),
    };
    await storageUtils.setItem(key, entry);
    return entry;
  },

  async getExistingDates(): Promise<string[]> {
    const allKeys = await storageUtils.getAllKeys();
    return allKeys
      .filter(key => key.startsWith(DIARY_KEY_PREFIX))
      .map(key => key.replace(DIARY_KEY_PREFIX, ''))
      .sort();
  },

  async deleteEntry(date: string): Promise<void> {
    const key = `${DIARY_KEY_PREFIX}${date}`;
    await storageUtils.removeItem(key);
  },
};
