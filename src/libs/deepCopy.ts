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
export const deepCopy = <T>(target: T, visited?: WeakMap<object, unknown>): T => {
  // Initialize visited map for circular reference detection
  const visitedMap = visited ?? new WeakMap()

  // Handle null and undefined
  if (target === null || target === undefined) {
    return target
  }

  // Handle primitive types (string, number, boolean, symbol, bigint)
  const targetType = typeof target
  if (targetType !== 'object' && targetType !== 'function') {
    return target
  }

  // Handle functions - return as is (functions are typically not deep copied)
  if (targetType === 'function') {
    return target
  }

  // Type assertion for object types
  const targetObj = target as object

  // Check for circular references
  if (visitedMap.has(targetObj)) {
    return visitedMap.get(targetObj) as T
  }

  // Handle Date objects
  if (target instanceof Date) {
    const dateCopy = new Date(target.getTime()) as T
    visitedMap.set(targetObj, dateCopy)
    return dateCopy
  }

  // Handle RegExp objects
  if (target instanceof RegExp) {
    const regexCopy = new RegExp(target.source, target.flags) as T
    visitedMap.set(targetObj, regexCopy)
    return regexCopy
  }

  // Handle Error objects
  if (target instanceof Error) {
    const ErrorConstructor = target.constructor as new (message: string) => Error
    const errorCopy = new ErrorConstructor(target.message) as T
    const errorInstance = errorCopy as Error

    if (target.stack) {
      errorInstance.stack = target.stack
    }
    if (target.name) {
      errorInstance.name = target.name
    }
    visitedMap.set(targetObj, errorCopy)
    return errorCopy
  }

  // Handle ArrayBuffer
  if (target instanceof ArrayBuffer) {
    const bufferCopy = target.slice(0) as T
    visitedMap.set(targetObj, bufferCopy)
    return bufferCopy
  }

  // Handle typed arrays
  if (ArrayBuffer.isView(target) && !(target instanceof DataView)) {
    const TypedArrayConstructor = target.constructor as new (buffer: ArrayBuffer) => typeof target
    const typedArrayTarget = target as ArrayBufferView & { buffer: ArrayBuffer }
    const bufferCopy = typedArrayTarget.buffer.slice(0)
    const typedArrayCopy = new TypedArrayConstructor(bufferCopy) as T
    visitedMap.set(targetObj, typedArrayCopy)
    return typedArrayCopy
  }

  // Handle DataView
  if (target instanceof DataView) {
    const bufferCopy = target.buffer.slice(0)
    const dataViewCopy = new DataView(bufferCopy, target.byteOffset, target.byteLength) as T
    visitedMap.set(targetObj, dataViewCopy)
    return dataViewCopy
  }

  // Handle Arrays
  if (Array.isArray(target)) {
    const arrayCopy: unknown[] = []
    visitedMap.set(targetObj, arrayCopy)

    for (let i = 0; i < target.length; i++) {
      arrayCopy[i] = deepCopy(target[i], visitedMap)
    }
    return arrayCopy as T
  }

  // Handle Map objects
  if (target instanceof Map) {
    const mapCopy = new Map()
    visitedMap.set(targetObj, mapCopy)

    for (const [key, value] of target.entries()) {
      mapCopy.set(deepCopy(key, visitedMap), deepCopy(value, visitedMap))
    }
    return mapCopy as T
  }

  // Handle Set objects
  if (target instanceof Set) {
    const setCopy = new Set()
    visitedMap.set(targetObj, setCopy)

    for (const value of target.values()) {
      setCopy.add(deepCopy(value, visitedMap))
    }
    return setCopy as T
  }

  // Handle WeakMap (cannot be deeply copied, return new empty WeakMap)
  if (target instanceof WeakMap) {
    const weakMapCopy = new WeakMap() as T
    visitedMap.set(targetObj, weakMapCopy)
    return weakMapCopy
  }

  // Handle WeakSet (cannot be deeply copied, return new empty WeakSet)
  if (target instanceof WeakSet) {
    const weakSetCopy = new WeakSet() as T
    visitedMap.set(targetObj, weakSetCopy)
    return weakSetCopy
  }

  // Handle plain objects and class instances
  const copy = Object.create(Object.getPrototypeOf(targetObj)) as T
  visitedMap.set(targetObj, copy)

  // Copy own enumerable properties
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      ;(copy as Record<string, unknown>)[key] = deepCopy(
        (target as Record<string, unknown>)[key],
        visitedMap,
      )
    }
  }

  // Copy non-enumerable own properties
  const propertyDescriptors = Object.getOwnPropertyDescriptors(target)
  for (const key of Object.keys(propertyDescriptors)) {
    const descriptor = propertyDescriptors[key]
    if (!descriptor.enumerable && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
      Object.defineProperty(copy, key, {
        ...descriptor,
        value: deepCopy(descriptor.value, visitedMap),
      })
    }
  }

  // Copy symbol properties
  const symbolKeys = Object.getOwnPropertySymbols(target)
  for (const symbolKey of symbolKeys) {
    const descriptor = Object.getOwnPropertyDescriptor(target, symbolKey)
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
      Object.defineProperty(copy, symbolKey, {
        ...descriptor,
        value: deepCopy(descriptor.value, visitedMap),
      })
    }
  }

  return copy
}

/**
 * Type guard to check if a value can be safely deep copied.
 * Some objects like DOM elements, functions with closures, etc. may not copy correctly.
 *
 * @param value - The value to check
 * @returns True if the value can be safely deep copied
 */
export const isDeepCopyable = (value: unknown): boolean => {
  if (value === null || value === undefined) return true

  const valueType = typeof value
  if (valueType !== 'object' && valueType !== 'function') return true

  // Functions are generally not deep copyable due to closures
  if (valueType === 'function') return false

  // Check for DOM elements (in browser environment)
  if (typeof Element !== 'undefined' && value instanceof Element) return false
  if (typeof Node !== 'undefined' && value instanceof Node) return false

  // Check for Window object (in browser environment)
  if (typeof Window !== 'undefined' && value instanceof Window) return false

  return true
}

/**
 * Deep copy with validation - throws an error if the target contains non-copyable elements.
 *
 * @template T - The type of the target value
 * @param target - The target value to be deep copied
 * @returns A deep copy of the target value
 * @throws Error if the target contains non-copyable elements
 */
export const deepCopyStrict = <T>(target: T): T => {
  const checkCopyable = (value: unknown, path = 'root'): void => {
    if (!isDeepCopyable(value)) {
      throw new Error(`Non-copyable value found at path: ${path}`)
    }

    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          checkCopyable(value[index], `${path}[${index}]`)
        }
      } else if (value instanceof Map) {
        let index = 0
        for (const [key, val] of value.entries()) {
          checkCopyable(key, `${path}.keys[${index}]`)
          checkCopyable(val, `${path}.values[${index}]`)
          index++
        }
      } else if (value instanceof Set) {
        let index = 0
        for (const val of value.values()) {
          checkCopyable(val, `${path}.values[${index}]`)
          index++
        }
      } else {
        for (const [key, val] of Object.entries(value)) {
          checkCopyable(val, `${path}.${key}`)
        }
      }
    }
  }

  checkCopyable(target)
  return deepCopy(target)
}
