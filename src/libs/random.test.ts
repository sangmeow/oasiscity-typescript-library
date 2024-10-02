import { randomNumber } from './random';

describe("random test", () => {
  test("randomNumber test 01", () => {
    expect(randomNumber(1, 10)).toBeGreaterThanOrEqual(1);
  })
  test("randomNumber test 02", () => {
    expect(randomNumber(1, 10)).toBeLessThanOrEqual(10);
  })
});