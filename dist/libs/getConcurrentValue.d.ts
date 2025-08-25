/**
 * Generates a unique concurrent value based on the current UTC time.
 *
 * @description
 * This function converts the current UTC time to a string in YYYYMMDDHHMMSS_sss format.
 * Even when executed concurrently, it can generate unique values by distinguishing them
 * at the millisecond level.
 *
 * @returns {string} UTC-based time string (format: YYYYMMDDHHMMSS_sss)
 * @example
 * // August 23, 2025 14:30:45.123 UTC
 * getConcurrentValue(); // "20250823143045_123"
 *
 * @since 1.0.0
 */
export declare const getConcurrentValue: () => string;
export declare const getConcurrentDateTimeValue: () => string;
export declare const getConcurrentDateHourValue: () => string;
export declare const getConcurrentDateValue: () => string;
//# sourceMappingURL=getConcurrentValue.d.ts.map