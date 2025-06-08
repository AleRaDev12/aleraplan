/* eslint-disable @typescript-eslint/no-explicit-any */
type TLogger = {
  error(...args: any[]): void;
  log(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
};

class Logger {
  private logger: TLogger;

  constructor(loggerImpl: TLogger) {
    this.logger = loggerImpl;
  }

  public error(...args: any[]) {
    try {
      this.logger.error(...args);
      // TODO: Add error tracking service integration here
    } catch (e: any) {
      this.logger.error('Failed to log error:', e);
    }
  }

  public errorLocal(...args: any[]) {
    this.logger.error(...args);
  }

  public info(...args: any[]) {
    this.logger.log(...args);
  }

  public debug(...args: any[]) {
    this.logger.debug(...args);
  }

  public warn(...args: any[]) {
    this.logger.warn(...args);
  }

  private argsToString(args: any[]): string {
    return args
      .map(value => {
        if (value instanceof Error) return value;

        if (typeof value === 'object') {
          try {
            return JSON.stringify(value);
          } catch (e) {
            return `[No data. Object serialization error: ${e}]`;
          }
        }

        return value?.toString();
      })
      .join(',\n');
  }
}

export const logger = new Logger(console);
