/**
 * Get offset value in minutes from the server
 * @returns offset
 * e.g. -540
 */
declare const getTimezoneOffset: () => number;
/**
 * Get offset value in hours from the server
 * @returns offset
 * e.g. -9
 */
declare const getTimezoneOffsetHour: () => number;
/**
 * Get current datetime in Date type
 * @returns Date
 * e.g. 2024-10-14T02:40:38.140Z
 */
declare const getDatetimeUtcDate: () => Date;
/**
 * Get current datetime in string type
 * @returns string
 * e.g. 2024-10-14T02:40:38.140Z
 */
declare const getDatetimeUtcString: () => string;
/**
 * Get current datetime in string type
 * @returns string
 * e.g. 2024-10-14 02:40:38.140
 */
declare const getDatetimeString: () => string;

export { getDatetimeString, getDatetimeUtcDate, getDatetimeUtcString, getTimezoneOffset, getTimezoneOffsetHour };
