export type TDiaryEntry = {
  text: string;
  updatedAt: string;
};

export type TDiaryRepository = {
  getEntry(date: string): Promise<TDiaryEntry | null>;
  setEntry(date: string, text: string): Promise<TDiaryEntry>;
  getExistingDates(): Promise<string[]>;
  deleteEntry(date: string): Promise<void>;
};
