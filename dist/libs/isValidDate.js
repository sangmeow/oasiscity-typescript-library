"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
const isValidDateTime_1 = require("./isValidDateTime");
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
const isValidDate = (input) => {
    return (0, isValidDateTime_1.isValidDateTime)(input);
};
exports.isValidDate = isValidDate;
//# sourceMappingURL=isValidDate.js.map