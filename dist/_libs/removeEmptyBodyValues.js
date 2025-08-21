"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNoEmptyValues = exports.hasEmptyValues = exports.countEmptyValues = exports.shallowClean = exports.removeEmptyCollections = exports.removeFalsyValues = exports.removeNullish = exports.cleanObject = void 0;
/**
 * Type guard to check if value is a plain object
 */
const isPlainObject = (value) => {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value)
        && !(value instanceof Date)
        && !(value instanceof RegExp)
        && value.constructor === Object;
};
/**
 * Type guard to check if value is an array
 */
const isArray = (value) => {
    return Array.isArray(value);
};
/**
 * Checks if a value should be removed based on the provided options
 */
const shouldRemoveValue = (value, key, options) => {
    const { removeNull = true, removeUndefined = true, removeEmptyStrings = true, removeEmptyArrays = false, removeEmptyObjects = false, removeNaN = true, removeZeros = false, removeFalse = false, customPredicate, preserveKeys = [] } = options;
    // Preserve specific keys
    if (preserveKeys.includes(key)) {
        return false;
    }
    // Custom predicate takes precedence
    if (customPredicate && customPredicate(value, key)) {
        return true;
    }
    // Check for null
    if (removeNull && value === null) {
        return true;
    }
    // Check for undefined
    if (removeUndefined && value === undefined) {
        return true;
    }
    // Check for empty strings
    if (removeEmptyStrings && typeof value === "string" && value.trim() === "") {
        return true;
    }
    // Check for NaN
    if (removeNaN && typeof value === "number" && Number.isNaN(value)) {
        return true;
    }
    // Check for zeros
    if (removeZeros && value === 0) {
        return true;
    }
    // Check for false
    if (removeFalse && value === false) {
        return true;
    }
    // Check for empty arrays
    if (removeEmptyArrays && isArray(value) && value.length === 0) {
        return true;
    }
    // Check for empty objects
    if (removeEmptyObjects && isPlainObject(value) && Object.keys(value).length === 0) {
        return true;
    }
    return false;
};
/**
 * Removes empty, null, or unwanted values from an object recursively
 * Enhanced version that combines and improves the original functions
 *
 * @param obj - Object to clean (can be null/undefined)
 * @param options - Configuration options for cleaning behavior
 * @returns Cleaned object with unwanted values removed
 *
 * @example
 * // Basic usage (removes null, undefined, empty strings)
 * cleanObject({ a: 1, b: null, c: "", d: "valid" })
 * // Result: { a: 1, d: "valid" }
 *
 * // Custom options
 * cleanObject(
 *   { a: 0, b: [], c: {}, d: false, e: "test" },
 *   { removeZeros: true, removeEmptyArrays: true, removeEmptyObjects: true }
 * )
 * // Result: { d: false, e: "test" }
 *
 * // With custom predicate
 * cleanObject(
 *   { a: "test", b: "remove_me", c: 123 },
 *   { customPredicate: (value) => typeof value === "string" && value.includes("remove") }
 * )
 * // Result: { a: "test", c: 123 }
 */
const cleanObject = (obj, options = {}) => {
    // Handle null/undefined input
    if (!obj || typeof obj !== "object") {
        return {};
    }
    const { maxDepth = Infinity, cleanArrays = true } = options;
    const cleanRecursively = (target, currentDepth = 0) => {
        // Check depth limit
        if (currentDepth >= maxDepth) {
            return target;
        }
        // Handle arrays
        if (isArray(target) && cleanArrays) {
            const cleanedArray = target
                .map(item => cleanRecursively(item, currentDepth + 1))
                .filter((item, index) => !shouldRemoveValue(item, index.toString(), options));
            return cleanedArray;
        }
        // Handle plain objects
        if (isPlainObject(target)) {
            const result = {};
            for (const [key, value] of Object.entries(target)) {
                if (!shouldRemoveValue(value, key, options)) {
                    const cleanedValue = cleanRecursively(value, currentDepth + 1);
                    // Check again after cleaning (in case nested object became empty)
                    if (!shouldRemoveValue(cleanedValue, key, options)) {
                        result[key] = cleanedValue;
                    }
                }
            }
            return result;
        }
        // Return primitive values as-is
        return target;
    };
    return cleanRecursively(obj);
};
exports.cleanObject = cleanObject;
// =============================================================================
// Specialized Cleaning Functions
// =============================================================================
/**
 * Removes only null and undefined values, preserving empty strings and other falsy values
 *
 * @param obj - Object to clean
 * @returns Object with null and undefined values removed
 *
 * @example
 * removeNullish({ a: null, b: undefined, c: "", d: 0, e: false })
 * // Result: { c: "", d: 0, e: false }
 */
const removeNullish = (obj) => {
    return (0, exports.cleanObject)(obj, {
        removeNull: true,
        removeUndefined: true,
        removeEmptyStrings: false,
        removeEmptyArrays: false,
        removeEmptyObjects: false
    });
};
exports.removeNullish = removeNullish;
/**
 * Removes all falsy values (null, undefined, "", 0, false, NaN)
 *
 * @param obj - Object to clean
 * @returns Object with all falsy values removed
 *
 * @example
 * removeFalsyValues({ a: null, b: "", c: 0, d: false, e: "valid", f: 1 })
 * // Result: { e: "valid", f: 1 }
 */
const removeFalsyValues = (obj) => {
    return (0, exports.cleanObject)(obj, {
        removeNull: true,
        removeUndefined: true,
        removeEmptyStrings: true,
        removeEmptyArrays: true,
        removeEmptyObjects: true,
        removeNaN: true,
        removeZeros: true,
        removeFalse: true
    });
};
exports.removeFalsyValues = removeFalsyValues;
/**
 * Removes empty collections (arrays and objects) recursively
 *
 * @param obj - Object to clean
 * @returns Object with empty collections removed
 *
 * @example
 * removeEmptyCollections({ a: [], b: {}, c: { d: [] }, e: "valid" })
 * // Result: { e: "valid" }
 */
const removeEmptyCollections = (obj) => {
    return (0, exports.cleanObject)(obj, {
        removeNull: false,
        removeUndefined: false,
        removeEmptyStrings: false,
        removeEmptyArrays: true,
        removeEmptyObjects: true
    });
};
exports.removeEmptyCollections = removeEmptyCollections;
/**
 * Performs a shallow clean (only first level, no recursion)
 *
 * @param obj - Object to clean
 * @param options - Cleaning options
 * @returns Shallowly cleaned object
 *
 * @example
 * shallowClean({ a: null, b: { c: null } })
 * // Result: { b: { c: null } }
 */
const shallowClean = (obj, options = {}) => {
    return (0, exports.cleanObject)(obj, Object.assign(Object.assign({}, options), { maxDepth: 0 }));
};
exports.shallowClean = shallowClean;
// =============================================================================
// Utility Functions
// =============================================================================
/**
 * Counts the number of properties that would be removed
 *
 * @param obj - Object to analyze
 * @param options - Cleaning options
 * @returns Object with count statistics
 *
 * @example
 * countEmptyValues({ a: null, b: "", c: "valid", d: { e: null } })
 * // Result: { total: 4, removed: 2, remaining: 2 }
 */
const countEmptyValues = (obj, options = {}) => {
    if (!obj) {
        return { total: 0, removed: 0, remaining: 0 };
    }
    let total = 0;
    let removed = 0;
    const countRecursively = (target, key = "") => {
        total++;
        if (shouldRemoveValue(target, key, options)) {
            removed++;
            return;
        }
        if (isPlainObject(target)) {
            Object.entries(target).forEach(([k, v]) => countRecursively(v, k));
        }
        else if (isArray(target) && options.cleanArrays !== false) {
            target.forEach((item, index) => countRecursively(item, index.toString()));
        }
    };
    Object.entries(obj).forEach(([key, value]) => countRecursively(value, key));
    return {
        total,
        removed,
        remaining: total - removed
    };
};
exports.countEmptyValues = countEmptyValues;
/**
 * Checks if an object has any empty values that would be removed
 *
 * @param obj - Object to check
 * @param options - Cleaning options
 * @returns true if object has values that would be removed
 *
 * @example
 * hasEmptyValues({ a: "valid", b: null }) // true
 * hasEmptyValues({ a: "valid", b: "also valid" }) // false
 */
const hasEmptyValues = (obj, options = {}) => {
    const stats = (0, exports.countEmptyValues)(obj, options);
    return stats.removed > 0;
};
exports.hasEmptyValues = hasEmptyValues;
/**
 * Validates that an object has no empty values according to specified criteria
 *
 * @param obj - Object to validate
 * @param options - Validation options
 * @returns Validation result with details
 *
 * @example
 * validateNoEmptyValues({ a: "valid", b: null })
 * // Result: { isValid: false, errors: ["Property 'b' has null value"], cleanedObject: { a: "valid" } }
 */
const validateNoEmptyValues = (obj, options = {}) => {
    const cleanedObject = (0, exports.cleanObject)(obj, options);
    const errors = [];
    if (!obj) {
        return { isValid: false, errors: ["Object is null or undefined"], cleanedObject };
    }
    const checkRecursively = (target, path = "") => {
        if (isPlainObject(target)) {
            Object.entries(target).forEach(([key, value]) => {
                const currentPath = path ? `${path}.${key}` : key;
                if (shouldRemoveValue(value, key, options)) {
                    errors.push(`Property '${currentPath}' has invalid value: ${JSON.stringify(value)}`);
                }
                else {
                    checkRecursively(value, currentPath);
                }
            });
        }
    };
    checkRecursively(obj);
    return {
        isValid: errors.length === 0,
        errors,
        cleanedObject
    };
};
exports.validateNoEmptyValues = validateNoEmptyValues;
//# sourceMappingURL=removeEmptyBodyValues.js.map