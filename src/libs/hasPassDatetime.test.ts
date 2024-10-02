import { hasPassDatetime } from "./hasPassDatetime";

const testDataList = [
	{ datetime: "2024-10-01", result: true },
	{ datetime: "2024-10-02", result: true },
	{ datetime: "2024-10-02 14:00:00", result: true },
	// { datetime: "2024-10-02 15:00:00", result: false },
	// { datetime: "2024-10-03", result: false },
	// { datetime: "2024-10-03 00:00:00", result: false },
	// { datetime: "2024-10-03 23:59:59", result: false },
	{ datetime: "9999-10-02 15:00:00", result: false },
	{ datetime: "9999-10-03", result: false },
	{ datetime: "9999-10-03 00:00:00", result: false },
	{ datetime: "9999-10-03 23:59:59", result: false },
];

describe("hasPassDatetime test", () => {
	console.log(`Current Datetime ${new Date().toISOString()}`);
	// biome-ignore lint/complexity/noForEach: <explanation>
	testDataList.forEach((i) => {
		test(`hasPassDatetime ${i.datetime}`, () => {
			expect(hasPassDatetime(i.datetime)).toBe(i.result);
		});
	});
});
