"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateTimeValidator = exports.validateMultipleDateTimes = exports.detectDateTimeFormat = exports.isLeapYear = exports.validateDatetime = exports.isVaidDatetime = exports.isValidDatetime = exports.validateTime = exports.isValidTime = exports.validateDate = exports.isValidDate = exports.DATE_TIME_PATTERNS = void 0;
/**
 * Predefined date/time format patterns
 */
exports.DATE_TIME_PATTERNS = {
    DATE: {
        BASIC: /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2}$/,
        ISO: /^\d{4}-\d{2}-\d{2}$/,
        US: /^\d{2}\/\d{2}\/\d{4}$/,
        EUROPEAN: /^\d{2}\.\d{2}\.\d{4}$/,
        COMPACT: /^\d{8}$/
    },
    TIME: {
        BASIC: /^\d{2}:\d{2}:\d{2}$/,
        WITH_MILLISECONDS: /^\d{2}:\d{2}:\d{2}\.\d{3}$/,
        TWELVE_HOUR: /^\d{1,2}:\d{2}:\d{2}\s*(AM|PM)$/i,
        NO_SECONDS: /^\d{2}:\d{2}$/
    },
    DATETIME: {
        ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
        ISO_WITH_MS: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/,
        ISO_WITH_TIMEZONE: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?([+-]\d{2}:\d{2})?$/,
        BASIC_SPACE: /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2}\s+\d{2}:\d{2}:\d{2}$/,
        SQL: /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/
    }
};
// =============================================================================
// Enhanced Date Validation Functions
// =============================================================================
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
const isValidDate = (dateString, options = {}) => {
    const result = (0, exports.validateDate)(dateString, options);
    return result.isValid;
};
exports.isValidDate = isValidDate;
/**
 * Validates a date string and returns detailed information
 *
 * @param dateString - Date string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
const validateDate = (dateString, options = {}) => {
    const { dateSeparators = ['-', '_', '.', '/'], minYear = 1000, maxYear = 9999, requireLeadingZeros = true, crossValidateWithDate = true, customDatePatterns = [] } = options;
    // Handle null/undefined
    if (dateString === null || dateString === undefined) {
        return { isValid: false, error: 'Date string is null or undefined' };
    }
    if (typeof dateString !== 'string') {
        return { isValid: false, error: 'Date must be a string' };
    }
    const trimmedDate = dateString.trim();
    if (!trimmedDate) {
        return { isValid: false, error: 'Date string is empty' };
    }
    // Try custom patterns first
    for (const pattern of customDatePatterns) {
        if (pattern.test(trimmedDate)) {
            // Custom validation would need to be implemented by the caller
            return { isValid: true, detectedFormat: 'custom' };
        }
    }
    // Create regex pattern based on allowed separators
    const separatorPattern = dateSeparators.map(sep => sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
    const datePattern = requireLeadingZeros
        ? new RegExp(`^\\d{4}[${separatorPattern}]\\d{2}[${separatorPattern}]\\d{2}$`)
        : new RegExp(`^\\d{4}[${separatorPattern}]\\d{1,2}[${separatorPattern}]\\d{1,2}$`);
    if (!datePattern.test(trimmedDate)) {
        return {
            isValid: false,
            error: `Date format not recognized. Expected: YYYY${dateSeparators[0]}MM${dateSeparators[0]}DD`
        };
    }
    // Parse date components
    const separator = dateSeparators.find(sep => trimmedDate.includes(sep));
    if (!separator) {
        return { isValid: false, error: 'No valid separator found' };
    }
    const parts = trimmedDate.split(separator);
    if (parts.length !== 3) {
        return { isValid: false, error: 'Date must have exactly 3 parts (year, month, day)' };
    }
    const [yearStr, monthStr, dayStr] = parts;
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const components = { year, month, day };
    // Validate ranges
    if (isNaN(year) || year < minYear || year > maxYear) {
        return {
            isValid: false,
            error: `Year must be between ${minYear} and ${maxYear}`,
            components
        };
    }
    if (isNaN(month) || month < 1 || month > 12) {
        return {
            isValid: false,
            error: 'Month must be between 1 and 12',
            components
        };
    }
    if (isNaN(day) || day < 1) {
        return {
            isValid: false,
            error: 'Day must be positive',
            components
        };
    }
    // Calculate days in month (improved leap year calculation)
    const daysInMonth = getDaysInMonth(year, month);
    if (day > daysInMonth) {
        return {
            isValid: false,
            error: `Day must be between 1 and ${daysInMonth} for ${month}/${year}`,
            components
        };
    }
    // Cross-validate with Date object if requested
    let isValidDate = true;
    if (crossValidateWithDate) {
        const dateObj = new Date(year, month - 1, day);
        isValidDate = dateObj.getFullYear() === year &&
            dateObj.getMonth() === month - 1 &&
            dateObj.getDate() === day;
    }
    return {
        isValid: isValidDate,
        error: isValidDate ? undefined : 'Date is not valid when parsed by JavaScript Date',
        components,
        detectedFormat: `YYYY${separator}MM${separator}DD`,
        isValidDate
    };
};
exports.validateDate = validateDate;
// =============================================================================
// Enhanced Time Validation Functions
// =============================================================================
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
const isValidTime = (timeString, options = {}) => {
    const result = (0, exports.validateTime)(timeString, options);
    return result.isValid;
};
exports.isValidTime = isValidTime;
/**
 * Validates a time string and returns detailed information
 *
 * @param timeString - Time string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
const validateTime = (timeString, options = {}) => {
    const { timeSeparators = [':'], allowLeapSeconds = false, allow24Hour = true, requireLeadingZeros = true, customTimePatterns = [] } = options;
    // Handle null/undefined
    if (timeString === null || timeString === undefined) {
        return { isValid: false, error: 'Time string is null or undefined' };
    }
    if (typeof timeString !== 'string') {
        return { isValid: false, error: 'Time must be a string' };
    }
    const trimmedTime = timeString.trim();
    if (!trimmedTime) {
        return { isValid: false, error: 'Time string is empty' };
    }
    // Try custom patterns first
    for (const pattern of customTimePatterns) {
        if (pattern.test(trimmedTime)) {
            return { isValid: true, detectedFormat: 'custom' };
        }
    }
    // Support multiple time formats
    const timePatterns = [
        /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/, // HH:MM:SS.mmm
        /^(\d{2}):(\d{2}):(\d{2})$/, // HH:MM:SS
        /^(\d{2}):(\d{2})$/ // HH:MM
    ];
    let match = null;
    let detectedFormat = '';
    for (const pattern of timePatterns) {
        match = trimmedTime.match(pattern);
        if (match) {
            if (pattern.source.includes('\\.')) {
                detectedFormat = 'HH:MM:SS.mmm';
            }
            else if (pattern.source.includes(':(\\d{2})$')) {
                detectedFormat = 'HH:MM:SS';
            }
            else {
                detectedFormat = 'HH:MM';
            }
            break;
        }
    }
    if (!match) {
        return {
            isValid: false,
            error: 'Time format not recognized. Expected: HH:MM:SS, HH:MM:SS.mmm, or HH:MM'
        };
    }
    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const second = match[3] ? parseInt(match[3], 10) : 0;
    const millisecond = match[4] ? parseInt(match[4], 10) : 0;
    const components = { hour, minute, second, millisecond };
    // Validate hour (fixed logic error from original)
    if (hour < 0 || hour > (allow24Hour ? 24 : 23)) {
        return {
            isValid: false,
            error: `Hour must be between 0 and ${allow24Hour ? 24 : 23}`,
            components
        };
    }
    // Validate minute
    if (minute < 0 || minute >= 60) {
        return {
            isValid: false,
            error: 'Minute must be between 0 and 59',
            components
        };
    }
    // Validate second
    const maxSecond = allowLeapSeconds ? 60 : 59;
    if (second < 0 || second > maxSecond) {
        return {
            isValid: false,
            error: `Second must be between 0 and ${maxSecond}`,
            components
        };
    }
    // Validate millisecond
    if (millisecond < 0 || millisecond > 999) {
        return {
            isValid: false,
            error: 'Millisecond must be between 0 and 999',
            components
        };
    }
    // Special validation for 24:00:00 (should only be exactly 24:00:00.000)
    if (hour === 24) {
        if (minute !== 0 || second !== 0 || millisecond !== 0) {
            return {
                isValid: false,
                error: '24:00:00 is only valid when minutes, seconds, and milliseconds are all 0',
                components
            };
        }
    }
    return {
        isValid: true,
        components,
        detectedFormat
    };
};
exports.validateTime = validateTime;
// =============================================================================
// Enhanced DateTime Validation Functions
// =============================================================================
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
const isValidDatetime = (datetime, options = {}) => {
    const result = (0, exports.validateDatetime)(datetime, options);
    return result.isValid;
};
exports.isValidDatetime = isValidDatetime;
/**
 * Legacy function for backward compatibility
 * @deprecated Use isValidDatetime instead (fixed typo)
 */
exports.isVaidDatetime = exports.isValidDatetime;
/**
 * Validates a datetime string and returns detailed information
 *
 * @param datetime - DateTime string to validate
 * @param options - Validation options
 * @returns Detailed validation result
 */
const validateDatetime = (datetime, options = {}) => {
    // Handle null/undefined
    if (datetime === null || datetime === undefined) {
        return { isValid: false, error: 'DateTime string is null or undefined' };
    }
    if (typeof datetime !== 'string') {
        return { isValid: false, error: 'DateTime must be a string' };
    }
    const trimmedDateTime = datetime.trim();
    if (!trimmedDateTime) {
        return { isValid: false, error: 'DateTime string is empty' };
    }
    // Try to match various datetime formats
    const datetimePatterns = [
        /^(.+)T(.+)$/, // ISO format: YYYY-MM-DDTHH:MM:SS
        /^(.+)\s+(.+)$/ // Space separated: YYYY-MM-DD HH:MM:SS
    ];
    let datePart = '';
    let timePart = '';
    let detectedFormat = '';
    for (const pattern of datetimePatterns) {
        const match = trimmedDateTime.match(pattern);
        if (match) {
            datePart = match[1];
            timePart = match[2];
            detectedFormat = pattern.source.includes('T') ? 'ISO' : 'space-separated';
            break;
        }
    }
    if (!datePart || !timePart) {
        return {
            isValid: false,
            error: 'DateTime format not recognized. Expected: YYYY-MM-DD HH:MM:SS or YYYY-MM-DDTHH:MM:SS'
        };
    }
    // Handle timezone suffixes (Z, +HH:MM, -HH:MM)
    const timezoneSuffixes = /[Z]$|[+-]\d{2}:\d{2}$/;
    if (timezoneSuffixes.test(timePart)) {
        timePart = timePart.replace(timezoneSuffixes, '');
        detectedFormat += ' with timezone';
    }
    // Validate date part
    const dateResult = (0, exports.validateDate)(datePart, options);
    if (!dateResult.isValid) {
        return {
            isValid: false,
            error: `Invalid date part: ${dateResult.error}`,
            components: dateResult.components
        };
    }
    // Validate time part
    const timeResult = (0, exports.validateTime)(timePart, options);
    if (!timeResult.isValid) {
        return {
            isValid: false,
            error: `Invalid time part: ${timeResult.error}`,
            components: Object.assign(Object.assign({}, dateResult.components), timeResult.components)
        };
    }
    // Combine components
    const components = Object.assign(Object.assign({}, dateResult.components), timeResult.components);
    return {
        isValid: true,
        components,
        detectedFormat
    };
};
exports.validateDatetime = validateDatetime;
// =============================================================================
// Utility Functions
// =============================================================================
/**
 * Gets the number of days in a month for a given year
 *
 * @param year - Year to check
 * @param month - Month (1-12) to check
 * @returns Number of days in the month
 */
const getDaysInMonth = (year, month) => {
    // Days in each month (non-leap year)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && (0, exports.isLeapYear)(year)) {
        return 29;
    }
    return daysInMonth[month - 1] || 0;
};
/**
 * Checks if a year is a leap year
 *
 * @param year - Year to check
 * @returns true if the year is a leap year
 */
const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
exports.isLeapYear = isLeapYear;
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
const detectDateTimeFormat = (dateTimeString) => {
    if (!dateTimeString || typeof dateTimeString !== 'string') {
        return { type: 'unknown' };
    }
    const trimmed = dateTimeString.trim();
    // Check for datetime patterns
    if (exports.DATE_TIME_PATTERNS.DATETIME.ISO_WITH_TIMEZONE.test(trimmed)) {
        return {
            type: 'datetime',
            format: 'ISO',
            hasMilliseconds: trimmed.includes('.'),
            hasTimezone: /[Z]$|[+-]\d{2}:\d{2}$/.test(trimmed),
            isValid: (0, exports.isValidDatetime)(trimmed)
        };
    }
    if (exports.DATE_TIME_PATTERNS.DATETIME.BASIC_SPACE.test(trimmed)) {
        return {
            type: 'datetime',
            format: 'space-separated',
            separator: trimmed.includes('-') ? '-' : trimmed.includes('/') ? '/' :
                trimmed.includes('.') ? '.' : '_',
            isValid: (0, exports.isValidDatetime)(trimmed)
        };
    }
    // Check for date patterns
    if (exports.DATE_TIME_PATTERNS.DATE.BASIC.test(trimmed)) {
        return {
            type: 'date',
            format: 'basic',
            separator: trimmed.includes('-') ? '-' : trimmed.includes('/') ? '/' :
                trimmed.includes('.') ? '.' : '_',
            isValid: (0, exports.isValidDate)(trimmed)
        };
    }
    // Check for time patterns
    if (exports.DATE_TIME_PATTERNS.TIME.WITH_MILLISECONDS.test(trimmed)) {
        return {
            type: 'time',
            format: '24-hour',
            hasMilliseconds: true,
            isValid: (0, exports.isValidTime)(trimmed)
        };
    }
    if (exports.DATE_TIME_PATTERNS.TIME.BASIC.test(trimmed)) {
        return {
            type: 'time',
            format: '24-hour',
            hasMilliseconds: false,
            isValid: (0, exports.isValidTime)(trimmed)
        };
    }
    return { type: 'unknown' };
};
exports.detectDateTimeFormat = detectDateTimeFormat;
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
const validateMultipleDateTimes = (dateTimeStrings, options = {}) => {
    return dateTimeStrings.map(dateTimeString => {
        const format = (0, exports.detectDateTimeFormat)(dateTimeString || '');
        switch (format.type) {
            case 'date':
                return (0, exports.validateDate)(dateTimeString, options);
            case 'time':
                return (0, exports.validateTime)(dateTimeString, options);
            case 'datetime':
                return (0, exports.validateDatetime)(dateTimeString, options);
            default:
                return {
                    isValid: false,
                    error: 'Unable to detect date/time format'
                };
        }
    });
};
exports.validateMultipleDateTimes = validateMultipleDateTimes;
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
const createDateTimeValidator = (defaultOptions = {}) => {
    return {
        isValidDate: (dateString, options = {}) => (0, exports.isValidDate)(dateString, Object.assign(Object.assign({}, defaultOptions), options)),
        isValidTime: (timeString, options = {}) => (0, exports.isValidTime)(timeString, Object.assign(Object.assign({}, defaultOptions), options)),
        isValidDatetime: (datetime, options = {}) => (0, exports.isValidDatetime)(datetime, Object.assign(Object.assign({}, defaultOptions), options)),
        validateDate: (dateString, options = {}) => (0, exports.validateDate)(dateString, Object.assign(Object.assign({}, defaultOptions), options)),
        validateTime: (timeString, options = {}) => (0, exports.validateTime)(timeString, Object.assign(Object.assign({}, defaultOptions), options)),
        validateDatetime: (datetime, options = {}) => (0, exports.validateDatetime)(datetime, Object.assign(Object.assign({}, defaultOptions), options))
    };
};
exports.createDateTimeValidator = createDateTimeValidator;
//# sourceMappingURL=isDatetimeString.js.map