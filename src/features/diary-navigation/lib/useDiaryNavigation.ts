import { useMemo } from 'react';
import { useDiaryNavigationStore } from '../model/store';
import { useDiaryExistingDates } from '../../../entities/diary';
import { dateUtils } from '../../../shared/lib/date';

export const useDiaryNavigation = () => {
  const { currentDate, setCurrentDate, goToPreviousDay, goToNextDay, goToToday } = useDiaryNavigationStore();

  const { data: existingDates = [] } = useDiaryExistingDates();

  const currentDateKey = dateUtils.formatDateKey(currentDate);

  const isFutureDate = useMemo(() => {
    const today = dateUtils.getCurrentDate();
    return currentDate > today;
  }, [currentDate]);

  // Checks if it's possible to go to the next day (allowing navigation up to +1 day from today)
  const canGoNext = useMemo(() => {
    const today = dateUtils.getCurrentDate();
    const tomorrow = dateUtils.addDays(today, 1);
    const nextDay = dateUtils.addDays(currentDate, 1);

    return nextDay <= tomorrow;
  }, [currentDate]);

  const findNearestPastEntry = useMemo(() => {
    const sortedDates = existingDates
      .filter(date => date < currentDateKey)
      .sort()
      .reverse();

    return sortedDates[0] || null;
  }, [existingDates, currentDateKey]);

  const findNearestFutureEntry = useMemo(() => {
    const today = dateUtils.formatDateKey(dateUtils.getCurrentDate());
    const sortedDates = existingDates.filter(date => date > currentDateKey && date <= today).sort();

    return sortedDates[0] || null;
  }, [existingDates, currentDateKey]);

  const findFutureTarget = useMemo(() => {
    const today = dateUtils.formatDateKey(dateUtils.getCurrentDate());
    const nearestEntry = findNearestFutureEntry;

    // If there's a nearest entry, return it
    if (nearestEntry) {
      return nearestEntry;
    }

    // If current date is before today and there are no entries between current and today, return today
    if (currentDateKey < today) {
      return today;
    }

    return null;
  }, [currentDateKey, findNearestFutureEntry]);

  const shouldShowJumpToPast = useMemo(() => {
    if (!findNearestPastEntry) return false;

    const nearestDate = dateUtils.parseDate(findNearestPastEntry);
    const daysBetween = Math.abs(Math.floor((currentDate.getTime() - nearestDate.getTime()) / (1000 * 60 * 60 * 24)));

    return daysBetween >= 2;
  }, [currentDate, findNearestPastEntry]);

  const shouldShowJumpToFuture = useMemo(() => {
    if (!findFutureTarget) return false;

    const targetDate = dateUtils.parseDate(findFutureTarget);
    const daysBetween = Math.abs(Math.floor((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

    return daysBetween >= 2;
  }, [currentDate, findFutureTarget]);

  const jumpToPastEntry = () => {
    if (findNearestPastEntry) {
      const targetDate = dateUtils.parseDate(findNearestPastEntry);
      setCurrentDate(targetDate);
    }
  };

  const jumpToFutureEntry = () => {
    if (findFutureTarget) {
      const targetDate = dateUtils.parseDate(findFutureTarget);
      setCurrentDate(targetDate);
    }
  };

  return {
    currentDate,
    currentDateKey,
    canGoNext,
    isFutureDate,
    shouldShowJumpToPast,
    shouldShowJumpToFuture,
    setCurrentDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    jumpToPastEntry,
    jumpToFutureEntry,
  };
};
