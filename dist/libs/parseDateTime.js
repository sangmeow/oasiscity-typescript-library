"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateTime = void 0;
/**
 * Converts various types of input to Date object
 * @param input - Date input value of string, number, or Date type
 * @returns Date object
 */
const parseDateTime = (input) => {
    // Return as is if Date type
    if (input instanceof Date) {
        return input;
    }
    // Convert to string if number type
    let dateStr = typeof input === "number" ? input.toString() : input;
    // Remove special characters for string input (keep only numbers)
    if (typeof input === "string") {
        dateStr = dateStr.replace(/[^0-9]/g, "");
    }
    // Check for empty string
    if (!dateStr) {
        throw new Error("Invalid date format: no numbers found");
    }
    // Process according to pattern
    switch (dateStr.length) {
        case 4: {
            // 'YYYY' format
            const year = Number.parseInt(dateStr, 10);
            return new Date(year, 0, 1, 0, 0, 0, 0); // January 1st, 00:00:00
        }
        case 6: {
            // 'YYYYMM' format
            const yearMonth = dateStr;
            const year6 = Number.parseInt(yearMonth.substring(0, 4), 10);
            const month6 = Number.parseInt(yearMonth.substring(4, 6), 10);
            return new Date(year6, month6 - 1, 1, 0, 0, 0, 0); // 1st day of MM month, 00:00:00 (month starts from 0)
        }
        case 8: {
            // 'YYYYMMDD' format
            const yearMonthDay = dateStr;
            const year8 = Number.parseInt(yearMonthDay.substring(0, 4), 10);
            const month8 = Number.parseInt(yearMonthDay.substring(4, 6), 10);
            const day8 = Number.parseInt(yearMonthDay.substring(6, 8), 10);
            return new Date(year8, month8 - 1, day8, 0, 0, 0, 0); // MM month DD day, 00:00:00
        }
        case 10: {
            // 'YYYYMMDDHH' format
            const year10 = Number.parseInt(dateStr.substring(0, 4), 10);
            const month10 = Number.parseInt(dateStr.substring(4, 6), 10);
            const day10 = Number.parseInt(dateStr.substring(6, 8), 10);
            const hour10 = Number.parseInt(dateStr.substring(8, 10), 10);
            return new Date(year10, month10 - 1, day10, hour10, 0, 0, 0); // MM month DD day HH hour, 00:00
        }
        case 12: {
            // 'YYYYMMDDHHMM' format
            const year12 = Number.parseInt(dateStr.substring(0, 4), 10);
            const month12 = Number.parseInt(dateStr.substring(4, 6), 10);
            const day12 = Number.parseInt(dateStr.substring(6, 8), 10);
            const hour12 = Number.parseInt(dateStr.substring(8, 10), 10);
            const minute12 = Number.parseInt(dateStr.substring(10, 12), 10);
            return new Date(year12, month12 - 1, day12, hour12, minute12, 0, 0); // MM month DD day HH hour MM minute, 00 seconds
        }
        case 14: {
            // 'YYYYMMDDHHMMSS' format
            const year14 = Number.parseInt(dateStr.substring(0, 4), 10);
            const month14 = Number.parseInt(dateStr.substring(4, 6), 10);
            const day14 = Number.parseInt(dateStr.substring(6, 8), 10);
            const hour14 = Number.parseInt(dateStr.substring(8, 10), 10);
            const minute14 = Number.parseInt(dateStr.substring(10, 12), 10);
            const second14 = Number.parseInt(dateStr.substring(12, 14), 10);
            return new Date(year14, month14 - 1, day14, hour14, minute14, second14, 0); // MM month DD day HH hour MM minute SS seconds
        }
        default:
            throw new Error(`Unsupported date format: ${dateStr}`);
    }
};
exports.parseDateTime = parseDateTime;
//# sourceMappingURL=parseDateTime.js.map