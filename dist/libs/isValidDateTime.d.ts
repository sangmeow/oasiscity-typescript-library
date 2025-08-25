/**
 * Validates if the input is a valid date/time value
 * @param input - The input value to validate (string, number, or Date)
 * @returns true if the input is a valid date/time, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateTime(); // true (uses current date/time)
 * isValidDateTime('2024-08-21'); // true (date only, time defaults to 00:00:00)
 * isValidDateTime('2024-08-21T14:30:00'); // true (full date/time)
 * isValidDateTime(new Date()); // true (Date object)
 * isValidDateTime(Date.now()); // true (timestamp)
 * isValidDateTime('invalid-date'); // false (invalid format)
 * isValidDateTime(''); // false (empty string)
 * ```
 */
export declare const isValidDateTime: (input?: string | number | Date) => boolean;
//# sourceMappingURL=isValidDateTime.d.ts.map