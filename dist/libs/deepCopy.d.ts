/**
 * Deep copy function for TypeScript with enhanced performance and type safety.
 * Handles circular references and supports a wide range of built-in objects.
 *
 * @template T - The type of the target value to be copied
 * @param target - The target value to be deep copied
 * @param visited - Internal parameter for circular reference detection (do not use manually)
 * @returns A deep copy of the target value
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 }, d: [3, 4] };
 * const copy = deepCopy(original);
 * copy.b.c = 5; // original.b.c remains 2
 * ```
 *
 * @see Based on ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 */
export declare const deepCopy: <T>(target: T, visited?: WeakMap<object, unknown>) => T;
/**
 * Type guard to check if a value can be safely deep copied.
 * Some objects like DOM elements, functions with closures, etc. may not copy correctly.
 *
 * @param value - The value to check
 * @returns True if the value can be safely deep copied
 */
export declare const isDeepCopyable: (value: unknown) => boolean;
/**
 * Deep copy with validation - throws an error if the target contains non-copyable elements.
 *
 * @template T - The type of the target value
 * @param target - The target value to be deep copied
 * @returns A deep copy of the target value
 * @throws Error if the target contains non-copyable elements
 */
export declare const deepCopyStrict: <T>(target: T) => T;
//# sourceMappingURL=deepCopy.d.ts.map