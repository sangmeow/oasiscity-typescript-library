import { deepCopy, isDeepCopyable, deepCopyStrict } from './deepCopy'

describe('deepCopy', () => {
  describe('primitive types', () => {
    it('should handle null', () => {
      expect(deepCopy(null)).toBe(null)
    })

    it('should handle undefined', () => {
      expect(deepCopy(undefined)).toBe(undefined)
    })

    it('should handle numbers', () => {
      expect(deepCopy(42)).toBe(42)
      expect(deepCopy(0)).toBe(0)
      expect(deepCopy(-1)).toBe(-1)
      expect(deepCopy(3.14)).toBe(3.14)
    })

    it('should handle strings', () => {
      expect(deepCopy('hello')).toBe('hello')
      expect(deepCopy('')).toBe('')
    })

    it('should handle booleans', () => {
      expect(deepCopy(true)).toBe(true)
      expect(deepCopy(false)).toBe(false)
    })

    it('should handle symbols', () => {
      const symbol = Symbol('test')
      expect(deepCopy(symbol)).toBe(symbol)
    })

    it('should handle bigint', () => {
      const bigintValue = BigInt('123456789012345678901234567890')
      expect(deepCopy(bigintValue)).toBe(bigintValue)
    })
  })

  describe('functions', () => {
    it('should return functions as-is', () => {
      const func = () => 'hello'
      expect(deepCopy(func)).toBe(func)
    })
  })

  describe('arrays', () => {
    it('should deep copy simple arrays', () => {
      const original = [1, 2, 3]
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
    })

    it('should deep copy nested arrays', () => {
      const original = [1, [2, 3], [4, [5, 6]]]
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy[1]).not.toBe(original[1])
      expect(copy[2]).not.toBe(original[2])
    })

    it('should handle sparse arrays', () => {
      // biome-ignore lint/suspicious/noSparseArray: Testing sparse array behavior
      const original = [1, , 3]
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy.length).toBe(3)
      expect(copy[0]).toBe(1)
      expect(copy[1]).toBeUndefined()
      expect(copy[2]).toBe(3)
      expect(Object.hasOwnProperty.call(copy, '1')).toBe(true) // Check if index 1 is a sparse index
    })
  })

  describe('objects', () => {
    it('should deep copy simple objects', () => {
      const original = { a: 1, b: 2 }
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
    })

    it('should deep copy nested objects', () => {
      const original = {
        a: 1,
        b: { c: 2, d: { e: 3 } },
      }
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy.b).not.toBe(original.b)
      expect(copy.b.d).not.toBe(original.b.d)
    })

    it('should preserve object prototypes', () => {
      class TestClass {
        constructor(public value: number) {}
        method(): number {
          return this.value
        }
      }

      const original = new TestClass(42)
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy instanceof TestClass).toBe(true)
      expect(copy.method()).toBe(42)
    })
  })

  describe('built-in objects', () => {
    it('should deep copy Date objects', () => {
      const original = new Date('2023-01-01')
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy instanceof Date).toBe(true)
      expect(copy.getTime()).toBe(original.getTime())
    })

    it('should deep copy RegExp objects', () => {
      const original = /test/gi
      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy instanceof RegExp).toBe(true)
      expect(copy.source).toBe(original.source)
      expect(copy.flags).toBe(original.flags)
    })

    it('should deep copy Error objects', () => {
      const original = new Error('Test error')
      original.stack = 'test stack'
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof Error).toBe(true)
      expect(copy.message).toBe(original.message)
      expect(copy.stack).toBe(original.stack)
      expect(copy.name).toBe(original.name)
    })

    it('should deep copy custom Error types', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message)
          this.name = 'CustomError'
        }
      }

      const original = new CustomError('Custom error')
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof CustomError).toBe(true)
      expect(copy.message).toBe(original.message)
    })
  })

  describe('typed arrays and buffers', () => {
    it('should deep copy ArrayBuffer', () => {
      const original = new ArrayBuffer(8)
      const view = new Uint8Array(original)
      view[0] = 255

      const copy = deepCopy(original)
      const copyView = new Uint8Array(copy)

      expect(copy).not.toBe(original)
      expect(copyView[0]).toBe(255)
    })

    it('should deep copy Uint8Array', () => {
      const original = new Uint8Array([1, 2, 3, 4])
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy).toEqual(original)
      expect(copy instanceof Uint8Array).toBe(true)
    })

    it('should deep copy Int32Array', () => {
      const original = new Int32Array([100, 200, 300])
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy).toEqual(original)
      expect(copy instanceof Int32Array).toBe(true)
    })

    it('should deep copy DataView', () => {
      const buffer = new ArrayBuffer(8)
      const original = new DataView(buffer, 2, 4)
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof DataView).toBe(true)
      expect(copy.byteOffset).toBe(original.byteOffset)
      expect(copy.byteLength).toBe(original.byteLength)
    })
  })

  describe('Map and Set', () => {
    it('should deep copy Set objects', () => {
      const original = new Set([1, { value: 2 }, [3, 4]])
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof Set).toBe(true)
      expect(copy.size).toBe(original.size)
      expect(copy.has(1)).toBe(true)
    })

    it('should handle WeakMap by creating empty WeakMap', () => {
      const original = new WeakMap()
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof WeakMap).toBe(true)
    })

    it('should handle WeakSet by creating empty WeakSet', () => {
      const original = new WeakSet()
      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy instanceof WeakSet).toBe(true)
    })
  })

  describe('circular references', () => {
    it('should handle circular references in objects', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing circular references requires any
      const original: any = { a: 1 }
      original.circular = original

      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy.a).toBe(1)
      expect(copy.circular).toBe(copy)
    })

    it('should handle circular references in arrays', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing circular references requires any
      const original: any[] = [1, 2]
      original.push(original)

      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy[0]).toBe(1)
      expect(copy[1]).toBe(2)
      expect(copy[2]).toBe(copy)
    })

    it('should handle complex circular references', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing circular references requires any
      const original: any = {
        a: { b: { c: null } },
        d: [],
      }
      original.a.b.c = original
      original.d.push(original.a)

      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy.a.b.c).toBe(copy)
      expect(copy.d[0]).toBe(copy.a)
    })
  })

  describe('complex nested structures', () => {
    it('should handle mixed data structures', () => {
      const original = {
        array: [1, { nested: 'value' }],
        map: new Map([['key', [1, 2, 3]]]),
        set: new Set([{ id: 1 }, { id: 2 }]),
        date: new Date('2023-01-01'),
        regex: /test/g,
      }

      const copy = deepCopy(original)

      expect(copy).toEqual(original)
      expect(copy).not.toBe(original)
      expect(copy.array).not.toBe(original.array)
      expect(copy.map).not.toBe(original.map)
      expect(copy.set).not.toBe(original.set)
      expect(copy.date).not.toBe(original.date)
      expect(copy.regex).not.toBe(original.regex)
    })
  })

  describe('symbol properties', () => {
    it('should copy symbol properties', () => {
      const sym = Symbol('test')
      const original = { normalProp: 'value' }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ;(original as any)[sym] = 'symbol value'

      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy.normalProp).toBe('value')
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect((copy as any)[sym]).toBe('symbol value')
    })
  })

  describe('non-enumerable properties', () => {
    it('should copy non-enumerable properties', () => {
      const original = { enumerable: 'yes' }
      Object.defineProperty(original, 'nonEnumerable', {
        value: 'hidden',
        enumerable: false,
        writable: true,
        configurable: true,
      })

      const copy = deepCopy(original)

      expect(copy).not.toBe(original)
      expect(copy.enumerable).toBe('yes')
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect((copy as any).nonEnumerable).toBe('hidden')
    })
  })
})

describe('isDeepCopyable', () => {
  it('should return true for copyable primitives', () => {
    expect(isDeepCopyable(null)).toBe(true)
    expect(isDeepCopyable(undefined)).toBe(true)
    expect(isDeepCopyable(42)).toBe(true)
    expect(isDeepCopyable('string')).toBe(true)
    expect(isDeepCopyable(true)).toBe(true)
    expect(isDeepCopyable(Symbol('test'))).toBe(true)
  })

  it('should return false for functions', () => {
    expect(isDeepCopyable(() => {})).toBe(false)
    expect(isDeepCopyable(function named() {})).toBe(false)
  })

  it('should return true for basic objects', () => {
    expect(isDeepCopyable({})).toBe(true)
    expect(isDeepCopyable({ a: 1 })).toBe(true)
    expect(isDeepCopyable([])).toBe(true)
    expect(isDeepCopyable(new Date())).toBe(true)
  })

  // Note: DOM element tests would only work in browser environment
  // These tests are commented out as they would fail in Node.js Jest environment
  /*
  it('should return false for DOM elements', () => {
    const element = document.createElement('div');
    expect(isDeepCopyable(element)).toBe(false);
  });
  */
})

describe('deepCopyStrict', () => {
  it('should successfully copy valid objects', () => {
    const original = {
      a: 1,
      b: { c: 2 },
      d: [3, 4],
    }

    const copy = deepCopyStrict(original)

    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
  })

  it('should throw error for functions', () => {
    const original = {
      a: 1,
      func: () => 'test',
    }

    expect(() => deepCopyStrict(original)).toThrow('Non-copyable value found at path: root.func')
  })

  it('should throw error for functions in nested structures', () => {
    const original = {
      nested: {
        deeper: {
          func: () => 'test',
        },
      },
    }

    expect(() => deepCopyStrict(original)).toThrow(
      'Non-copyable value found at path: root.nested.deeper.func',
    )
  })

  it('should throw error for functions in arrays', () => {
    const original = [1, 2, () => 'test']

    expect(() => deepCopyStrict(original)).toThrow('Non-copyable value found at path: root[2]')
  })

  it('should throw error for functions in Set', () => {
    const original = new Set([1, 2, () => 'function'])

    expect(() => deepCopyStrict(original)).toThrow(
      'Non-copyable value found at path: root.values[2]',
    )
  })
})

describe('edge cases', () => {
  it('should handle empty objects and arrays', () => {
    expect(deepCopy({})).toEqual({})
    expect(deepCopy([])).toEqual([])
  })

  it('should handle objects with null prototype', () => {
    const original = Object.create(null)
    original.prop = 'value'
    const copy = deepCopy(original)

    expect(copy).not.toBe(original)
    expect(copy.prop).toBe('value')
    expect(Object.getPrototypeOf(copy)).toBe(null)
  })

  it('should handle very large numbers', () => {
    const original = { big: Number.MAX_SAFE_INTEGER }
    const copy = deepCopy(original)

    expect(copy.big).toBe(Number.MAX_SAFE_INTEGER)
  })

  it('should handle special number values', () => {
    const original = {
      nan: Number.NaN,
      infinity: Number.POSITIVE_INFINITY,
      negInfinity: Number.NEGATIVE_INFINITY,
    }
    const copy = deepCopy(original)

    expect(Number.isNaN(copy.nan)).toBe(true)
    expect(copy.infinity).toBe(Number.POSITIVE_INFINITY)
    expect(copy.negInfinity).toBe(Number.NEGATIVE_INFINITY)
  })
})
