"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNextUpcoming = exports.findMostRecentPassed = exports.filterPassedDatetimes = exports.getTimeSince = exports.getTimeUntil = exports.formatComparisonResult = exports.hasExpired = exports.isWithinTimeRange = exports.isTodayDatetime = exports.isFutureDatetime = exports.compareDatetime = exports.hasPassDatetime = exports.hasPassedDatetime = exports.TIME_UNITS = void 0;
const isDatetimeString_1 = require("./isDatetimeString");
/**
 * Time unit constants for easy reference
 */
exports.TIME_UNITS = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000, // Approximate
    YEAR: 365 * 24 * 60 * 60 * 1000 // Approximate
};
// =============================================================================
// Core DateTime Comparison Functions
// =============================================================================
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
const hasPassedDatetime = (datetime, options = {}) => {
    const result = (0, exports.compareDatetime)(datetime, options);
    return result.hasPassed;
};
exports.hasPassedDatetime = hasPassedDatetime;
/**
 * Legacy function for backward compatibility
 * @deprecated Use hasPassedDatetime instead (fixed typo)
 */
exports.hasPassDatetime = exports.hasPassedDatetime;
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
const compareDatetime = (datetime, options = {}) => {
    const { referenceTime = new Date(), tolerance = 0, treatInvalidAsPassed = true, includeEqual = true } = options;
    // Parse reference time
    const refDate = new Date(referenceTime);
    if (isNaN(refDate.getTime())) {
        throw new Error('Invalid reference time provided');
    }
    // Handle different input types
    let parsedDate = null;
    let isValid = false;
    let error;
    if (datetime instanceof Date) {
        parsedDate = datetime;
        isValid = !isNaN(datetime.getTime());
        if (!isValid)
            error = 'Invalid Date object';
    }
    else if (typeof datetime === 'number') {
        parsedDate = new Date(datetime);
        isValid = !isNaN(parsedDate.getTime());
        if (!isValid)
            error = 'Invalid timestamp';
    }
    else if (typeof datetime === 'string') {
        // Use existing validation functions (with typo fix consideration)
        const isValidDateString = isDatetimeString_1.isValidDate && (0, isDatetimeString_1.isValidDate)(datetime);
        const isValidDatetimeString = isDatetimeString_1.isVaidDatetime && (0, isDatetimeString_1.isVaidDatetime)(datetime);
        if (isValidDateString || isValidDatetimeString) {
            parsedDate = new Date(datetime);
            isValid = !isNaN(parsedDate.getTime());
            if (!isValid)
                error = 'String recognized as date format but failed to parse';
        }
        else {
            // Try to parse anyway (more lenient)
            parsedDate = new Date(datetime);
            isValid = !isNaN(parsedDate.getTime());
            if (!isValid)
                error = 'Invalid date string format';
        }
    }
    else {
        error = 'Datetime must be a string, Date object, or number';
    }
    // Calculate time difference
    const timeDifference = isValid && parsedDate
        ? refDate.getTime() - parsedDate.getTime()
        : 0;
    // Determine if it has passed (considering tolerance)
    let hasPassed;
    if (!isValid) {
        hasPassed = treatInvalidAsPassed;
    }
    else {
        const effectiveDifference = timeDifference - tolerance;
        hasPassed = includeEqual ? effectiveDifference >= 0 : effectiveDifference > 0;
    }
    // Generate human-readable description
    const description = generateTimeDescription(timeDifference, isValid);
    return {
        hasPassed,
        isValid,
        parsedDate,
        referenceDate: refDate,
        timeDifference,
        description,
        error
    };
};
exports.compareDatetime = compareDatetime;
// =============================================================================
// Specialized DateTime Check Functions
// =============================================================================
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
const isFutureDatetime = (datetime, options = {}) => {
    return !(0, exports.hasPassedDatetime)(datetime, Object.assign(Object.assign({}, options), { includeEqual: false }));
};
exports.isFutureDatetime = isFutureDatetime;
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
const isTodayDatetime = (datetime, options = {}) => {
    const result = (0, exports.compareDatetime)(datetime, options);
    if (!result.isValid || !result.parsedDate) {
        return false;
    }
    const refDate = result.referenceDate;
    const targetDate = result.parsedDate;
    return (refDate.getFullYear() === targetDate.getFullYear() &&
        refDate.getMonth() === targetDate.getMonth() &&
        refDate.getDate() === targetDate.getDate());
};
exports.isTodayDatetime = isTodayDatetime;
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
const isWithinTimeRange = (datetime, timeRange, options = {}) => {
    const result = (0, exports.compareDatetime)(datetime, options);
    if (!result.isValid) {
        return false;
    }
    return Math.abs(result.timeDifference) <= timeRange;
};
exports.isWithinTimeRange = isWithinTimeRange;
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
const hasExpired = (datetime, expirationDuration, options = {}) => {
    var _a;
    const result = (0, exports.compareDatetime)(datetime, options);
    if (!result.isValid) {
        return (_a = options.treatInvalidAsPassed) !== null && _a !== void 0 ? _a : true;
    }
    return result.timeDifference > expirationDuration;
};
exports.hasExpired = hasExpired;
// =============================================================================
// Utility Functions
// =============================================================================
/**
 * Generates a human-readable description of time difference
 *
 * @param timeDifference - Time difference in milliseconds
 * @param isValid - Whether the input was valid
 * @returns Human-readable description
 */
const generateTimeDescription = (timeDifference, isValid) => {
    if (!isValid) {
        return 'Invalid datetime';
    }
    if (timeDifference === 0) {
        return 'Now';
    }
    const absTimeDiff = Math.abs(timeDifference);
    const isPast = timeDifference > 0;
    const suffix = isPast ? ' ago' : ' from now';
    // Define time units in descending order
    const units = [
        { name: 'year', value: exports.TIME_UNITS.YEAR, plural: 'years' },
        { name: 'month', value: exports.TIME_UNITS.MONTH, plural: 'months' },
        { name: 'week', value: exports.TIME_UNITS.WEEK, plural: 'weeks' },
        { name: 'day', value: exports.TIME_UNITS.DAY, plural: 'days' },
        { name: 'hour', value: exports.TIME_UNITS.HOUR, plural: 'hours' },
        { name: 'minute', value: exports.TIME_UNITS.MINUTE, plural: 'minutes' },
        { name: 'second', value: exports.TIME_UNITS.SECOND, plural: 'seconds' }
    ];
    for (const unit of units) {
        const count = Math.floor(absTimeDiff / unit.value);
        if (count >= 1) {
            const unitName = count === 1 ? unit.name : unit.plural;
            return `${count} ${unitName}${suffix}`;
        }
    }
    return `${absTimeDiff} milliseconds${suffix}`;
};
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
const formatComparisonResult = (result) => {
    var _a;
    if (!result.isValid) {
        return `Invalid datetime: ${result.error || 'Unknown error'}`;
    }
    const dateStr = ((_a = result.parsedDate) === null || _a === void 0 ? void 0 : _a.toISOString()) || 'Unknown';
    return `${dateStr} was ${result.description} (passed: ${result.hasPassed})`;
};
exports.formatComparisonResult = formatComparisonResult;
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
const getTimeUntil = (datetime, options = {}) => {
    const result = (0, exports.compareDatetime)(datetime, options);
    return result.isValid ? -result.timeDifference : 0;
};
exports.getTimeUntil = getTimeUntil;
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
const getTimeSince = (datetime, options = {}) => {
    const result = (0, exports.compareDatetime)(datetime, options);
    return result.isValid ? result.timeDifference : 0;
};
exports.getTimeSince = getTimeSince;
// =============================================================================
// Batch DateTime Operations
// =============================================================================
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
const filterPassedDatetimes = (datetimes, options = {}) => {
    return datetimes.filter(datetime => (0, exports.hasPassedDatetime)(datetime, options));
};
exports.filterPassedDatetimes = filterPassedDatetimes;
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
const findMostRecentPassed = (datetimes, options = {}) => {
    const passedDatetimes = datetimes
        .map(datetime => ({ datetime, result: (0, exports.compareDatetime)(datetime, options) }))
        .filter(({ result }) => result.hasPassed && result.isValid)
        .sort((a, b) => { var _a, _b; return (((_a = a.result.parsedDate) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = b.result.parsedDate) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); });
    return passedDatetimes.length > 0
        ? passedDatetimes[passedDatetimes.length - 1].datetime
        : null;
};
exports.findMostRecentPassed = findMostRecentPassed;
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
const findNextUpcoming = (datetimes, options = {}) => {
    const futureeDatetimes = datetimes
        .map(datetime => ({ datetime, result: (0, exports.compareDatetime)(datetime, options) }))
        .filter(({ result }) => !result.hasPassed && result.isValid)
        .sort((a, b) => { var _a, _b; return (((_a = a.result.parsedDate) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = b.result.parsedDate) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); });
    return futureeDatetimes.length > 0 ? futureeDatetimes[0].datetime : null;
};
exports.findNextUpcoming = findNextUpcoming;
//# sourceMappingURL=hasPassDatetime.js.map