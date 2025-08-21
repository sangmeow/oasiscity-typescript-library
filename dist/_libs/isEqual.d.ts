/**
 * Checks if a value is a string and narrows the type
 * @param value - Value to check
 * @returns true if value is string, with type narrowing
 */
export declare const isString: (value: unknown) => value is string;
/**
 * Checks if a value is a number (excluding NaN) and narrows the type
 * @param value - Value to check
 * @returns true if value is a valid number, with type narrowing
 */
export declare const isNumber: (value: unknown) => value is number;
/**
 * Checks if a value is a valid finite number
 * @param value - Value to check
 * @returns true if value is a finite number
 */
export declare const isFiniteNumber: (value: unknown) => value is number;
/**
 * Checks if a value is an integer
 * @param value - Value to check
 * @returns true if value is an integer
 */
export declare const isInteger: (value: unknown) => value is number;
/**
 * Checks if a value is a boolean and narrows the type
 * @param value - Value to check
 * @returns true if value is boolean, with type narrowing
 */
export declare const isBoolean: (value: unknown) => value is boolean;
/**
 * Checks if a value is null and narrows the type
 * @param value - Value to check
 * @returns true if value is null, with type narrowing
 */
export declare const isNull: (value: unknown) => value is null;
/**
 * Checks if a value is undefined and narrows the type
 * @param value - Value to check
 * @returns true if value is undefined, with type narrowing
 */
export declare const isUndefined: (value: unknown) => value is undefined;
/**
 * Checks if a value is null or undefined
 * @param value - Value to check
 * @returns true if value is null or undefined
 */
export declare const isNullish: (value: unknown) => value is null | undefined;
/**
 * Checks if a value is an array and narrows the type
 * @param value - Value to check
 * @returns true if value is an array, with type narrowing
 */
export declare const isArray: (value: unknown) => value is unknown[];
/**
 * Checks if a value is a plain object (not array, null, or class instance)
 * @param value - Value to check
 * @returns true if value is a plain object
 */
export declare const isPlainObject: (value: unknown) => value is Record<string, unknown>;
/**
 * Checks if a value is a function
 * @param value - Value to check
 * @returns true if value is a function
 */
export declare const isFunction: (value: unknown) => value is (...args: unknown[]) => unknown;
/**
 * Checks if input is a string and equals the target string
 * @param input - Input value to check
 * @param target - Target string to compare against
 * @returns true if input is string and equals target
 */
export declare const isEqualString: (input: unknown, target: string) => input is string;
/**
 * Checks if input is a number and equals the target number
 * @param input - Input value to check
 * @param target - Target number to compare against
 * @returns true if input is number and equals target
 */
export declare const isEqualNumber: (input: unknown, target: number) => input is number;
/**
 * Checks if input is a boolean and equals the target boolean
 * @param input - Input value to check
 * @param target - Target boolean to compare against
 * @returns true if input is boolean and equals target
 */
export declare const isEqualBoolean: (input: unknown, target: boolean) => input is boolean;
/**
 * Checks if input is NOT a string or does NOT equal the target string
 * @param input - Input value to check
 * @param target - Target string to compare against
 * @returns true if input is not string or not equal to target
 */
export declare const isNotEqualString: (input: unknown, target: string) => boolean;
/**
 * Checks if input is NOT a number or does NOT equal the target number
 * @param input - Input value to check
 * @param target - Target number to compare against
 * @returns true if input is not number or not equal to target
 */
export declare const isNotEqualNumber: (input: unknown, target: number) => boolean;
/**
 * Performs strict equality check with additional empty value validation
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if both values are not empty and strictly equal
 */
export declare const isEqual: (input: unknown, target: unknown) => boolean;
/**
 * Performs loose equality check (==) - use with caution
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if values are loosely equal
 */
export declare const isLooseEqual: (input: unknown, target: unknown) => boolean;
/**
 * Performs deep equality comparison for objects and arrays
 * @param input - First value to compare
 * @param target - Second value to compare
 * @returns true if values are deeply equal
 */
export declare const isDeepEqual: (input: unknown, target: unknown) => boolean;
/**
 * Checks if a value matches any of the provided options
 * @param value - Value to check
 * @param options - Array of options to match against
 * @returns true if value matches any option
 */
export declare const isOneOf: <T>(value: unknown, options: T[]) => value is T;
/**
 * Checks if a value is within a numeric range (inclusive)
 * @param value - Value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns true if value is within range
 */
export declare const isInRange: (value: unknown, min: number, max: number) => value is number;
/**
 * Checks if a string matches a pattern (RegExp or string)
 * @param value - String to check
 * @param pattern - Pattern to match (RegExp or string)
 * @returns true if string matches pattern
 */
export declare const matchesPattern: (value: unknown, pattern: RegExp | string) => value is string;
/**
 * Checks if a value has a specific property
 * @param value - Object to check
 * @param property - Property name to check for
 * @returns true if object has the property
 */
export declare const hasProperty: <K extends string | number | symbol>(value: unknown, property: K) => value is Record<K, unknown>;
//# sourceMappingURL=isEqual.d.ts.map