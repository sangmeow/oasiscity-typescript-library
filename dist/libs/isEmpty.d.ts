/**
 * Checks if a value is empty
 * @param value - Value to check
 * @returns true if the value is empty (null, undefined, empty string, empty array, empty object, NaN, invalid Date)
 *
 * @example
 * isEmpty(null) // true
 * isEmpty("") // true
 * isEmpty("  ") // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false
 * isEmpty(false) // false
 */
export declare const isEmpty: <T>(value: T) => value is Extract<T, null | undefined>;
/**
 * Checks if a value is not empty (opposite of isEmpty)
 * @param value - Value to check
 * @returns true if the value is not empty
 *
 * @example
 * isNotEmpty(null) // false
 * isNotEmpty("hello") // true
 * isNotEmpty([1, 2, 3]) // true
 * isNotEmpty({a: 1}) // true
 */
export declare const isNotEmpty: <T>(value: T) => value is Exclude<T, null | undefined>;
/**
 * Returns 0 if the value is empty, otherwise returns the original value
 * @param value - Value to check
 * @returns 0 if empty, original value otherwise
 *
 * @example
 * setZeroIfEmpty(null) // 0
 * setZeroIfEmpty("") // 0
 * setZeroIfEmpty("hello") // "hello"
 * setZeroIfEmpty(42) // 42
 */
export declare const setZeroIfEmpty: <T>(value: T) => T extends null | undefined ? 0 : T | 0;
/**
 * Returns 1 if the value is empty, otherwise returns the original value
 * @param value - Value to check
 * @returns 1 if empty, original value otherwise
 *
 * @example
 * setOneIfEmpty(null) // 1
 * setOneIfEmpty("") // 1
 * setOneIfEmpty("hello") // "hello"
 * setOneIfEmpty(42) // 42
 */
export declare const setOneIfEmpty: <T>(value: T) => T extends null | undefined ? 1 : T | 1;
/**
 * Generic function to set a default value if the input is empty
 * @param value - Value to check
 * @param defaultValue - Default value to return if input is empty
 * @returns Default value if empty, original value otherwise
 *
 * @example
 * setDefaultIfEmpty(null, "default") // "default"
 * setDefaultIfEmpty("", "fallback") // "fallback"
 * setDefaultIfEmpty("hello", "default") // "hello"
 */
export declare const setDefaultIfEmpty: <T, D>(value: T, defaultValue: D) => T extends null | undefined ? D : T | D;
/**
 * Type guard that narrows the type by excluding null and undefined if the value is not empty
 * @param value - Value to check and narrow
 * @returns true if value is not empty, with type narrowing
 *
 * @example
 * function example(value: string | null | undefined) {
 *   if (isNotEmptyGuard(value)) {
 *     // value is now typed as string (null and undefined excluded)
 *     console.log(value.toUpperCase());
 *   }
 * }
 */
export declare const isNotEmptyGuard: <T>(value: T) => value is NonNullable<T>;
//# sourceMappingURL=isEmpty.d.ts.map