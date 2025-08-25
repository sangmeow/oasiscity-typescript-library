"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstanceGuard = exports.hasMethod = exports.hasProperty = exports.matchesPattern = exports.isInRange = exports.isOneOf = exports.isDeepEqual = exports.isLooseEqual = exports.isEqual = exports.isNotEqualNumber = exports.isNotEqualString = exports.isEqualBoolean = exports.isEqualNumber = exports.isEqualString = exports.isDate = exports.isFunction = exports.isPlainObject = exports.isArray = exports.isNullish = exports.isUndefined = exports.isNull = exports.isBoolean = exports.isInteger = exports.isFiniteNumber = exports.isNumber = exports.isString = void 0;
const isEmpty_1 = require("./isEmpty");
// =============================================================================
// Basic Type Guards
// =============================================================================
/**
 * Checks if a value is a string and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is a string, with TypeScript type narrowing to `string`
 *
 * @example
 * ```typescript
 * const value: unknown = "hello";
 * if (isString(value)) {
 *   console.log(value.toUpperCase()); // TypeScript knows value is string
 * }
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isString = (value) => {
    return typeof value === "string";
};
exports.isString = isString;
/**
 * Checks if a value is a valid number (excluding NaN) and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is a valid number (not NaN), with type narrowing to `number`
 *
 * @example
 * ```typescript
 * isNumber(42)        // true
 * isNumber("42")      // false
 * isNumber(NaN)       // false
 * isNumber(Infinity)  // true
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isNumber = (value) => {
    return typeof value === "number" && !Number.isNaN(value);
};
exports.isNumber = isNumber;
/**
 * Checks if a value is a valid finite number (excluding NaN and Infinity).
 * More restrictive than `isNumber` as it excludes infinite values.
 *
 * @param value - The value to check
 * @returns `true` if the value is a finite number
 *
 * @example
 * ```typescript
 * isFiniteNumber(42)        // true
 * isFiniteNumber(Infinity)  // false
 * isFiniteNumber(-Infinity) // false
 * isFiniteNumber(NaN)       // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isFiniteNumber = (value) => {
    return typeof value === "number" && Number.isFinite(value);
};
exports.isFiniteNumber = isFiniteNumber;
/**
 * Checks if a value is an integer (whole number without decimal places).
 *
 * @param value - The value to check
 * @returns `true` if the value is an integer
 *
 * @example
 * ```typescript
 * isInteger(42)    // true
 * isInteger(42.5)  // false
 * isInteger(42.0)  // true
 * isInteger("42")  // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isInteger = (value) => {
    return typeof value === "number" && Number.isInteger(value);
};
exports.isInteger = isInteger;
/**
 * Checks if a value is a boolean and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is a boolean, with type narrowing to `boolean`
 *
 * @example
 * ```typescript
 * isBoolean(true)    // true
 * isBoolean(false)   // true
 * isBoolean("true")  // false
 * isBoolean(1)       // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isBoolean = (value) => {
    return typeof value === "boolean";
};
exports.isBoolean = isBoolean;
/**
 * Checks if a value is exactly `null` and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is `null`, with type narrowing to `null`
 *
 * @example
 * ```typescript
 * isNull(null)      // true
 * isNull(undefined) // false
 * isNull(0)         // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isNull = (value) => {
    return value === null;
};
exports.isNull = isNull;
/**
 * Checks if a value is exactly `undefined` and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is `undefined`, with type narrowing to `undefined`
 *
 * @example
 * ```typescript
 * isUndefined(undefined) // true
 * isUndefined(null)      // false
 * isUndefined(0)         // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isUndefined = (value) => {
    return value === undefined;
};
exports.isUndefined = isUndefined;
/**
 * Checks if a value is nullish (`null` or `undefined`).
 * Useful for handling optional values and null coalescing scenarios.
 *
 * @param value - The value to check
 * @returns `true` if the value is `null` or `undefined`
 *
 * @example
 * ```typescript
 * isNullish(null)      // true
 * isNullish(undefined) // true
 * isNullish(0)         // false
 * isNullish("")        // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isNullish = (value) => {
    return value === null || value === undefined;
};
exports.isNullish = isNullish;
/**
 * Checks if a value is an array and provides type narrowing.
 * Uses `Array.isArray()` for accurate detection across different contexts.
 *
 * @param value - The value to check
 * @returns `true` if the value is an array, with type narrowing to `unknown[]`
 *
 * @example
 * ```typescript
 * isArray([])           // true
 * isArray([1, 2, 3])    // true
 * isArray("not array")  // false
 * isArray({})           // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;
/**
 * Checks if a value is a plain object (created by Object constructor or object literal).
 * Excludes arrays, null, class instances, and other object types like Date, RegExp, etc.
 *
 * @param value - The value to check
 * @returns `true` if the value is a plain object
 *
 * @example
 * ```typescript
 * isPlainObject({})              // true
 * isPlainObject({ a: 1 })        // true
 * isPlainObject([])              // false
 * isPlainObject(null)            // false
 * isPlainObject(new Date())      // false
 * isPlainObject(new MyClass())   // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isPlainObject = (value) => {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value)
        && value.constructor === Object;
};
exports.isPlainObject = isPlainObject;
/**
 * Checks if a value is a function and provides type narrowing.
 *
 * @param value - The value to check
 * @returns `true` if the value is a function
 *
 * @example
 * ```typescript
 * isFunction(() => {})           // true
 * isFunction(function() {})      // true
 * isFunction(Math.max)           // true
 * isFunction("not a function")   // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isFunction = (value) => {
    return typeof value === "function";
};
exports.isFunction = isFunction;
/**
 * Checks if a value is a Date object.
 * Does not validate if the date is valid - use with `isValidDate` for that.
 *
 * @param value - The value to check
 * @returns `true` if the value is a Date instance
 *
 * @example
 * ```typescript
 * isDate(new Date())              // true
 * isDate(new Date('invalid'))     // true (but invalid date)
 * isDate('2023-01-01')            // false
 * ```
 *
 * @since 1.0.0
 * @category Type Guards
 */
const isDate = (value) => {
    return value instanceof Date;
};
exports.isDate = isDate;
// =============================================================================
// Equality Comparison Functions
// =============================================================================
/**
 * Checks if input is a string and equals the target string (strict comparison).
 * Combines type checking with value comparison in a single operation.
 *
 * @param input - The input value to check
 * @param target - The target string to compare against
 * @returns `true` if input is a string and exactly equals target
 *
 * @example
 * ```typescript
 * isEqualString("hello", "hello")  // true
 * isEqualString("hello", "world")  // false
 * isEqualString(123, "123")        // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isEqualString = (input, target) => {
    return (0, exports.isString)(input) && input === target;
};
exports.isEqualString = isEqualString;
/**
 * Checks if input is a number and equals the target number (strict comparison).
 * Combines type checking with value comparison in a single operation.
 *
 * @param input - The input value to check
 * @param target - The target number to compare against
 * @returns `true` if input is a number and exactly equals target
 *
 * @example
 * ```typescript
 * isEqualNumber(42, 42)      // true
 * isEqualNumber(42, 43)      // false
 * isEqualNumber("42", 42)    // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isEqualNumber = (input, target) => {
    return (0, exports.isNumber)(input) && input === target;
};
exports.isEqualNumber = isEqualNumber;
/**
 * Checks if input is a boolean and equals the target boolean (strict comparison).
 * Combines type checking with value comparison in a single operation.
 *
 * @param input - The input value to check
 * @param target - The target boolean to compare against
 * @returns `true` if input is a boolean and exactly equals target
 *
 * @example
 * ```typescript
 * isEqualBoolean(true, true)    // true
 * isEqualBoolean(false, true)   // false
 * isEqualBoolean(1, true)       // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isEqualBoolean = (input, target) => {
    return (0, exports.isBoolean)(input) && input === target;
};
exports.isEqualBoolean = isEqualBoolean;
/**
 * Checks if input is NOT a string or does NOT equal the target string.
 * Useful for filtering or validation scenarios.
 *
 * @param input - The input value to check
 * @param target - The target string to compare against
 * @returns `true` if input is not a string or not equal to target
 *
 * @example
 * ```typescript
 * isNotEqualString("hello", "world")  // true
 * isNotEqualString(123, "hello")      // true
 * isNotEqualString("hello", "hello")  // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isNotEqualString = (input, target) => {
    return !(0, exports.isString)(input) || input !== target;
};
exports.isNotEqualString = isNotEqualString;
/**
 * Checks if input is NOT a number or does NOT equal the target number.
 * Useful for filtering or validation scenarios.
 *
 * @param input - The input value to check
 * @param target - The target number to compare against
 * @returns `true` if input is not a number or not equal to target
 *
 * @example
 * ```typescript
 * isNotEqualNumber(42, 43)     // true
 * isNotEqualNumber("42", 42)   // true
 * isNotEqualNumber(42, 42)     // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isNotEqualNumber = (input, target) => {
    return !(0, exports.isNumber)(input) || input !== target;
};
exports.isNotEqualNumber = isNotEqualNumber;
/**
 * Performs strict equality check with additional empty value validation.
 * Both values must be non-empty (according to isEmpty logic) AND strictly equal.
 *
 * @param input - The first value to compare
 * @param target - The second value to compare
 * @returns `true` if both values are not empty and strictly equal
 *
 * @example
 * ```typescript
 * isEqual("hello", "hello")  // true
 * isEqual(null, null)        // false (both are empty)
 * isEqual("", "")            // false (both are empty)
 * isEqual(0, 0)              // true (0 is not empty)
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isEqual = (input, target) => {
    return (0, isEmpty_1.isNotEmpty)(input) && (0, isEmpty_1.isNotEmpty)(target) && input === target;
};
exports.isEqual = isEqual;
/**
 * Performs loose equality check (==) - use with extreme caution.
 * This function uses JavaScript's loose equality operator which can lead to unexpected results.
 * Consider using strict equality (`===`) or `isEqual` instead.
 *
 * @param input - The first value to compare
 * @param target - The second value to compare
 * @returns `true` if values are loosely equal
 *
 * @example
 * ```typescript
 * isLooseEqual("42", 42)     // true (coercion occurs)
 * isLooseEqual(null, undefined) // true
 * isLooseEqual(0, false)     // true
 * ```
 *
 * @warning This function uses loose equality (==) which can produce unexpected results due to type coercion
 * @since 1.0.0
 * @category Equality
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
 * Performs deep equality comparison for objects and arrays.
 * Recursively compares nested structures, handling various data types appropriately.
 *
 * Supported types:
 * - Primitives (string, number, boolean, null, undefined)
 * - Arrays (recursive comparison)
 * - Plain objects (recursive comparison)
 * - Date objects (time comparison)
 * - RegExp objects (string representation comparison)
 *
 * @param input - The first value to compare
 * @param target - The second value to compare
 * @returns `true` if values are deeply equal
 *
 * @example
 * ```typescript
 * isDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })  // true
 * isDeepEqual([1, [2, 3]], [1, [2, 3]])                      // true
 * isDeepEqual(new Date('2023-01-01'), new Date('2023-01-01')) // true
 * isDeepEqual({ a: 1 }, { a: 1, b: 2 })                      // false
 * ```
 *
 * @since 1.0.0
 * @category Equality
 */
const isDeepEqual = (input, target) => {
    // Same reference or strict equality (handles primitives and same object references)
    if (input === target) {
        return true;
    }
    // Both null or undefined (but not the same - already handled above)
    if ((0, exports.isNullish)(input) && (0, exports.isNullish)(target)) {
        return input === target; // This will be false since they're not the same
    }
    // One is null/undefined, the other is not
    if ((0, exports.isNullish)(input) || (0, exports.isNullish)(target)) {
        return false;
    }
    // Different primitive types
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
    // Handle Date objects
    if (input instanceof Date && target instanceof Date) {
        return input.getTime() === target.getTime();
    }
    // Handle RegExp objects
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
    // For all other cases (functions, symbols, class instances, etc.), use strict equality
    return input === target;
};
exports.isDeepEqual = isDeepEqual;
// =============================================================================
// Utility Functions for Common Patterns
// =============================================================================
/**
 * Checks if a value matches any of the provided options.
 * Useful for creating enum-like validations and switch-case alternatives.
 *
 * @template T - The type of the options
 * @param value - The value to check
 * @param options - Array of options to match against
 * @returns `true` if value matches any option, with type narrowing to T
 *
 * @example
 * ```typescript
 * const colors = ['red', 'green', 'blue'] as const;
 * isOneOf('red', colors)     // true
 * isOneOf('yellow', colors)  // false
 *
 * // With type narrowing
 * function handleColor(color: unknown) {
 *   if (isOneOf(color, colors)) {
 *     // color is now typed as 'red' | 'green' | 'blue'
 *     console.log(`Valid color: ${color}`);
 *   }
 * }
 * ```
 *
 * @since 1.0.0
 * @category Utilities
 */
const isOneOf = (value, options) => {
    return options.includes(value);
};
exports.isOneOf = isOneOf;
/**
 * Checks if a numeric value is within a specified range (inclusive).
 * Both minimum and maximum values are included in the valid range.
 *
 * @param value - The value to check
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns `true` if value is a number within the specified range
 *
 * @example
 * ```typescript
 * isInRange(5, 1, 10)      // true
 * isInRange(1, 1, 10)      // true (inclusive)
 * isInRange(10, 1, 10)     // true (inclusive)
 * isInRange(0, 1, 10)      // false
 * isInRange(11, 1, 10)     // false
 * isInRange("5", 1, 10)    // false (not a number)
 * ```
 *
 * @since 1.0.0
 * @category Utilities
 */
const isInRange = (value, min, max) => {
    return (0, exports.isNumber)(value) && value >= min && value <= max;
};
exports.isInRange = isInRange;
/**
 * Checks if a string matches a given pattern (RegExp or string).
 * For string patterns, uses `includes()` method for substring matching.
 * For RegExp patterns, uses `test()` method for pattern matching.
 *
 * @param value - The string value to check
 * @param pattern - The pattern to match against (RegExp for pattern matching, string for substring)
 * @returns `true` if the string matches the pattern
 *
 * @example
 * ```typescript
 * matchesPattern("hello world", /^hello/)     // true
 * matchesPattern("hello world", "world")      // true
 * matchesPattern("hello", "world")            // false
 * matchesPattern(123, "hello")                // false (not a string)
 * ```
 *
 * @since 1.0.0
 * @category Utilities
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
 * Checks if a value has a specific property and provides type narrowing.
 * Uses the `in` operator for accurate property detection, including inherited properties.
 *
 * @template K - The type of the property key
 * @param value - The object to check
 * @param property - The property name to check for
 * @returns `true` if object has the property, with type narrowing
 *
 * @example
 * ```typescript
 * const obj = { name: 'John', age: 30 };
 * hasProperty(obj, 'name')      // true
 * hasProperty(obj, 'email')     // false
 * hasProperty(null, 'name')     // false
 *
 * // With type narrowing
 * function processUser(user: unknown) {
 *   if (hasProperty(user, 'name')) {
 *     // user is now typed as Record<'name', unknown>
 *     console.log(user.name);
 *   }
 * }
 * ```
 *
 * @since 1.0.0
 * @category Utilities
 */
const hasProperty = (value, property) => {
    return typeof value === "object"
        && value !== null
        && property in value;
};
exports.hasProperty = hasProperty;
/**
 * Checks if a value has a specific method (function property).
 * Combines property existence check with function type validation.
 *
 * @template K - The type of the method name
 * @param value - The object to check
 * @param methodName - The method name to check for
 * @returns `true` if object has the method and it's a function
 *
 * @example
 * ```typescript
 * hasMethod([], 'push')           // true
 * hasMethod({}, 'toString')       // true (inherited)
 * hasMethod({ foo: 'bar' }, 'foo') // false (not a function)
 * hasMethod(null, 'toString')     // false
 * ```
 *
 * @since 1.0.0
 * @category Utilities
 */
const hasMethod = (value, methodName) => {
    return (0, exports.hasProperty)(value, methodName) && (0, exports.isFunction)(value[methodName]);
};
exports.hasMethod = hasMethod;
/**
 * Creates a type guard function that checks if a value is an instance of a specific class.
 * Useful for creating reusable type guards for custom classes.
 *
 * @template T - The class type
 * @param constructor - The class constructor function
 * @returns A type guard function for the specified class
 *
 * @example
 * ```typescript
 * class MyClass {
 *   value: number = 0;
 * }
 *
 * const isMyClass = createInstanceGuard(MyClass);
 *
 * const obj = new MyClass();
 * if (isMyClass(obj)) {
 *   // obj is now typed as MyClass
 *   console.log(obj.value);
 * }
 * ```
 *
 * @since 1.0.0
 * @category Utilities
 */
const createInstanceGuard = (constructor) => {
    return (value) => {
        return value instanceof constructor;
    };
};
exports.createInstanceGuard = createInstanceGuard;
//# sourceMappingURL=isEqual.js.map