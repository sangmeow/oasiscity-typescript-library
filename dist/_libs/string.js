"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateString = exports.padString = exports.maskString = exports.replaceSubstring = exports.insertString = exports.bindString = void 0;
/**
 * Replaces characters in a string starting from a specific position
 * Enhanced version of the original bindString function
 *
 * @param sourceString - The original string to modify
 * @param replacementString - The string to insert/replace with
 * @param options - Additional options for replacement
 * @returns Modified string with replacement applied
 *
 * @example
 * bindString('19700101232221', '20201212') // '20201212232221'
 * bindString('abcdefgh', 'XYZ', { startPosition: 2 }) // 'abXYZfgh'
 * bindString('abc', 'WXYZ', { paddingChar: '0' }) // 'WXYZ'
 */
const bindString = (sourceString, replacementString, options = {}) => {
    if (typeof sourceString !== 'string' || typeof replacementString !== 'string') {
        throw new TypeError('Both source and replacement must be strings');
    }
    const { startPosition = 0, padWithOriginal = true, paddingChar } = options;
    // Validate start position
    if (startPosition < 0) {
        throw new RangeError('Start position cannot be negative');
    }
    // Convert strings to arrays for manipulation
    const sourceArray = sourceString.split('');
    const replacementArray = replacementString.split('');
    // Handle case where start position is beyond source string
    if (startPosition >= sourceArray.length) {
        if (paddingChar) {
            // Pad source string to reach start position
            while (sourceArray.length < startPosition) {
                sourceArray.push(paddingChar);
            }
        }
        else {
            // Simply concatenate
            return sourceString + replacementString;
        }
    }
    // Replace characters
    for (let i = 0; i < replacementArray.length; i++) {
        const targetIndex = startPosition + i;
        if (targetIndex < sourceArray.length) {
            sourceArray[targetIndex] = replacementArray[i];
        }
        else if (padWithOriginal || paddingChar) {
            sourceArray.push(replacementArray[i]);
        }
    }
    return sourceArray.join('');
};
exports.bindString = bindString;
/**
 * Inserts a string at a specific position without replacing existing characters
 *
 * @param sourceString - The original string
 * @param insertString - The string to insert
 * @param position - Position to insert at (default: 0)
 * @returns String with inserted content
 *
 * @example
 * insertString('Hello World', 'Beautiful ', 6) // 'Hello Beautiful World'
 * insertString('abc', 'XYZ', 1) // 'aXYZbc'
 */
const insertString = (sourceString, insertString, position = 0) => {
    if (typeof sourceString !== 'string' || typeof insertString !== 'string') {
        throw new TypeError('Both source and insert strings must be strings');
    }
    if (position < 0) {
        position = 0;
    }
    else if (position > sourceString.length) {
        position = sourceString.length;
    }
    return sourceString.slice(0, position) + insertString + sourceString.slice(position);
};
exports.insertString = insertString;
/**
 * Replaces a substring with another string
 *
 * @param sourceString - The original string
 * @param searchString - The substring to find and replace
 * @param replacementString - The replacement string
 * @param replaceAll - Whether to replace all occurrences (default: false)
 * @returns String with replacements applied
 *
 * @example
 * replaceSubstring('hello world hello', 'hello', 'hi') // 'hi world hello'
 * replaceSubstring('hello world hello', 'hello', 'hi', true) // 'hi world hi'
 */
const replaceSubstring = (sourceString, searchString, replacementString, replaceAll = false) => {
    if (typeof sourceString !== 'string' || typeof searchString !== 'string' || typeof replacementString !== 'string') {
        throw new TypeError('All parameters must be strings');
    }
    if (searchString === '') {
        return sourceString;
    }
    if (replaceAll) {
        return sourceString.split(searchString).join(replacementString);
    }
    else {
        return sourceString.replace(searchString, replacementString);
    }
};
exports.replaceSubstring = replaceSubstring;
// =============================================================================
// Advanced String Manipulation Functions
// =============================================================================
/**
 * Masks characters in a string, typically for sensitive data
 *
 * @param inputString - The string to mask
 * @param maskChar - Character to use for masking (default: '*')
 * @param visibleStart - Number of characters to keep visible at start (default: 0)
 * @param visibleEnd - Number of characters to keep visible at end (default: 0)
 * @returns Masked string
 *
 * @example
 * maskString('1234567890', '*', 2, 2) // '12******90'
 * maskString('john@email.com', 'X', 1, 4) // 'jXXXXX.com'
 */
const maskString = (inputString, maskChar = '*', visibleStart = 0, visibleEnd = 0) => {
    if (typeof inputString !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (maskChar.length !== 1) {
        throw new Error('Mask character must be a single character');
    }
    const length = inputString.length;
    const totalVisible = visibleStart + visibleEnd;
    if (totalVisible >= length) {
        return inputString;
    }
    const start = inputString.slice(0, visibleStart);
    const end = inputString.slice(-visibleEnd || length);
    const maskLength = length - totalVisible;
    const mask = maskChar.repeat(maskLength);
    return start + mask + end;
};
exports.maskString = maskString;
/**
 * Pads a string to a specific length with a specified character
 *
 * @param inputString - The string to pad
 * @param targetLength - Target length for the string
 * @param padChar - Character to use for padding (default: ' ')
 * @param padStart - Whether to pad at start (true) or end (false, default)
 * @returns Padded string
 *
 * @example
 * padString('123', 6, '0', true) // '000123'
 * padString('hello', 10, '.', false) // 'hello.....'
 */
const padString = (inputString, targetLength, padChar = ' ', padStart = false) => {
    if (typeof inputString !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (padChar.length !== 1) {
        throw new Error('Pad character must be a single character');
    }
    if (inputString.length >= targetLength) {
        return inputString;
    }
    const padLength = targetLength - inputString.length;
    const padding = padChar.repeat(padLength);
    return padStart ? padding + inputString : inputString + padding;
};
exports.padString = padString;
/**
 * Truncates a string to a maximum length with optional ellipsis
 *
 * @param inputString - The string to truncate
 * @param maxLength - Maximum length of the result
 * @param ellipsis - String to append when truncated (default: '...')
 * @param truncateAtWord - Whether to truncate at word boundaries (default: false)
 * @returns Truncated string
 *
 * @example
 * truncateString('This is a long sentence', 10) // 'This is...'
 * truncateString('This is a long sentence', 10, '...', true) // 'This is...'
 */
const truncateString = (inputString, maxLength, ellipsis = '...', truncateAtWord = false) => {
    if (typeof inputString !== 'string') {
        throw new TypeError('Input must be a string');
    }
    if (inputString.length <= maxLength) {
        return inputString;
    }
    const truncateLength = maxLength - ellipsis.length;
    if (truncateLength <= 0) {
        return ellipsis.slice(0, maxLength);
    }
    let result = inputString.slice(0, truncateLength);
    if (truncateAtWord) {
        const lastSpace = result.lastIndexOf(' ');
        if (lastSpace > 0) {
            result = result.slice(0, lastSpace);
        }
    }
    return result + ellipsis;
};
exports.truncateString = truncateString;
//# sourceMappingURL=string.js.map