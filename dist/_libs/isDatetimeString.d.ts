/**
 * Configuration options for date/time validation
 */
interface DateTimeValidationOptions {
    /** Allowed date separators (default: ['-', '_', '.', '/']) */
    dateSeparators?: string[];
    /** Allowed time separators (default: [':']) */
    timeSeparators?: string[];
    /** Minimum year allowed (default: 1000) */
    minYear?: number;
    /** Maximum year allowed (default: 9999) */
    maxYear?: number;
    /** Whether to allow leap seconds (60 seconds) (default: false) */
    allowLeapSeconds?: boolean;
    /** Whether to allow 24:00:00 as valid time (default: true) */
    allow24Hour?: boolean;
    /** Whether to require leading zeros (default: true) */
    requireLeadingZeros?: boolean;
    /** Whether to validate against actual Date object (default: true) */
    crossValidateWithDate?: boolean;
    /** Custom date format patterns to support */
    customDatePatterns?: RegExp[];
    /** Custom time format patterns to support */
    customTimePatterns?: RegExp[];
}
/**
 * Detailed validation result with additional information
 */
interface ValidationResult {
    /** Whether the validation passed */
    isValid: boolean;
    /** Error message if validation failed */
    error?: string;
    /** Parsed components (year, month, day, hour, minute, second, millisecond) */
    components?: {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        millisecond?: number;
    };
    /** The format that was detected */
    detectedFormat?: string;
    /** Whether the date would be valid in a Date object */
    isValidDate?: boolean;
}
/**
 * Predefined date/time format patterns
 */
export declare const DATE_TIME_PATTERNS: {
    readonly DATE: {
        readonly BASIC: RegExp;
        readonly ISO: RegExp;
        readonly US: RegExp;
        readonly EUROPEAN: RegExp;
        readonly COMPACT: RegExp;
    };
    readonly TIME: {
        readonly BASIC: RegExp;
        readonly WITH_MILLISECONDS: RegExp;
        readonly TWELVE_HOUR: RegExp;
        readonly NO_SECONDS: RegExp;
    };
    readonly DATETIME: {
        readonly ISO: RegExp;
        readonly ISO_WITH_MS: RegExp;
        readonly ISO_WITH_TIMEZONE: RegExp;
        readonly BASIC_SPACE: RegExp;
        readonly SQL: RegExp;
    };
};
/**
 * Validates if a string represents a valid date
 * Enhanced version of the original isValidDate function
 *
 * @param dateString - Date string to validate
 * @param options - Validation options
 * @returns true if the date string is valid
 *
 * @example
 * // Basic usage (supports multiple separators)
 * isValidDate('2023-12-25') // true
 * isValidDate('2023/12/25') // true
 * isValidDate('2023.12.25') // true
 * isValidDate('2023_12_25') // true
 *
 * // Custom options
 * isValidDate('2023-02-29', { crossValidateWithDate: true }) // false (not a leap year)
 * isValidDate('1999-12-31', { minYear: 2000 }) // false (year too old)
 *
 * // Invalid examples
 * isValidDate('2023-13-01') // false (month > 12)
 * isValidDate('2023-02-30') // false (February doesn't have 30 days)
 */
export declare const isValidDate: (dateString: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
/**
 * Validates a date string and returns detailed information
 *
 * @param dateString - Date string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
export declare const validateDate: (dateString: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
/**
 * Validates if a string represents a valid time
 * Enhanced version of the original isValidTime function (fixed logic errors)
 *
 * @param timeString - Time string to validate
 * @param options - Validation options
 * @returns true if the time string is valid
 *
 * @example
 * // Basic usage
 * isValidTime('14:30:25') // true
 * isValidTime('14:30:25.123') // true (with milliseconds)
 * isValidTime('24:00:00') // true (midnight next day)
 * isValidTime('14:30') // true (without seconds, if allowed)
 *
 * // Invalid examples
 * isValidTime('25:00:00') // false (hour > 24)
 * isValidTime('14:60:00') // false (minute >= 60)
 * isValidTime('14:30:60') // false (second >= 60, unless leap seconds allowed)
 */
export declare const isValidTime: (timeString: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
/**
 * Validates a time string and returns detailed information
 *
 * @param timeString - Time string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
export declare const validateTime: (timeString: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
/**
 * Validates if a string represents a valid datetime
 * Enhanced version of the original isVaidDatetime function (fixed typo and logic)
 *
 * @param datetime - DateTime string to validate
 * @param options - Validation options
 * @returns true if the datetime string is valid
 *
 * @example
 * // Basic usage
 * isValidDatetime('2023-12-25 14:30:25') // true
 * isValidDatetime('2023/12/25 14:30:25') // true
 * isValidDatetime('2023-12-25T14:30:25') // true (ISO format)
 * isValidDatetime('2023-12-25T14:30:25.123Z') // true (ISO with timezone)
 *
 * // Invalid examples
 * isValidDatetime('2023-13-01 14:30:25') // false (invalid month)
 * isValidDatetime('2023-12-25 25:30:25') // false (invalid hour)
 */
export declare const isValidDatetime: (datetime: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
/**
 * Legacy function for backward compatibility
 * @deprecated Use isValidDatetime instead (fixed typo)
 */
export declare const isVaidDatetime: (datetime: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
/**
 * Validates a datetime string and returns detailed information
 *
 * @param datetime - DateTime string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
export declare const validateDatetime: (datetime: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
/**
 * Checks if a year is a leap year
 *
 * @param year - Year to check
 * @returns true if the year is a leap year
 */
export declare const isLeapYear: (year: number) => boolean;
/**
 * Detects the format of a date/time string
 *
 * @param dateTimeString - String to analyze
 * @returns Object describing the detected format
 *
 * @example
 * detectDateTimeFormat('2023-12-25T14:30:25.123Z')
 * // { type: 'datetime', format: 'ISO', hasMilliseconds: true, hasTimezone: true }
 */
export declare const detectDateTimeFormat: (dateTimeString: string) => {
    type: "date" | "time" | "datetime" | "unknown";
    format?: string;
    separator?: string;
    hasMilliseconds?: boolean;
    hasTimezone?: boolean;
    isValid?: boolean;
};
/**
 * Validates multiple date/time strings at once
 *
 * @param dateTimeStrings - Array of strings to validate
 * @param options - Validation options
 * @returns Array of validation results
 *
 * @example
 * validateMultipleDateTimes(['2023-12-25', '2023-02-30', '14:30:25'])
 * // [
 * //   { isValid: true, ... },
 * //   { isValid: false, error: 'Day must be between 1 and 28 for 2/2023' },
 * //   { isValid: true, ... }
 * // ]
 */
export declare const validateMultipleDateTimes: (dateTimeStrings: (string | null | undefined)[], options?: DateTimeValidationOptions) => ValidationResult[];
/**
 * Creates a reusable validator with predefined options
 *
 * @param defaultOptions - Default validation options
 * @returns Object with validation functions
 *
 * @example
 * const strictValidator = createDateTimeValidator({
 *   crossValidateWithDate: true,
 *   requireLeadingZeros: true,
 *   minYear: 2000,
 *   maxYear: 2100
 * });
 *
 * strictValidator.isValidDate('2023-12-25') // Uses predefined options
 */
export declare const createDateTimeValidator: (defaultOptions?: DateTimeValidationOptions) => {
    isValidDate: (dateString: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
    isValidTime: (timeString: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
    isValidDatetime: (datetime: string | null | undefined, options?: DateTimeValidationOptions) => boolean;
    validateDate: (dateString: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
    validateTime: (timeString: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
    validateDatetime: (datetime: string | null | undefined, options?: DateTimeValidationOptions) => ValidationResult;
};
export {};
//# sourceMappingURL=isDatetimeString.d.ts.map