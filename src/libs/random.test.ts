import { randomNumber } from './random';

describe("random test", () => {
  test("randomNumber test 01", () => {
    expect(randomNumber(1, 10)).toBeGreaterThanOrEqual(1);
  })
});