"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConcurrentDateValue = exports.getConcurrentDateHourValue = exports.getConcurrentDateTimeValue = exports.getConcurrentValue = void 0;
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
const getConcurrentValue = () => {
    const now = new Date();
    // Extract UTC time components and format them appropriately
    const year = now.getUTCFullYear().toString();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = now.getUTCMilliseconds().toString().padStart(3, '0'); // Pad 0-999 range to 3 digits
    // Generate date/time string in YYYYMMDDHHMMSS format
    const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
    // Final format: YYYYMMDDHHMMSS_sss
    return `${dateTimeString}_${milliseconds}`;
};
exports.getConcurrentValue = getConcurrentValue;
const getConcurrentDateTimeValue = () => {
    const now = new Date();
    // Extract UTC time components and format them appropriately
    const year = now.getUTCFullYear().toString();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    // Generate date/time string in YYYYMMDDHHMMSS format
    const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
    // Final format: YYYYMMDDHHMMSS
    return `${dateTimeString}`;
};
exports.getConcurrentDateTimeValue = getConcurrentDateTimeValue;
const getConcurrentDateHourValue = () => {
    const now = new Date();
    // Extract UTC time components and format them appropriately
    const year = now.getUTCFullYear().toString();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hours = now.getUTCHours().toString().padStart(2, '0');
    // Generate date/time string in YYYYMMDD-HH format
    const dateTimeString = `${year}${month}${day}_${hours}`;
    // Final format: YYYYMMDD
    return `${dateTimeString}`;
};
exports.getConcurrentDateHourValue = getConcurrentDateHourValue;
const getConcurrentDateValue = () => {
    const now = new Date();
    // Extract UTC time components and format them appropriately
    const year = now.getUTCFullYear().toString();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day = now.getUTCDate().toString().padStart(2, '0');
    // Generate date/time string in YYYYMMDD format
    const dateTimeString = `${year}${month}${day}`;
    // Final format: YYYYMMDD
    return `${dateTimeString}`;
};
exports.getConcurrentDateValue = getConcurrentDateValue;
//# sourceMappingURL=getConcurrentValue.js.map