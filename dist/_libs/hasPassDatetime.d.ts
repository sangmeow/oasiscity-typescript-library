/**
 * Options for datetime comparison functions
 */
interface DateTimeComparisonOptions {
    /** Reference time to compare against (default: new Date()) */
    referenceTime?: Date | string | number;
    /** Timezone to use for comparison (default: local) */
    timezone?: string;
    /** Tolerance in milliseconds for "close enough" comparisons (default: 0) */
    tolerance?: number;
    /** Whether to consider invalid dates as "passed" (default: true) */
    treatInvalidAsPassed?: boolean;
    /** Whether to include equal times as "passed" (default: true) */
    includeEqual?: boolean;
}
/**
 * Result of datetime comparison with detailed information
 */
interface DateTimeComparisonResult {
    /** Whether the datetime has passed */
    hasPassed: boolean;
    /** Whether the input datetime is valid */
    isValid: boolean;
    /** The parsed datetime (null if invalid) */
    parsedDate: Date | null;
    /** The reference datetime used for comparison */
    referenceDate: Date;
    /** Time difference in milliseconds (negative if in future) */
    timeDifference: number;
    /** Human-readable description of the time difference */
    description: string;
    /** Error message if datetime is invalid */
    error?: string;
}
/**
 * Time unit constants for easy reference
 */
export declare const TIME_UNITS: {
    readonly MILLISECOND: 1;
    readonly SECOND: 1000;
    readonly MINUTE: number;
    readonly HOUR: number;
    readonly DAY: number;
    readonly WEEK: number;
    readonly MONTH: number;
    readonly YEAR: number;
};
/**
 * Checks if a datetime has passed (is in the past)
 * Enhanced version of the original hasPassDatetime function
 *
 * @param datetime - DateTime string, Date object, or timestamp to check
 * @param options - Additional options for comparison
 * @returns true if datetime has passed or is invalid (by default)
 *
 * @example
 * // Basic usage
 * hasPassedDatetime('2023-01-01T00:00:00Z') // true (if current date is after)
 * hasPassedDatetime('2025-12-31T23:59:59Z') // false (if current date is before)
 *
 * // With custom reference time
 * hasPassedDatetime('2023-06-15', { referenceTime: new Date('2023-06-01') }) // false
 *
 * // With tolerance (within 1 hour is considered "not passed")
 * hasPassedDatetime('2023-06-15T14:30:00Z', {
 *   referenceTime: new Date('2023-06-15T15:00:00Z'),
 *   tolerance: TIME_UNITS.HOUR
 * }) // false
 */
export declare const hasPassedDatetime: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => boolean;
/**
 * Legacy function for backward compatibility
 * @deprecated Use hasPassedDatetime instead (fixed typo)
 */
export declare const hasPassDatetime: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => boolean;
/**
 * Performs detailed datetime comparison with comprehensive result information
 *
 * @param datetime - DateTime to check
 * @param options - Comparison options
 * @returns Detailed comparison result
 *
 * @example
 * const result = compareDatetime('2023-06-15T14:30:00Z');
 * console.log(result.hasPassed); // boolean
 * console.log(result.timeDifference); // milliseconds
 * console.log(result.description); // "2 hours ago" or "in 3 days"
 */
export declare const compareDatetime: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => DateTimeComparisonResult;
/**
 * Checks if a datetime is in the future
 *
 * @param datetime - DateTime to check
 * @param options - Comparison options
 * @returns true if datetime is in the future
 *
 * @example
 * isFutureDatetime('2025-12-31T23:59:59Z') // true (if current date is before)
 * isFutureDatetime('2023-01-01T00:00:00Z') // false (if current date is after)
 */
export declare const isFutureDatetime: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => boolean;
/**
 * Checks if a datetime is today
 *
 * @param datetime - DateTime to check
 * @param options - Comparison options
 * @returns true if datetime is on the same day as reference date
 *
 * @example
 * isTodayDatetime('2023-06-15T14:30:00Z') // true if today is 2023-06-15
 * isTodayDatetime('2023-06-14T23:59:59Z') // false if today is 2023-06-15
 */
export declare const isTodayDatetime: (datetime: string | Date | number, options?: Pick<DateTimeComparisonOptions, "referenceTime" | "timezone">) => boolean;
/**
 * Checks if a datetime is within a specified time range from now
 *
 * @param datetime - DateTime to check
 * @param timeRange - Time range in milliseconds
 * @param options - Comparison options
 * @returns true if datetime is within the specified range
 *
 * @example
 * isWithinTimeRange('2023-06-15T14:30:00Z', TIME_UNITS.HOUR) // true if within 1 hour
 * isWithinTimeRange('2023-06-15T14:30:00Z', TIME_UNITS.DAY) // true if within 1 day
 */
export declare const isWithinTimeRange: (datetime: string | Date | number, timeRange: number, options?: DateTimeComparisonOptions) => boolean;
/**
 * Checks if a datetime has expired (passed by more than a certain duration)
 *
 * @param datetime - DateTime to check
 * @param expirationDuration - Duration in milliseconds after which it's considered expired
 * @param options - Comparison options
 * @returns true if datetime has expired
 *
 * @example
 * hasExpired('2023-06-15T14:30:00Z', TIME_UNITS.HOUR) // true if more than 1 hour ago
 * hasExpired('2023-06-15T14:30:00Z', TIME_UNITS.DAY) // true if more than 1 day ago
 */
export declare const hasExpired: (datetime: string | Date | number, expirationDuration: number, options?: DateTimeComparisonOptions) => boolean;
/**
 * Formats a datetime comparison result as a readable string
 *
 * @param result - Comparison result from compareDatetime
 * @returns Formatted string describing the comparison
 *
 * @example
 * const result = compareDatetime('2023-06-15T14:30:00Z');
 * formatComparisonResult(result)
 * // "2023-06-15T14:30:00.000Z was 3 hours ago (passed: true)"
 */
export declare const formatComparisonResult: (result: DateTimeComparisonResult) => string;
/**
 * Gets the time until a future datetime
 *
 * @param datetime - Target datetime
 * @param options - Comparison options
 * @returns Time difference in milliseconds (negative if in past)
 *
 * @example
 * getTimeUntil('2023-12-31T23:59:59Z') // milliseconds until New Year
 * getTimeUntil('2023-01-01T00:00:00Z') // negative number if already passed
 */
export declare const getTimeUntil: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => number;
/**
 * Gets the time since a past datetime
 *
 * @param datetime - Past datetime
 * @param options - Comparison options
 * @returns Time difference in milliseconds (negative if in future)
 *
 * @example
 * getTimeSince('2023-01-01T00:00:00Z') // milliseconds since New Year
 * getTimeSince('2025-01-01T00:00:00Z') // negative number if in future
 */
export declare const getTimeSince: (datetime: string | Date | number, options?: DateTimeComparisonOptions) => number;
/**
 * Filters an array of datetimes to only include those that have passed
 *
 * @param datetimes - Array of datetimes to filter
 * @param options - Comparison options
 * @returns Array of datetimes that have passed
 *
 * @example
 * filterPassedDatetimes([
 *   '2023-01-01T00:00:00Z',
 *   '2025-01-01T00:00:00Z',
 *   '2023-06-15T14:30:00Z'
 * ])
 * // Returns only the dates that have passed
 */
export declare const filterPassedDatetimes: (datetimes: (string | Date | number)[], options?: DateTimeComparisonOptions) => (string | Date | number)[];
/**
 * Finds the most recent datetime that has passed
 *
 * @param datetimes - Array of datetimes to search
 * @param options - Comparison options
 * @returns Most recent past datetime, or null if none have passed
 *
 * @example
 * findMostRecentPassed([
 *   '2023-01-01T00:00:00Z',
 *   '2023-06-15T14:30:00Z',
 *   '2025-01-01T00:00:00Z'
 * ])
 * // Returns '2023-06-15T14:30:00Z' (most recent that has passed)
 */
export declare const findMostRecentPassed: (datetimes: (string | Date | number)[], options?: DateTimeComparisonOptions) => string | Date | number | null;
/**
 * Finds the next upcoming datetime that hasn't passed yet
 *
 * @param datetimes - Array of datetimes to search
 * @param options - Comparison options
 * @returns Next upcoming datetime, or null if all have passed
 *
 * @example
 * findNextUpcoming([
 *   '2023-01-01T00:00:00Z',
 *   '2025-06-15T14:30:00Z',
 *   '2025-01-01T00:00:00Z'
 * ])
 * // Returns '2025-01-01T00:00:00Z' (earliest future date)
 */
export declare const findNextUpcoming: (datetimes: (string | Date | number)[], options?: DateTimeComparisonOptions) => string | Date | number | null;
export {};
//# sourceMappingURL=hasPassDatetime.d.ts.map