import { isValidDate, isValidTime } from "./isDatetimeString";

const testDateTrueList = ["2024-01-01", "2024_01_01", "2024.01.01", "2024/01/01", "2024-01-01", "2024_02_29", "2024.08.31", "2024/12/31"];
const testDateFalesList = ["2024-1-1", "2024_1_01", "2024.01.1", "2024/012/031", "2024-04-31", "2024_02_30", "2024.09.31", "2024/12/32"];

const testTimeTrueList = ["00:00:00", "23:59:59", "11:59:59", "13:00:00"];
const testTimeFalesList = ["000000", "24:00:01", "00:61:00", "00:00:61", "24:59:59", "23:60:59", "23:59:60"];

describe("json test", () => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	testDateTrueList.forEach((i) => {
		test(`isValidTest TRUE ${i}`, () => {
			expect(isValidDate(i)).toBe(true);
		});
	});
	// biome-ignore lint/complexity/noForEach: <explanation>
	testDateFalesList.forEach((j) => {
		test(`isValidTest FALSE ${j}`, () => {
			expect(isValidDate(j)).toBe(false);
		});
	});
	// biome-ignore lint/complexity/noForEach: <explanation>
	testTimeTrueList.forEach((x) => {
		test(`isValidTime TRUE ${x}`, () => {
			expect(isValidTime(x)).toBe(true);
		});
	});
	// biome-ignore lint/complexity/noForEach: <explanation>
	testTimeFalesList.forEach((y) => {
		test(`isValidTime False ${y}`, () => {
			expect(isValidTime(y)).toBe(false);
		});
	});
});
