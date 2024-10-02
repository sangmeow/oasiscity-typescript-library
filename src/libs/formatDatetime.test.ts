import { formatDatetime } from "./formatDatetime";

const testDataList = [
	{ datetime: "1970-01-01", start: true, result: "1970-01-01 00:00:00" },
	{ datetime: "2024-10-10", start: true, result: "2024-10-10 00:00:00" },
	{ datetime: "2024-00-01", start: true, result: false },
	{ datetime: "2024-01-00", start: true, result: false },
	{ datetime: "2023-02-28", start: true, result: "2023-02-28 00:00:00" },
	{ datetime: "2023-02-29", start: true, result: false },
	{ datetime: "2024-02-29", start: true, result: "2024-02-29 00:00:00" },
	{ datetime: "2024-12-31", start: true, result: "2024-12-31 00:00:00" },
	{ datetime: "2024-12-32", start: true, result: false },
	{ datetime: "20244-10-10", start: true, result: false },
	{ datetime: "1970-01-01", start: false, result: "1970-01-01 23:59:59" },
	{ datetime: "2024-10-10", start: false, result: "2024-10-10 23:59:59" },
	{ datetime: "2024-00-01", start: false, result: false },
	{ datetime: "2024-01-00", start: false, result: false },
	{ datetime: "2023-02-28", start: false, result: "2023-02-28 23:59:59" },
	{ datetime: "2023-02-29", start: false, result: false },
	{ datetime: "2024-02-29", start: false, result: "2024-02-29 23:59:59" },
	{ datetime: "2024-12-31", start: false, result: "2024-12-31 23:59:59" },
	{ datetime: "2024-12-32", start: false, result: false },
	{ datetime: "20244-10-10", start: false, result: false },
];

describe("formatDatetime test", () => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	testDataList.forEach((i) => {
		test(`formatDatetime ${i.datetime} ${i.start}`, () => {
			expect(formatDatetime(i.datetime, i.start)).toBe(i.result);
		});
	});
});
