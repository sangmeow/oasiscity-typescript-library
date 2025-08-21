/**
 * Configuration options for object cleaning operations
 */
interface CleanObjectOptions {
    /** Remove null values (default: true) */
    removeNull?: boolean;
    /** Remove undefined values (default: true) */
    removeUndefined?: boolean;
    /** Remove empty strings (default: true) */
    removeEmptyStrings?: boolean;
    /** Remove empty arrays (default: false) */
    removeEmptyArrays?: boolean;
    /** Remove empty objects (default: false) */
    removeEmptyObjects?: boolean;
    /** Remove NaN values (default: true) */
    removeNaN?: boolean;
    /** Remove zero values (default: false) */
    removeZeros?: boolean;
    /** Remove false boolean values (default: false) */
    removeFalse?: boolean;
    /** Custom predicate function to determine if a value should be removed */
    customPredicate?: (value: unknown, key: string) => boolean;
    /** Maximum depth for recursive cleaning (default: Infinity) */
    maxDepth?: number;
    /** Whether to clean arrays recursively (default: true) */
    cleanArrays?: boolean;
    /** Preserve specific keys even if their values would be removed */
    preserveKeys?: string[];
}
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
export declare const cleanObject: <T extends Record<string, unknown>>(obj: T | null | undefined, options?: CleanObjectOptions) => Partial<T>;
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
export declare const removeNullish: <T extends Record<string, unknown>>(obj: T | null | undefined) => Partial<T>;
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
export declare const removeFalsyValues: <T extends Record<string, unknown>>(obj: T | null | undefined) => Partial<T>;
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
export declare const removeEmptyCollections: <T extends Record<string, unknown>>(obj: T | null | undefined) => Partial<T>;
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
export declare const shallowClean: <T extends Record<string, unknown>>(obj: T | null | undefined, options?: CleanObjectOptions) => Partial<T>;
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
export declare const countEmptyValues: (obj: Record<string, unknown> | null | undefined, options?: CleanObjectOptions) => {
    total: number;
    removed: number;
    remaining: number;
};
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
export declare const hasEmptyValues: (obj: Record<string, unknown> | null | undefined, options?: CleanObjectOptions) => boolean;
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
export declare const validateNoEmptyValues: <T extends Record<string, unknown>>(obj: T | null | undefined, options?: CleanObjectOptions) => {
    isValid: boolean;
    errors: string[];
    cleanedObject: Partial<T>;
};
export {};
//# sourceMappingURL=removeEmptyBodyValues.d.ts.map