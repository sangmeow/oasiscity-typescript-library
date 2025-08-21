import type { dataTypes } from "../interface/Json.interface";
/**
 * Options for string validation functions
 */
interface StringValidationOptions {
    /** Minimum length (default: 1) */
    minLength?: number;
    /** Maximum length (default: unlimited) */
    maxLength?: number;
    /** Whether to trim whitespace before validation (default: false) */
    trim?: boolean;
    /** Whether to allow empty strings (default: false) */
    allowEmpty?: boolean;
    /** Case sensitivity for alphabetic checks (default: true) */
    caseSensitive?: boolean;
}
/**
 * Options for object property validation
 */
interface ObjectValidationOptions {
    /** Whether to check nested properties (default: false) */
    deep?: boolean;
    /** Whether to check if the property exists (default: true) */
    checkExistence?: boolean;
    /** Custom empty check function */
    customEmptyCheck?: (value: unknown) => boolean;
}
/**
 * Validation result with detailed information
 */
interface ValidationResult {
    /** Whether the validation passed */
    isValid: boolean;
    /** Error message if validation failed */
    error?: string;
    /** The actual value that was validated */
    value?: unknown;
    /** Additional metadata about the validation */
    metadata?: Record<string, unknown>;
}
/**
 * Checks if a property in an object is empty or missing
 * Enhanced version of the original isObjectEmpty function
 *
 * @param data - Object to check
 * @param key - Property key to check
 * @param options - Additional validation options
 * @returns true if property is empty or missing
 *
 * @example
 * isObjectPropertyEmpty({ name: 'John', email: '' }, 'email') // true
 * isObjectPropertyEmpty({ name: 'John' }, 'email') // true (missing)
 * isObjectPropertyEmpty({ user: { name: '' } }, 'user.name', { deep: true }) // true
 */
export declare const isObjectPropertyEmpty: (data: dataTypes | null | undefined, key: string, options?: ObjectValidationOptions) => boolean;
/**
 * Validates multiple object properties at once
 *
 * @param data - Object to validate
 * @param keys - Array of property keys to check
 * @param options - Validation options
 * @returns Object with validation results for each key
 *
 * @example
 * validateObjectProperties(
 *   { name: 'John', email: '', age: 25 },
 *   ['name', 'email', 'phone']
 * )
 * // Result: { name: { isValid: true }, email: { isValid: false }, phone: { isValid: false } }
 */
export declare const validateObjectProperties: (data: dataTypes | null | undefined, keys: string[], options?: ObjectValidationOptions) => Record<string, ValidationResult>;
/**
 * Checks if an object has all required properties and they are not empty
 *
 * @param data - Object to validate
 * @param requiredKeys - Array of required property keys
 * @param options - Validation options
 * @returns true if all required properties exist and are not empty
 *
 * @example
 * hasRequiredProperties({ name: 'John', email: 'john@test.com' }, ['name', 'email']) // true
 * hasRequiredProperties({ name: 'John' }, ['name', 'email']) // false
 */
export declare const hasRequiredProperties: (data: dataTypes | null | undefined, requiredKeys: string[], options?: ObjectValidationOptions) => boolean;
/**
 * Validates if a string contains only numeric characters
 * Enhanced version of the original isNumericOnly function
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only digits
 *
 * @example
 * isNumericOnly('123') // true
 * isNumericOnly('12.3') // false
 * isNumericOnly('123', { minLength: 5 }) // false
 * isNumericOnly('  123  ', { trim: true }) // true
 */
export declare const isNumericOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string contains only alphabetic characters
 * Enhanced version of the original isAlphabeticOnly function
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only letters
 *
 * @example
 * isAlphabeticOnly('Hello') // true
 * isAlphabeticOnly('Hello123') // false
 * isAlphabeticOnly('HELLO', { caseSensitive: false }) // true
 */
export declare const isAlphabeticOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string contains only alphanumeric characters
 * Enhanced version of the original isNumAlphabeticOnly function
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only letters and digits
 *
 * @example
 * isAlphanumericOnly('Hello123') // true
 * isAlphanumericOnly('Hello-123') // false
 * isAlphanumericOnly('a1', { minLength: 5 }) // false
 */
export declare const isAlphanumericOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string contains only lowercase letters
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only lowercase letters
 *
 * @example
 * isLowercaseOnly('hello') // true
 * isLowercaseOnly('Hello') // false
 */
export declare const isLowercaseOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string contains only uppercase letters
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only uppercase letters
 *
 * @example
 * isUppercaseOnly('HELLO') // true
 * isUppercaseOnly('Hello') // false
 */
export declare const isUppercaseOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string is a valid integer
 *
 * @param value - String to validate
 * @param options - Validation options with additional integer constraints
 * @returns true if string represents a valid integer
 *
 * @example
 * isIntegerString('123') // true
 * isIntegerString('-123') // true
 * isIntegerString('12.3') // false
 */
export declare const isIntegerString: (value: string | null | undefined, options?: StringValidationOptions & {
    allowNegative?: boolean;
}) => boolean;
/**
 * Validates if a string is a valid decimal number
 *
 * @param value - String to validate
 * @param options - Validation options with additional decimal constraints
 * @returns true if string represents a valid decimal number
 *
 * @example
 * isDecimalString('123.45') // true
 * isDecimalString('-123.45') // true
 * isDecimalString('123.') // false
 */
export declare const isDecimalString: (value: string | null | undefined, options?: StringValidationOptions & {
    allowNegative?: boolean;
    maxDecimalPlaces?: number;
}) => boolean;
/**
 * Validates if a string contains only hexadecimal characters
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only hex characters
 *
 * @example
 * isHexadecimalOnly('1A2B3C') // true
 * isHexadecimalOnly('1G2H3I') // false
 */
export declare const isHexadecimalOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates if a string contains only ASCII printable characters
 *
 * @param value - String to validate
 * @param options - Validation options
 * @returns true if string contains only ASCII printable characters
 *
 * @example
 * isAsciiOnly('Hello World!') // true
 * isAsciiOnly('Hello 世界') // false
 */
export declare const isAsciiOnly: (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Validates a string against multiple patterns and returns detailed results
 *
 * @param value - String to validate
 * @param validations - Object mapping validation names to patterns or functions
 * @param options - Validation options
 * @returns Object with validation results for each check
 *
 * @example
 * validateMultiplePatterns('Hello123', {
 *   hasLetters: /[a-zA-Z]/,
 *   hasNumbers: /\d/,
 *   minLength: (v) => v.length >= 5
 * })
 * // Result: { hasLetters: { isValid: true }, hasNumbers: { isValid: true }, minLength: { isValid: true } }
 */
export declare const validateMultiplePatterns: (value: string | null | undefined, validations: Record<string, RegExp | ((value: string) => boolean)>, options?: StringValidationOptions) => Record<string, ValidationResult>;
/**
 * Creates a reusable validator function with predefined options
 *
 * @param pattern - Regular expression pattern
 * @param errorMessage - Error message for validation failure
 * @param defaultOptions - Default validation options
 * @returns Validation function
 *
 * @example
 * const validateProductCode = createValidator(
 *   /^[A-Z]{2}\d{4}$/,
 *   'valid product code (e.g., AB1234)',
 *   { minLength: 6, maxLength: 6 }
 * );
 *
 * validateProductCode('AB1234') // true
 * validateProductCode('ab1234') // false
 */
export declare const createValidator: (pattern: RegExp, errorMessage: string, defaultOptions?: StringValidationOptions) => (value: string | null | undefined, options?: StringValidationOptions) => boolean;
/**
 * Gets detailed validation information for debugging
 *
 * @param value - Value to analyze
 * @param pattern - Pattern to test against
 * @param options - Validation options
 * @returns Detailed validation information
 *
 * @example
 * getValidationDetails('Hello123', /^\d+$/)
 * // Result: { isValid: false, error: '...', characterBreakdown: {...}, ... }
 */
export declare const getValidationDetails: (value: string | null | undefined, pattern: RegExp, options?: StringValidationOptions) => ValidationResult & {
    characterBreakdown?: {
        letters: number;
        digits: number;
        spaces: number;
        symbols: number;
        total: number;
    };
};
export {};
//# sourceMappingURL=validator.d.ts.map