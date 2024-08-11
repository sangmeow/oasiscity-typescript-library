import { isObjectEmpty } from "./validator";

const data = {
  name: "John", age: 30, city: "New York",
  notEmptyString: "notEmptyString",
  notEmptyObject: { key: "value" },
  notEmptyArray: ["sickdog","oasiscity"],
  emptyString: "", emptyObject: {}, emptyArray: []
};

describe("json test", () => {
	test("json test 01", () => {
    expect(isObjectEmpty(data,"name")).toBe(false);
  });
  test("json test 02", () => {
    expect(isObjectEmpty(data,"names")).toBe(true);
  });
  test("json test 03", () => {
    expect(isObjectEmpty(data,"notEmptyString")).toBe(false);
  });
  test("json test 04", () => {
    expect(isObjectEmpty(data,"notEmptyObject")).toBe(false);
	});
  test("json test 05", () => {
    expect(isObjectEmpty(data,"notEmptyArray")).toBe(false);
  });
  test("json test 06", () => {
    expect(isObjectEmpty(data,"emptyString")).toBe(true);
  });
  test("json test 07", () => {
    expect(isObjectEmpty(data,"emptyObject")).toBe(true);
	});
  test("json test 08", () => {
    expect(isObjectEmpty(data,"emptyArray")).toBe(true);
  });
});

