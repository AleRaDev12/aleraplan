export const dateUtils = {
  formatDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  },

  formatDisplayDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    });
  },

  getCurrentDate(): Date {
    return new Date();
  },

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  isDateAllowed(date: Date): boolean {
    const today = this.getCurrentDate();
    return date <= today;
  },

  parseDate(dateKey: string): Date {
    return new Date(dateKey + 'T00:00:00');
  },
};
