import { create } from 'zustand';
import { dateUtils } from '../../../shared/lib/date';

type TDiaryNavigationState = {
  currentDate: Date;
};

type TDiaryNavigationActions = {
  setCurrentDate: (date: Date) => void;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
};

export const useDiaryNavigationStore = create<TDiaryNavigationState & TDiaryNavigationActions>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (set: any, get: any) => ({
    currentDate: dateUtils.getCurrentDate(),

    setCurrentDate: (date: Date) => {
      if (dateUtils.isDateAllowed(date)) {
        set({ currentDate: date });
      }
    },

    goToPreviousDay: () => {
      const { currentDate } = get();
      const previousDay = dateUtils.addDays(currentDate, -1);
      set({ currentDate: previousDay });
    },

    goToNextDay: () => {
      const { currentDate } = get();
      const nextDay = dateUtils.addDays(currentDate, 1);
      const today = dateUtils.getCurrentDate();
      const tomorrow = dateUtils.addDays(today, 1);

      // Allow navigation up to +1 day from today
      if (nextDay <= tomorrow) {
        set({ currentDate: nextDay });
      }
    },

    goToToday: () => {
      set({ currentDate: dateUtils.getCurrentDate() });
    },
  }),
);
