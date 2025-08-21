"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationDetails = exports.createValidator = exports.validateMultiplePatterns = exports.isAsciiOnly = exports.isHexadecimalOnly = exports.isDecimalString = exports.isIntegerString = exports.isUppercaseOnly = exports.isLowercaseOnly = exports.isAlphanumericOnly = exports.isAlphabeticOnly = exports.isNumericOnly = exports.hasRequiredProperties = exports.validateObjectProperties = exports.isObjectPropertyEmpty = void 0;
const isEmpty_1 = require("./isEmpty");
// =============================================================================
// Enhanced Object Property Validation
// =============================================================================
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
const isObjectPropertyEmpty = (data, key, options = {}) => {
    const { deep = false, checkExistence = true, customEmptyCheck } = options;
    // Handle null/undefined data
    if (!data || typeof data !== 'object') {
        return true;
    }
    // Handle nested property paths (e.g., 'user.profile.name')
    if (deep && key.includes('.')) {
        const keys = key.split('.');
        let current = data;
        for (const k of keys) {
            if (!current || typeof current !== 'object') {
                return true;
            }
            if (!Object.prototype.hasOwnProperty.call(current, k)) {
                return checkExistence;
            }
            current = current[k];
        }
        return customEmptyCheck ? customEmptyCheck(current) : (0, isEmpty_1.isEmpty)(current);
    }
    // Check if property exists
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
        return checkExistence;
    }
    const value = data[key];
    return customEmptyCheck ? customEmptyCheck(value) : (0, isEmpty_1.isEmpty)(value);
};
exports.isObjectPropertyEmpty = isObjectPropertyEmpty;
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
const validateObjectProperties = (data, keys, options = {}) => {
    const results = {};
    for (const key of keys) {
        const isEmpty = (0, exports.isObjectPropertyEmpty)(data, key, options);
        results[key] = {
            isValid: !isEmpty,
            error: isEmpty ? `Property '${key}' is empty or missing` : undefined,
            value: data && typeof data === 'object' ? data[key] : undefined
        };
    }
    return results;
};
exports.validateObjectProperties = validateObjectProperties;
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
const hasRequiredProperties = (data, requiredKeys, options = {}) => {
    return requiredKeys.every(key => !(0, exports.isObjectPropertyEmpty)(data, key, options));
};
exports.hasRequiredProperties = hasRequiredProperties;
// =============================================================================
// Enhanced String Pattern Validation
// =============================================================================
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
const isNumericOnly = (value, options = {}) => {
    return validateStringPattern(value, /^\d+$/, 'numeric characters only', options).isValid;
};
exports.isNumericOnly = isNumericOnly;
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
const isAlphabeticOnly = (value, options = {}) => {
    const { caseSensitive = true } = options;
    const pattern = caseSensitive ? /^[a-zA-Z]+$/ : /^[a-zA-Z]+$/i;
    return validateStringPattern(value, pattern, 'alphabetic characters only', options).isValid;
};
exports.isAlphabeticOnly = isAlphabeticOnly;
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
const isAlphanumericOnly = (value, options = {}) => {
    const { caseSensitive = true } = options;
    const pattern = caseSensitive ? /^[a-zA-Z0-9]+$/ : /^[a-zA-Z0-9]+$/i;
    return validateStringPattern(value, pattern, 'alphanumeric characters only', options).isValid;
};
exports.isAlphanumericOnly = isAlphanumericOnly;
// =============================================================================
// Core Pattern Validation Function
// =============================================================================
/**
 * Core function for validating strings against regex patterns with options
 *
 * @param value - String to validate
 * @param pattern - Regular expression pattern
 * @param errorMessage - Error message for validation failure
 * @param options - Validation options
 * @returns Detailed validation result
 */
const validateStringPattern = (value, pattern, errorMessage, options = {}) => {
    const { minLength = 1, maxLength = Infinity, trim = false, allowEmpty = false } = options;
    // Handle null/undefined
    if (value === null || value === undefined) {
        return {
            isValid: false,
            error: 'Value is null or undefined',
            value
        };
    }
    // Ensure it's a string
    if (typeof value !== 'string') {
        return {
            isValid: false,
            error: 'Value must be a string',
            value
        };
    }
    let processedValue = trim ? value.trim() : value;
    // Check empty string
    if (processedValue === '') {
        return {
            isValid: allowEmpty,
            error: allowEmpty ? undefined : 'Value cannot be empty',
            value: processedValue
        };
    }
    // Check length constraints
    if (processedValue.length < minLength) {
        return {
            isValid: false,
            error: `Value must be at least ${minLength} characters long`,
            value: processedValue,
            metadata: { actualLength: processedValue.length, minLength }
        };
    }
    if (processedValue.length > maxLength) {
        return {
            isValid: false,
            error: `Value must be at most ${maxLength} characters long`,
            value: processedValue,
            metadata: { actualLength: processedValue.length, maxLength }
        };
    }
    // Test pattern
    const isPatternValid = pattern.test(processedValue);
    return {
        isValid: isPatternValid,
        error: isPatternValid ? undefined : `Value must contain ${errorMessage}`,
        value: processedValue,
        metadata: { pattern: pattern.toString() }
    };
};
// =============================================================================
// Extended String Validation Functions
// =============================================================================
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
const isLowercaseOnly = (value, options = {}) => {
    return validateStringPattern(value, /^[a-z]+$/, 'lowercase letters only', options).isValid;
};
exports.isLowercaseOnly = isLowercaseOnly;
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
const isUppercaseOnly = (value, options = {}) => {
    return validateStringPattern(value, /^[A-Z]+$/, 'uppercase letters only', options).isValid;
};
exports.isUppercaseOnly = isUppercaseOnly;
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
const isIntegerString = (value, options = {}) => {
    const { allowNegative = true } = options;
    const pattern = allowNegative ? /^-?\d+$/ : /^\d+$/;
    return validateStringPattern(value, pattern, 'valid integer', options).isValid;
};
exports.isIntegerString = isIntegerString;
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
const isDecimalString = (value, options = {}) => {
    const { allowNegative = true, maxDecimalPlaces } = options;
    let pattern;
    if (maxDecimalPlaces !== undefined) {
        const decimalPart = `\\d{1,${maxDecimalPlaces}}`;
        pattern = allowNegative
            ? new RegExp(`^-?\\d+\\.${decimalPart}$`)
            : new RegExp(`^\\d+\\.${decimalPart}$`);
    }
    else {
        pattern = allowNegative ? /^-?\d+\.\d+$/ : /^\d+\.\d+$/;
    }
    return validateStringPattern(value, pattern, 'valid decimal number', options).isValid;
};
exports.isDecimalString = isDecimalString;
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
const isHexadecimalOnly = (value, options = {}) => {
    return validateStringPattern(value, /^[0-9A-Fa-f]+$/, 'hexadecimal characters only', options).isValid;
};
exports.isHexadecimalOnly = isHexadecimalOnly;
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
const isAsciiOnly = (value, options = {}) => {
    return validateStringPattern(value, /^[ -~]+$/, 'ASCII printable characters only', options).isValid;
};
exports.isAsciiOnly = isAsciiOnly;
// =============================================================================
// Composite Validation Functions
// =============================================================================
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
const validateMultiplePatterns = (value, validations, options = {}) => {
    const results = {};
    if (value === null || value === undefined || typeof value !== 'string') {
        // Return failed results for all validations
        Object.keys(validations).forEach(key => {
            results[key] = {
                isValid: false,
                error: 'Value is null, undefined, or not a string',
                value
            };
        });
        return results;
    }
    const processedValue = options.trim ? value.trim() : value;
    Object.entries(validations).forEach(([key, validation]) => {
        if (validation instanceof RegExp) {
            results[key] = validateStringPattern(processedValue, validation, `${key} pattern`, options);
        }
        else if (typeof validation === 'function') {
            try {
                const isValid = validation(processedValue);
                results[key] = {
                    isValid,
                    error: isValid ? undefined : `${key} validation failed`,
                    value: processedValue
                };
            }
            catch (error) {
                results[key] = {
                    isValid: false,
                    error: `${key} validation error: ${error}`,
                    value: processedValue
                };
            }
        }
    });
    return results;
};
exports.validateMultiplePatterns = validateMultiplePatterns;
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
const createValidator = (pattern, errorMessage, defaultOptions = {}) => {
    return (value, options = {}) => {
        const mergedOptions = Object.assign(Object.assign({}, defaultOptions), options);
        return validateStringPattern(value, pattern, errorMessage, mergedOptions).isValid;
    };
};
exports.createValidator = createValidator;
// =============================================================================
// Utility Functions
// =============================================================================
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
const getValidationDetails = (value, pattern, options = {}) => {
    const result = validateStringPattern(value, pattern, 'pattern match', options);
    if (typeof value === 'string') {
        const processedValue = options.trim ? value.trim() : value;
        const characterBreakdown = {
            letters: (processedValue.match(/[a-zA-Z]/g) || []).length,
            digits: (processedValue.match(/\d/g) || []).length,
            spaces: (processedValue.match(/\s/g) || []).length,
            symbols: (processedValue.match(/[^\w\s]/g) || []).length,
            total: processedValue.length
        };
        return Object.assign(Object.assign({}, result), { characterBreakdown });
    }
    return result;
};
exports.getValidationDetails = getValidationDetails;
//# sourceMappingURL=validator.js.map