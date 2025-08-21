/**
 * Character sets for random string generation
 */
export declare const CHARACTER_SETS: {
    readonly UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    readonly LOWERCASE: "abcdefghijklmnopqrstuvwxyz";
    readonly NUMBERS: "0123456789";
    readonly SYMBOLS: "!@#$%^&*()_+-=[]{}|;:,.<>?";
    readonly HEX: "0123456789ABCDEF";
    readonly BASE64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    readonly URL_SAFE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
};
/**
 * Options for random string generation
 */
interface RandomStringOptions {
    /** Include uppercase letters (default: true) */
    uppercase?: boolean;
    /** Include lowercase letters (default: true) */
    lowercase?: boolean;
    /** Include numbers (default: false) */
    numbers?: boolean;
    /** Include symbols (default: false) */
    symbols?: boolean;
    /** Custom character set to use instead of the above options */
    customCharset?: string;
    /** Exclude specific characters */
    excludeCharacters?: string;
    /** Ensure at least one character from each selected set */
    ensureComplexity?: boolean;
}
/**
 * Options for random number generation
 */
interface RandomNumberOptions {
    /** Whether to include the maximum value (default: true) */
    inclusive?: boolean;
    /** Number of decimal places for floating point numbers (default: 0 for integers) */
    decimalPlaces?: number;
    /** Exclude specific numbers */
    exclude?: number[];
}
/**
 * Options for random date generation
 */
interface RandomDateOptions {
    /** Include time component (default: true) */
    includeTime?: boolean;
    /** Timezone to use (default: local) */
    timezone?: string;
    /** Round to specific time unit */
    roundTo?: 'second' | 'minute' | 'hour' | 'day';
}
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
export declare const randomNumber: (min: number, max: number, options?: RandomNumberOptions) => number;
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
export declare const randomFloat: (min: number, max: number, decimalPlaces?: number) => number;
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
export declare const randomNumberWithPadZeros: (min: number, max: number, padLength: number) => string;
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
export declare const randomString: (length: number, options?: RandomStringOptions) => string;
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
export declare const randomAlphanumeric: (length: number, options?: Omit<RandomStringOptions, "numbers">) => string;
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
export declare const randomHex: (length: number, prefix?: boolean) => string;
/**
 * Generates a random UUID (version 4)
 *
 * @returns Random UUID string
 *
 * @example
 * randomUUID() // '123e4567-e89b-12d3-a456-426614174000'
 */
export declare const randomUUID: () => string;
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
export declare const randomBoolean: (probability?: number) => boolean;
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
export declare const randomChoice: <T>(array: T[]) => T;
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
export declare const randomSample: <T>(array: T[], count: number) => T[];
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
export declare const randomDate: (start: Date, end: Date, options?: RandomDateOptions) => Date;
/**
 * Generates a random date within the last N days
 *
 * @param days - Number of days to look back
 * @returns Random date within the specified range
 *
 * @example
 * randomDateInPast(30) // Random date in last 30 days
 */
export declare const randomDateInPast: (days: number) => Date;
/**
 * Generates a random date within the next N days
 *
 * @param days - Number of days to look ahead
 * @returns Random date within the specified range
 *
 * @example
 * randomDateInFuture(7) // Random date in next 7 days
 */
export declare const randomDateInFuture: (days: number) => Date;
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
export declare const randomCoordinates: (bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
}) => {
    lat: number;
    lng: number;
};
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
export declare const randomColor: (format?: "hex" | "rgb" | "hsl") => string;
export {};
//# sourceMappingURL=random.d.ts.map