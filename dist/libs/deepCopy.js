"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopyStrict = exports.isDeepCopyable = exports.deepCopy = void 0;
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
const deepCopy = (target, visited) => {
    // Initialize visited map for circular reference detection
    const visitedMap = visited !== null && visited !== void 0 ? visited : new WeakMap();
    // Handle null and undefined
    if (target === null || target === undefined) {
        return target;
    }
    // Handle primitive types (string, number, boolean, symbol, bigint)
    const targetType = typeof target;
    if (targetType !== 'object' && targetType !== 'function') {
        return target;
    }
    // Handle functions - return as is (functions are typically not deep copied)
    if (targetType === 'function') {
        return target;
    }
    // Type assertion for object types
    const targetObj = target;
    // Check for circular references
    if (visitedMap.has(targetObj)) {
        return visitedMap.get(targetObj);
    }
    // Handle Date objects
    if (target instanceof Date) {
        const dateCopy = new Date(target.getTime());
        visitedMap.set(targetObj, dateCopy);
        return dateCopy;
    }
    // Handle RegExp objects
    if (target instanceof RegExp) {
        const regexCopy = new RegExp(target.source, target.flags);
        visitedMap.set(targetObj, regexCopy);
        return regexCopy;
    }
    // Handle Error objects
    if (target instanceof Error) {
        const ErrorConstructor = target.constructor;
        const errorCopy = new ErrorConstructor(target.message);
        const errorInstance = errorCopy;
        if (target.stack) {
            errorInstance.stack = target.stack;
        }
        if (target.name) {
            errorInstance.name = target.name;
        }
        visitedMap.set(targetObj, errorCopy);
        return errorCopy;
    }
    // Handle ArrayBuffer
    if (target instanceof ArrayBuffer) {
        const bufferCopy = target.slice(0);
        visitedMap.set(targetObj, bufferCopy);
        return bufferCopy;
    }
    // Handle typed arrays
    if (ArrayBuffer.isView(target) && !(target instanceof DataView)) {
        const TypedArrayConstructor = target.constructor;
        const typedArrayTarget = target;
        const bufferCopy = typedArrayTarget.buffer.slice(0);
        const typedArrayCopy = new TypedArrayConstructor(bufferCopy);
        visitedMap.set(targetObj, typedArrayCopy);
        return typedArrayCopy;
    }
    // Handle DataView
    if (target instanceof DataView) {
        const bufferCopy = target.buffer.slice(0);
        const dataViewCopy = new DataView(bufferCopy, target.byteOffset, target.byteLength);
        visitedMap.set(targetObj, dataViewCopy);
        return dataViewCopy;
    }
    // Handle Arrays
    if (Array.isArray(target)) {
        const arrayCopy = [];
        visitedMap.set(targetObj, arrayCopy);
        for (let i = 0; i < target.length; i++) {
            arrayCopy[i] = (0, exports.deepCopy)(target[i], visitedMap);
        }
        return arrayCopy;
    }
    // Handle Map objects
    if (target instanceof Map) {
        const mapCopy = new Map();
        visitedMap.set(targetObj, mapCopy);
        for (const [key, value] of target.entries()) {
            mapCopy.set((0, exports.deepCopy)(key, visitedMap), (0, exports.deepCopy)(value, visitedMap));
        }
        return mapCopy;
    }
    // Handle Set objects
    if (target instanceof Set) {
        const setCopy = new Set();
        visitedMap.set(targetObj, setCopy);
        for (const value of target.values()) {
            setCopy.add((0, exports.deepCopy)(value, visitedMap));
        }
        return setCopy;
    }
    // Handle WeakMap (cannot be deeply copied, return new empty WeakMap)
    if (target instanceof WeakMap) {
        const weakMapCopy = new WeakMap();
        visitedMap.set(targetObj, weakMapCopy);
        return weakMapCopy;
    }
    // Handle WeakSet (cannot be deeply copied, return new empty WeakSet)
    if (target instanceof WeakSet) {
        const weakSetCopy = new WeakSet();
        visitedMap.set(targetObj, weakSetCopy);
        return weakSetCopy;
    }
    // Handle plain objects and class instances
    const copy = Object.create(Object.getPrototypeOf(targetObj));
    visitedMap.set(targetObj, copy);
    // Copy own enumerable properties
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            ;
            copy[key] = (0, exports.deepCopy)(target[key], visitedMap);
        }
    }
    // Copy non-enumerable own properties
    const propertyDescriptors = Object.getOwnPropertyDescriptors(target);
    for (const key of Object.keys(propertyDescriptors)) {
        const descriptor = propertyDescriptors[key];
        if (!descriptor.enumerable && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
            Object.defineProperty(copy, key, Object.assign(Object.assign({}, descriptor), { value: (0, exports.deepCopy)(descriptor.value, visitedMap) }));
        }
    }
    // Copy symbol properties
    const symbolKeys = Object.getOwnPropertySymbols(target);
    for (const symbolKey of symbolKeys) {
        const descriptor = Object.getOwnPropertyDescriptor(target, symbolKey);
        if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
            Object.defineProperty(copy, symbolKey, Object.assign(Object.assign({}, descriptor), { value: (0, exports.deepCopy)(descriptor.value, visitedMap) }));
        }
    }
    return copy;
};
exports.deepCopy = deepCopy;
/**
 * Type guard to check if a value can be safely deep copied.
 * Some objects like DOM elements, functions with closures, etc. may not copy correctly.
 *
 * @param value - The value to check
 * @returns True if the value can be safely deep copied
 */
const isDeepCopyable = (value) => {
    if (value === null || value === undefined)
        return true;
    const valueType = typeof value;
    if (valueType !== 'object' && valueType !== 'function')
        return true;
    // Functions are generally not deep copyable due to closures
    if (valueType === 'function')
        return false;
    // Check for DOM elements (in browser environment)
    if (typeof Element !== 'undefined' && value instanceof Element)
        return false;
    if (typeof Node !== 'undefined' && value instanceof Node)
        return false;
    // Check for Window object (in browser environment)
    if (typeof Window !== 'undefined' && value instanceof Window)
        return false;
    return true;
};
exports.isDeepCopyable = isDeepCopyable;
/**
 * Deep copy with validation - throws an error if the target contains non-copyable elements.
 *
 * @template T - The type of the target value
 * @param target - The target value to be deep copied
 * @returns A deep copy of the target value
 * @throws Error if the target contains non-copyable elements
 */
const deepCopyStrict = (target) => {
    const checkCopyable = (value, path = 'root') => {
        if (!(0, exports.isDeepCopyable)(value)) {
            throw new Error(`Non-copyable value found at path: ${path}`);
        }
        if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                for (let index = 0; index < value.length; index++) {
                    checkCopyable(value[index], `${path}[${index}]`);
                }
            }
            else if (value instanceof Map) {
                let index = 0;
                for (const [key, val] of value.entries()) {
                    checkCopyable(key, `${path}.keys[${index}]`);
                    checkCopyable(val, `${path}.values[${index}]`);
                    index++;
                }
            }
            else if (value instanceof Set) {
                let index = 0;
                for (const val of value.values()) {
                    checkCopyable(val, `${path}.values[${index}]`);
                    index++;
                }
            }
            else {
                for (const [key, val] of Object.entries(value)) {
                    checkCopyable(val, `${path}.${key}`);
                }
            }
        }
    };
    checkCopyable(target);
    return (0, exports.deepCopy)(target);
};
exports.deepCopyStrict = deepCopyStrict;
//# sourceMappingURL=deepCopy.js.map