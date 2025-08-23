/**
 * Core empty checking logic
 * @param value - Value to check for emptiness
 * @returns true if the value is considered empty
 */
const checkIsEmpty = (value: unknown): boolean => {
  // Handle null and undefined
  if (value === null || value === undefined) { return true; }
  // Handle strings
  if (typeof value === "string") { return value.trim() === ""; }
  // Handle numbers (consider 0 as not empty, NaN as empty)
  if (typeof value === "number") { return Number.isNaN(value); }
  // Handle arrays
  if (Array.isArray(value)) { return value.length === 0; }
  // Handle Map objects
  if (value instanceof Map) { return value.size === 0; }
  // Handle Set objects
  if (value instanceof Set) { return value.size === 0; }
  // Handle Date objects (invalid dates are considered empty)
  if (value instanceof Date) { return Number.isNaN(value.getTime());}
  // Handle plain objects
  if (typeof value === "object" && value.constructor === Object) { return Object.keys(value).length === 0; }
  // All other values (functions, symbols, class instances, etc.) are not empty
  return false;
};

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
export const isEmpty = <T>(value: T): value is Extract<T, null | undefined> => {
  return checkIsEmpty(value);
};

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
export const isNotEmpty = <T>(value: T): value is Exclude<T, null | undefined> => {
  return !checkIsEmpty(value);
};

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
export const setZeroIfEmpty = <T>(value: T): T extends null | undefined ? 0 : T | 0 => {
  return checkIsEmpty(value) ? (0 as any) : value as any;
};

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
export const setOneIfEmpty = <T>(value: T): T extends null | undefined ? 1 : T | 1 => {
  return checkIsEmpty(value) ? (1 as any) : value as any;
};

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
export const setDefaultIfEmpty = <T, D>(
  value: T, 
  defaultValue: D
): T extends null | undefined ? D : T | D => {
  return checkIsEmpty(value) ? (defaultValue as any) : value as any;
};

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
export const isNotEmptyGuard = <T>(value: T): value is NonNullable<T> => {
  return !checkIsEmpty(value);
};
