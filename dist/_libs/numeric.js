"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlphanumericCharacters = exports.getNumericCharacters = void 0;
/**
 * Extracts numeric characters from a string
 *
 * @param inputString - The input string to process
 * @param options - Additional options for extraction
 * @returns String containing only numeric characters (0-9)
 *
 * @example
 * getNumericCharacters('a1b2c3d4') // '1234'
 * getNumericCharacters('price: $29.99') // '2999'
 * getNumericCharacters('abc123def456', { maxLength: 3 }) // '123'
 * getNumericCharacters('112233', { removeDuplicates: true }) // '123'
 */
const getNumericCharacters = (inputString, options = {}) => {
    if (typeof inputString !== 'string') {
        throw new TypeError('Input must be a string');
    }
    const { preserveOrder = true, removeDuplicates = false, maxLength } = options;
    // Extract numeric characters
    let result = inputString.replace(/\D/g, '');
    // Remove duplicates if requested
    if (removeDuplicates) {
        if (preserveOrder) {
            result = [...new Set(result)].join('');
        }
        else {
            result = Array.from(new Set(result)).sort().join('');
        }
    }
    // Apply length limit
    if (maxLength !== undefined && maxLength > 0) {
        result = result.slice(0, maxLength);
    }
    return result;
};
exports.getNumericCharacters = getNumericCharacters;
/**
 * Extracts alphanumeric characters from a string
 *
 * @param inputString - The input string to process
 * @param options - Additional options for extraction
 * @returns String containing only alphanumeric characters
 *
 * @example
 * getAlphanumericCharacters('Hello@123#World!') // 'Hello123World'
 */
const getAlphanumericCharacters = (inputString, options = {}) => {
    if (typeof inputString !== 'string') {
        throw new TypeError('Input must be a string');
    }
    const { preserveOrder = true, removeDuplicates = false, maxLength } = options;
    let result = inputString.replace(/[^a-zA-Z0-9]/g, '');
    if (removeDuplicates) {
        if (preserveOrder) {
            result = [...new Set(result)].join('');
        }
        else {
            result = Array.from(new Set(result)).sort().join('');
        }
    }
    if (maxLength !== undefined && maxLength > 0) {
        result = result.slice(0, maxLength);
    }
    return result;
};
exports.getAlphanumericCharacters = getAlphanumericCharacters;
//# sourceMappingURL=numeric.js.map