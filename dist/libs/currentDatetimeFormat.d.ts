/**
 * Get current datetime string value
 *
 * @param datetime - string format to validate
 * @param start - set start time if true
 * @returns YYYY-MM-DD HH:MM:SS format or false if validation error
 *
 * Parameter value must be date.
 * const now = currentDatetimeFormat(new Date());
 */
declare const currentDatetimeFormat: (date?: Date) => string;
/**
 * Add days
 * @param date
 * @param days
 * @returns
 */
declare const addDays: (date?: Date, days?: number) => Date;
/**
 * Add hours
 */
declare const addHours: (date?: Date, hours?: number) => Date;

export { addDays, addHours, currentDatetimeFormat };
