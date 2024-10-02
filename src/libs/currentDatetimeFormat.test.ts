import { addDays, addHours } from "./currentDatetimeFormat";

const testDaysDataList = [
	{ datetime: new Date("2020-01-01"), days: 1, result: new Date("2020-01-02T00:00:00.000Z") },
	{ datetime: new Date("2020-12-31"), days: 1, result: new Date("2021-01-01T00:00:00.000Z") },
	{ datetime: new Date("2021-01-01"), days: 30, result: new Date("2021-01-31T00:00:00.000Z") },
	{ datetime: new Date("2021-12-31"), days: 30, result: new Date("2022-01-30T00:00:00.000Z") },
	{ datetime: new Date("2022-01-01"), days: 90, result: new Date("2022-04-01T00:00:00.000Z") },
	{ datetime: new Date("2022-12-31"), days: 90, result: new Date("2023-03-31T00:00:00.000Z") },
	{ datetime: new Date("2023-01-01"), days: 120, result: new Date("2023-05-01T00:00:00.000Z") },
	{ datetime: new Date("2023-12-31"), days: 120, result: new Date("2024-04-29T00:00:00.000Z") },
	{ datetime: new Date("2024-01-01"), days: 365, result: new Date("2024-12-31T00:00:00.000Z") },
	{ datetime: new Date("2024-12-31"), days: 365, result: new Date("2025-12-31T00:00:00.000Z") },
	{ datetime: new Date("2025-01-01"), days: 365, result: new Date("2026-01-01T00:00:00.000Z") },
	{ datetime: new Date("2025-12-31"), days: 365, result: new Date("2026-12-31T00:00:00.000Z") },
];

const testHoursDataList = [
	{ datetime: new Date("2020-01-01 00:00:00"), hours: 1, result: new Date("2020-01-01 01:00:00.000") },
	{ datetime: new Date("2020-01-01 00:00:00"), hours: 1, result: new Date("2019-12-31T16:00:00.000Z") },
	{ datetime: new Date("2020-06-15 12:30:21"), hours: 1, result: new Date("2020-06-15 13:30:21") },
	{ datetime: new Date("2020-06-15 12:30:21"), hours: 1, result: new Date("2020-06-15T04:30:21.000Z") },
	{ datetime: new Date("2020-12-31 23:59:59"), hours: 1, result: new Date("2021-01-01 00:59:59") },
	{ datetime: new Date("2020-12-31 23:59:59"), hours: 1, result: new Date("2020-12-31T15:59:59.000Z") },
	{ datetime: new Date("2020-01-01 00:00:00"), hours: 9, result: new Date("2020-01-01 09:00:00.000") },
	{ datetime: new Date("2020-01-01 00:00:00"), hours: 9, result: new Date("2020-01-01T00:00:00.000Z") },
	{ datetime: new Date("2020-06-15 12:30:21"), hours: 9, result: new Date("2020-06-15 21:30:21") },
	{ datetime: new Date("2020-06-15 12:30:21"), hours: 9, result: new Date("2020-06-15T12:30:21.000Z") },
	{ datetime: new Date("2020-12-31 23:59:59"), hours: 9, result: new Date("2021-01-01 08:59:59") },
	{ datetime: new Date("2020-12-31 23:59:59"), hours: 9, result: new Date("2020-12-31T23:59:59.000Z") },
];

describe("addDateTime test", () => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	testDaysDataList.forEach((i) => {
		test(`addDays ${i.datetime}`, () => {
			expect(addDays(i.datetime, i.days)).toStrictEqual(i.result);
		});
	});
	// biome-ignore lint/complexity/noForEach: <explanation>
	testHoursDataList.forEach((j) => {
		test(`addHours ${j.datetime}`, () => {
			expect(addHours(j.datetime, j.hours)).toStrictEqual(j.result);
		});
	});
});
