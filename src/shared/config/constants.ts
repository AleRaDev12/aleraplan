export const APP_CONSTANTS = {
  DIARY: {
    MAX_TEXT_LENGTH: 10000,
    AUTOSAVE_INTERVAL: 5000,
  },
  CACHE: {
    STALE_TIME: 5 * 60 * 1000,
    GC_TIME: 10 * 60 * 1000,
  },
  STORAGE: {
    DIARY_KEY_PREFIX: 'diary:',
  },
} as const;
