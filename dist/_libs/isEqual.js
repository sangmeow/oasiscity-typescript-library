"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProperty = exports.matchesPattern = exports.isInRange = exports.isOneOf = exports.isDeepEqual = exports.isLooseEqual = exports.isEqual = exports.isNotEqualNumber = exports.isNotEqualString = exports.isEqualBoolean = exports.isEqualNumber = exports.isEqualString = exports.isFunction = exports.isPlainObject = exports.isArray = exports.isNullish = exports.isUndefined = exports.isNull = exports.isBoolean = exports.isInteger = exports.isFiniteNumber = exports.isNumber = exports.isString = void 0;
const isEmpty_1 = require("./isEmpty");
// =============================================================================
// Type Guards - 타입을 좁혀주는 함수들
// =============================================================================
/**
 * Checks if a value is a string and narrows the type
 * @param value - Value to check
 * @returns true if value is string, with type narrowing
 */
const isString = (value) => {
    return typeof value === "string";
};
exports.isString = isString;
/**
 * Checks if a value is a number (excluding NaN) and narrows the type
 * @param value - Value to check
 * @returns true if value is a valid number, with type narrowing
 */
const isNumber = (value) => {
    return typeof value === "number" && !Number.isNaN(value);
};
exports.isNumber = isNumber;
/**
 * Checks if a value is a valid finite number
 * @param value - Value to check
 * @returns true if value is a finite number
 */
const isFiniteNumber = (value) => {
    return typeof value === "number" && Number.isFinite(value);
};
exports.isFiniteNumber = isFiniteNumber;
/**
 * Checks if a value is an integer
 * @param value - Value to check
 * @returns true if value is an integer
 */
const isInteger = (value) => {
    return typeof value === "number" && Number.isInteger(value);
};
exports.isInteger = isInteger;
/**
 * Checks if a value is a boolean and narrows the type
 * @param value - Value to check
 * @returns true if value is boolean, with type narrowing
 */
const isBoolean = (value) => {
    return typeof value === "boolean";
};
exports.isBoolean = isBoolean;
/**
 * Checks if a value is null and narrows the type
 * @param value - Value to check
 * @returns true if value is null, with type narrowing
 */
const isNull = (value) => {
    return value === null;
};
exports.isNull = isNull;
/**
 * Checks if a value is undefined and narrows the type
 * @param value - Value to check
 * @returns true if value is undefined, with type narrowing
 */
const isUndefined = (value) => {
    return value === undefined;
};
exports.isUndefined = isUndefined;
/**
 * Checks if a value is null or undefined
 * @param value - Value to check
 * @returns true if value is null or undefined
 */
const isNullish = (value) => {
    return value === null || value === undefined;
};
exports.isNullish = isNullish;
/**
 * Checks if a value is an array and narrows the type
 * @param value - Value to check
 * @returns true if value is an array, with type narrowing
 */
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;
/**
 * Checks if a value is a plain object (not array, null, or class instance)
 * @param value - Value to check
 * @returns true if value is a plain object
 */
const isPlainObject = (value) => {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value)
        && value.constructor === Object;
};
exports.isPlainObject = isPlainObject;
/**
 * Checks if a value is a function
 * @param value - Value to check
 * @returns true if value is a function
 */
const isFunction = (value) => {
    return typeof value === "function";
};
exports.isFunction = isFunction;
// =============================================================================
// Equality Comparison Functions
// =============================================================================
/**
 * Checks if input is a string and equals the target string
 * @param input - Input value to check
 * @param target - Target string to compare against
 * @returns true if input is string and equals target
 */
const isEqualString = (input, target) => {
    return (0, exports.isString)(input) && input === target;
};
exports.isEqualString = isEqualString;
/**
 * Checks if input is a number and equals the target number
 * @param input - Input value to check
 * @param target - Target number to compare against
 * @returns true if input is number and equals target
 */
const isEqualNumber = (input, target) => {
    return (0, exports.isNumber)(input) && input === target;
};
exports.isEqualNumber = isEqualNumber;
/**
 * Checks if input is a boolean and equals the target boolean
 * @param input - Input value to check
 * @param target - Target boolean to compare against
 * @returns true if input is boolean and equals target
 */
const isEqualBoolean = (input, target) => {
    return (0, exports.isBoolean)(input) && input === target;
};
exports.isEqualBoolean = isEqualBoolean;
/**
 * Checks if input is NOT a string or does NOT equal the target string
 * @param input - Input value to check
 * @param target - Target string to compare against
 * @returns true if input is not string or not equal to target
 */
const isNotEqualString = (input, target) => {
    return !(0, exports.isString)(input) || input !== target;
};
exports.isNotEqualString = isNotEqualString;
/**
 * Checks if input is NOT a number or does NOT equal the target number
 * @param input - Input value to check
 * @param target - Target number to compare against
 * @returns true if input is not number or not equal to target
 */
const isNotEqualNumber = (input, target) => {
    return !(0, exports.isNumber)(input) || input !== target;
};
exports.isNotEqualNumber = isNotEqualNumber;
/**
 * Performs strict equality check with additional empty value validation
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if both values are not empty and strictly equal
 */
const isEqual = (input, target) => {
    return (0, isEmpty_1.isNotEmpty)(input) && (0, isEmpty_1.isNotEmpty)(target) && input === target;
};
exports.isEqual = isEqual;
/**
 * Performs loose equality check (==) - use with caution
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if values are loosely equal
 */
const isLooseEqual = (input, target) => {
    // eslint-disable-next-line eqeqeq
    return input == target;
};
exports.isLooseEqual = isLooseEqual;
// =============================================================================
// Deep Equality Functions
// =============================================================================
/**
 * Performs deep equality comparison for objects and arrays
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if values are deeply equal
 */
const isDeepEqual = (input, target) => {
    // Same reference or strict equality
    if (input === target) {
        return true;
    }
    // Both null or undefined
    if ((0, exports.isNullish)(input) && (0, exports.isNullish)(target)) {
        return input === target;
    }
    // One is null/undefined, other is not
    if ((0, exports.isNullish)(input) || (0, exports.isNullish)(target)) {
        return false;
    }
    // Different types
    if (typeof input !== typeof target) {
        return false;
    }
    // Handle arrays
    if ((0, exports.isArray)(input) && (0, exports.isArray)(target)) {
        if (input.length !== target.length) {
            return false;
        }
        return input.every((item, index) => (0, exports.isDeepEqual)(item, target[index]));
    }
    // Handle dates
    if (input instanceof Date && target instanceof Date) {
        return input.getTime() === target.getTime();
    }
    // Handle RegExp
    if (input instanceof RegExp && target instanceof RegExp) {
        return input.toString() === target.toString();
    }
    // Handle plain objects
    if ((0, exports.isPlainObject)(input) && (0, exports.isPlainObject)(target)) {
        const inputKeys = Object.keys(input);
        const targetKeys = Object.keys(target);
        if (inputKeys.length !== targetKeys.length) {
            return false;
        }
        return inputKeys.every(key => targetKeys.includes(key) &&
            (0, exports.isDeepEqual)(input[key], target[key]));
    }
    // For all other cases, use strict equality
    return input === target;
};
exports.isDeepEqual = isDeepEqual;
// =============================================================================
// Utility Functions for Common Patterns
// =============================================================================
/**
 * Checks if a value matches any of the provided options
 * @param value - Value to check
 * @param options - Array of options to match against
 * @returns true if value matches any option
 */
const isOneOf = (value, options) => {
    return options.includes(value);
};
exports.isOneOf = isOneOf;
/**
 * Checks if a value is within a numeric range (inclusive)
 * @param value - Value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns true if value is within range
 */
const isInRange = (value, min, max) => {
    return (0, exports.isNumber)(value) && value >= min && value <= max;
};
exports.isInRange = isInRange;
/**
 * Checks if a string matches a pattern (RegExp or string)
 * @param value - String to check
 * @param pattern - Pattern to match (RegExp or string)
 * @returns true if string matches pattern
 */
const matchesPattern = (value, pattern) => {
    if (!(0, exports.isString)(value)) {
        return false;
    }
    if (pattern instanceof RegExp) {
        return pattern.test(value);
    }
    return value.includes(pattern);
};
exports.matchesPattern = matchesPattern;
/**
 * Checks if a value has a specific property
 * @param value - Object to check
 * @param property - Property name to check for
 * @returns true if object has the property
 */
const hasProperty = (value, property) => {
    return typeof value === "object"
        && value !== null
        && property in value;
};
exports.hasProperty = hasProperty;
//# sourceMappingURL=isEqual.js.map