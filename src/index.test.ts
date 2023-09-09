import * as LIB from './index'

describe('IsNumber', () => {
  test('Should return true for (1)', () => {
    expect(LIB.isNumber(1)).toBe(true)
  })
  test('Should return false for ("1")', () => {
    expect(LIB.isNumber('1')).toBe(false)
  })
})
