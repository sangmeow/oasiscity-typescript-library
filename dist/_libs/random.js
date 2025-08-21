"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomColor = exports.randomCoordinates = exports.randomDateInFuture = exports.randomDateInPast = exports.randomDate = exports.randomSample = exports.randomChoice = exports.randomBoolean = exports.randomUUID = exports.randomHex = exports.randomAlphanumeric = exports.randomString = exports.randomNumberWithPadZeros = exports.randomFloat = exports.randomNumber = exports.CHARACTER_SETS = void 0;
/**
 * Character sets for random string generation
 */
exports.CHARACTER_SETS = {
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    HEX: '0123456789ABCDEF',
    BASE64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    URL_SAFE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
};
// =============================================================================
// Number Generation Functions
// =============================================================================
/**
 * Generates a random integer between min and max (inclusive by default)
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive by default)
 * @param options - Additional options for number generation
 * @returns Random integer within the specified range
 *
 * @example
 * randomNumber(1, 10) // Random integer from 1 to 10
 * randomNumber(0, 100, { exclude: [50, 75] }) // Excludes 50 and 75
 * randomNumber(1, 6) // Dice roll simulation
 */
const randomNumber = (min, max, options = {}) => {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new Error('Min and max must be finite numbers');
    }
    if (min > max) {
        throw new Error('Min cannot be greater than max');
    }
    const { inclusive = true, exclude = [] } = options;
    // Generate random number
    const range = inclusive ? (max - min + 1) : (max - min);
    let result;
    let attempts = 0;
    const maxAttempts = 1000; // Prevent infinite loops
    do {
        result = Math.floor(Math.random() * range + min);
        attempts++;
        if (attempts > maxAttempts) {
            throw new Error('Unable to generate number that meets exclusion criteria');
        }
    } while (exclude.includes(result));
    return result;
};
exports.randomNumber = randomNumber;
/**
 * Generates a random floating-point number between min and max
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Random floating-point number
 *
 * @example
 * randomFloat(0, 1) // Random float like 0.73
 * randomFloat(10, 20, 3) // Random float like 15.234
 */
const randomFloat = (min, max, decimalPlaces = 2) => {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new Error('Min and max must be finite numbers');
    }
    if (min >= max) {
        throw new Error('Min must be less than max for float generation');
    }
    if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
        throw new Error('Decimal places must be a non-negative integer');
    }
    const random = Math.random() * (max - min) + min;
    return Number(random.toFixed(decimalPlaces));
};
exports.randomFloat = randomFloat;
/**
 * Generates a random number with zero padding
 * Fixed typo in original function name
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @param padLength - Total length with zero padding
 * @returns Zero-padded random number as string
 *
 * @example
 * randomNumberWithPadZeros(1, 999, 5) // '00123'
 * randomNumberWithPadZeros(1, 10, 3) // '007'
 */
const randomNumberWithPadZeros = (min, max, padLength) => {
    if (padLength < 1) {
        throw new Error('Pad length must be positive');
    }
    const number = (0, exports.randomNumber)(min, max);
    return number.toString().padStart(padLength, '0');
};
exports.randomNumberWithPadZeros = randomNumberWithPadZeros;
// =============================================================================
// String Generation Functions  
// =============================================================================
/**
 * Generates a random string with customizable character sets
 * Enhanced version of the original randomString function
 *
 * @param length - Length of the string to generate
 * @param options - Options for character set selection
 * @returns Random string of specified length
 *
 * @example
 * randomString(8) // 'KjHgFdSa' (letters only)
 * randomString(10, { numbers: true }) // 'Kj3HgF2Sa9'
 * randomString(6, { uppercase: false }) // 'kjhgfd' (lowercase only)
 * randomString(8, { customCharset: '01' }) // '10110010' (binary)
 */
const randomString = (length, options = {}) => {
    if (length < 0 || !Number.isInteger(length)) {
        throw new Error('Length must be a non-negative integer');
    }
    if (length === 0) {
        return '';
    }
    const { uppercase = true, lowercase = true, numbers = false, symbols = false, customCharset, excludeCharacters = '', ensureComplexity = false } = options;
    // Build character set
    let charset = customCharset || '';
    if (!customCharset) {
        if (uppercase)
            charset += exports.CHARACTER_SETS.UPPERCASE;
        if (lowercase)
            charset += exports.CHARACTER_SETS.LOWERCASE;
        if (numbers)
            charset += exports.CHARACTER_SETS.NUMBERS;
        if (symbols)
            charset += exports.CHARACTER_SETS.SYMBOLS;
    }
    if (!charset) {
        throw new Error('No character set specified');
    }
    // Remove excluded characters
    if (excludeCharacters) {
        charset = charset.split('').filter(char => !excludeCharacters.includes(char)).join('');
    }
    if (!charset) {
        throw new Error('No valid characters remaining after exclusions');
    }
    // Generate random string
    let result = '';
    if (ensureComplexity && !customCharset) {
        // Ensure at least one character from each selected set
        const requiredSets = [];
        if (uppercase)
            requiredSets.push(exports.CHARACTER_SETS.UPPERCASE);
        if (lowercase)
            requiredSets.push(exports.CHARACTER_SETS.LOWERCASE);
        if (numbers)
            requiredSets.push(exports.CHARACTER_SETS.NUMBERS);
        if (symbols)
            requiredSets.push(exports.CHARACTER_SETS.SYMBOLS);
        // Add one character from each required set
        for (const set of requiredSets) {
            if (result.length < length) {
                const availableChars = set.split('').filter(char => !excludeCharacters.includes(char));
                if (availableChars.length > 0) {
                    result += availableChars[Math.floor(Math.random() * availableChars.length)];
                }
            }
        }
    }
    // Fill remaining length
    while (result.length < length) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    // Shuffle the result if complexity was ensured
    if (ensureComplexity && !customCharset) {
        result = shuffleString(result);
    }
    return result;
};
exports.randomString = randomString;
/**
 * Generates a random alphanumeric string
 * Enhanced version of the original randomStringNumber function
 *
 * @param length - Length of the string to generate
 * @param options - Additional options
 * @returns Random alphanumeric string
 *
 * @example
 * randomAlphanumeric(8) // 'Kj3HgF2S'
 * randomAlphanumeric(10, { uppercase: false }) // 'kj3hgf2sa9'
 */
const randomAlphanumeric = (length, options = {}) => {
    return (0, exports.randomString)(length, Object.assign(Object.assign({}, options), { numbers: true }));
};
exports.randomAlphanumeric = randomAlphanumeric;
/**
 * Generates a random hexadecimal string
 *
 * @param length - Length of the hex string
 * @param prefix - Whether to include '0x' prefix (default: false)
 * @returns Random hexadecimal string
 *
 * @example
 * randomHex(8) // 'A1B2C3D4'
 * randomHex(6, true) // '0x1A2B3C'
 */
const randomHex = (length, prefix = false) => {
    const hex = (0, exports.randomString)(length, { customCharset: exports.CHARACTER_SETS.HEX });
    return prefix ? `0x${hex}` : hex;
};
exports.randomHex = randomHex;
/**
 * Generates a random UUID (version 4)
 *
 * @returns Random UUID string
 *
 * @example
 * randomUUID() // '123e4567-e89b-12d3-a456-426614174000'
 */
const randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.randomUUID = randomUUID;
// =============================================================================
// Boolean and Choice Functions
// =============================================================================
/**
 * Generates a random boolean value
 * Enhanced version with probability control
 *
 * @param probability - Probability of returning true (0-1, default: 0.5)
 * @returns Random boolean value
 *
 * @example
 * randomBoolean() // 50% chance of true
 * randomBoolean(0.7) // 70% chance of true
 * randomBoolean(0.1) // 10% chance of true
 */
const randomBoolean = (probability = 0.5) => {
    if (probability < 0 || probability > 1) {
        throw new Error('Probability must be between 0 and 1');
    }
    return Math.random() < probability;
};
exports.randomBoolean = randomBoolean;
/**
 * Randomly selects an element from an array
 *
 * @param array - Array to select from
 * @returns Randomly selected element
 *
 * @example
 * randomChoice(['red', 'green', 'blue']) // 'green'
 * randomChoice([1, 2, 3, 4, 5]) // 3
 */
const randomChoice = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('Array must be non-empty');
    }
    return array[Math.floor(Math.random() * array.length)];
};
exports.randomChoice = randomChoice;
/**
 * Randomly selects multiple elements from an array without replacement
 *
 * @param array - Array to select from
 * @param count - Number of elements to select
 * @returns Array of randomly selected elements
 *
 * @example
 * randomSample([1, 2, 3, 4, 5], 3) // [2, 4, 1]
 */
const randomSample = (array, count) => {
    if (!Array.isArray(array)) {
        throw new Error('First argument must be an array');
    }
    if (count < 0 || !Number.isInteger(count)) {
        throw new Error('Count must be a non-negative integer');
    }
    if (count > array.length) {
        throw new Error('Count cannot exceed array length');
    }
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};
exports.randomSample = randomSample;
// =============================================================================
// Date Generation Functions
// =============================================================================
/**
 * Generates a random date between two dates
 * Enhanced version with additional options
 *
 * @param start - Start date (inclusive)
 * @param end - End date (inclusive)
 * @param options - Additional options for date generation
 * @returns Random date within the specified range
 *
 * @example
 * randomDate(new Date('2023-01-01'), new Date('2023-12-31'))
 * randomDate(new Date('2023-01-01'), new Date('2023-01-31'), { roundTo: 'day' })
 */
const randomDate = (start, end, options = {}) => {
    if (!(start instanceof Date) || !(end instanceof Date)) {
        throw new Error('Start and end must be Date objects');
    }
    if (start >= end) {
        throw new Error('Start date must be before end date');
    }
    const { includeTime = true, roundTo } = options;
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const result = new Date(randomTime);
    if (!includeTime || roundTo === 'day') {
        result.setHours(0, 0, 0, 0);
    }
    else if (roundTo === 'hour') {
        result.setMinutes(0, 0, 0);
    }
    else if (roundTo === 'minute') {
        result.setSeconds(0, 0);
    }
    else if (roundTo === 'second') {
        result.setMilliseconds(0);
    }
    return result;
};
exports.randomDate = randomDate;
/**
 * Generates a random date within the last N days
 *
 * @param days - Number of days to look back
 * @returns Random date within the specified range
 *
 * @example
 * randomDateInPast(30) // Random date in last 30 days
 */
const randomDateInPast = (days) => {
    if (days < 0) {
        throw new Error('Days must be non-negative');
    }
    const end = new Date();
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    return (0, exports.randomDate)(start, end);
};
exports.randomDateInPast = randomDateInPast;
/**
 * Generates a random date within the next N days
 *
 * @param days - Number of days to look ahead
 * @returns Random date within the specified range
 *
 * @example
 * randomDateInFuture(7) // Random date in next 7 days
 */
const randomDateInFuture = (days) => {
    if (days < 0) {
        throw new Error('Days must be non-negative');
    }
    const start = new Date();
    const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    return (0, exports.randomDate)(start, end);
};
exports.randomDateInFuture = randomDateInFuture;
// =============================================================================
// Utility Functions
// =============================================================================
/**
 * Shuffles the characters in a string
 *
 * @param str - String to shuffle
 * @returns Shuffled string
 */
const shuffleString = (str) => {
    return str.split('').sort(() => Math.random() - 0.5).join('');
};
/**
 * Generates random coordinates within specified bounds
 *
 * @param bounds - Object containing min/max lat/lng values
 * @returns Random coordinate object
 *
 * @example
 * randomCoordinates({
 *   minLat: 40.7, maxLat: 40.8,
 *   minLng: -74.0, maxLng: -73.9
 * }) // { lat: 40.751, lng: -73.952 }
 */
const randomCoordinates = (bounds) => {
    return {
        lat: (0, exports.randomFloat)(bounds.minLat, bounds.maxLat, 6),
        lng: (0, exports.randomFloat)(bounds.minLng, bounds.maxLng, 6)
    };
};
exports.randomCoordinates = randomCoordinates;
/**
 * Generates a random color in various formats
 *
 * @param format - Color format ('hex', 'rgb', 'hsl')
 * @returns Random color string
 *
 * @example
 * randomColor('hex') // '#A1B2C3'
 * randomColor('rgb') // 'rgb(161, 178, 195)'
 * randomColor('hsl') // 'hsl(210, 25%, 70%)'
 */
const randomColor = (format = 'hex') => {
    switch (format) {
        case 'hex':
            return '#' + (0, exports.randomHex)(6);
        case 'rgb':
            const r = (0, exports.randomNumber)(0, 255);
            const g = (0, exports.randomNumber)(0, 255);
            const b = (0, exports.randomNumber)(0, 255);
            return `rgb(${r}, ${g}, ${b})`;
        case 'hsl':
            const h = (0, exports.randomNumber)(0, 360);
            const s = (0, exports.randomNumber)(0, 100);
            const l = (0, exports.randomNumber)(0, 100);
            return `hsl(${h}, ${s}%, ${l}%)`;
        default:
            throw new Error('Invalid color format');
    }
};
exports.randomColor = randomColor;
//# sourceMappingURL=random.js.map