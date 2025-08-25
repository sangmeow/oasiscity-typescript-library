/**
 * Validates if the input is a valid date value
 * @param input - The input value to validate (string, number, or Date)
 * @returns true if the input is a valid date, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateTime(); // true (uses current date)
 * isValidDateTime('2024-08-21'); // true (date only, time defaults to 00:00:00)
 * isValidDateTime(new Date()); // true (Date object)
 * isValidDateTime(Date.now()); // true (timestamp)
 * isValidDateTime('invalid-date'); // false (invalid format)
 * isValidDateTime(''); // false (empty string)
 * ```
 */
declare const isValidDate: (input?: string | number | Date) => boolean;

export { isValidDate };
