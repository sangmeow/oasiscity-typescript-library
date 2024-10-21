/**
 * Get offset value in minutes from the server
 * @returns offset
 * e.g. -540
 */
export const getTimezoneOffset = (): number => {
	return new Date().getTimezoneOffset();
};

/**
 * Get offset value in hours from the server
 * @returns offset
 * e.g. -9
 */
export const getTimezoneOffsetHour = (): number => {
	return getTimezoneOffset() / 60;
};

/**
 * Get current datetime in Date type
 * @returns Date
 * e.g. 2024-10-14T02:40:38.140Z
 */
export const getDatetimeUtcDate = (): Date => {
	return new Date();
};

/**
 * Get current datetime in string type
 * @returns string
 * e.g. 2024-10-14T02:40:38.140Z
 */
export const getDatetimeUtcString = (): string => {
	return new Date().toISOString();
};

/**
 * Get current datetime in string type
 * @returns string
 * e.g. 2024-10-14 02:40:38.140
 */
export const getDatetimeString = (): string => {
	return new Date().toISOString().replace(/T/gi, " ").replace(/Z/gi, "");
};

function validateDateOrDateTime(input: string): boolean {
	// This pattern allows for an optional time part, making it suitable for both formats
	const pattern = /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2}:\d{2})?$/;
	return pattern.test(input);
}

/**
 * Validate datetime form
 * @param dateString
 * e.g.
 * YYYY
 * YYYY-MM
 * YYYY-MM-DD
 * YYYY-MM-DD HH
 * YYYY-MM-DD HH:MM
 * YYYY-MM-DD HH:MM:SS
 * YYYY-MM-DD HH:MM:SS.sss
 */
const validateDateTimeFormat = (dateString: string): boolean => {
	const regex: RegExp = /^\d{4}(?:-\d{2}(?:-\d{2}(?: \d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?)?)?)?$/;
	return regex.test(dateString);
};

/**
 * Validate ISO form
 * @param dateString
 * e.g YYYY-MM-DDTHH:MM:SS.sssZ
 */
const validateISODateFormat = (dateString: string): boolean => {
	// Regular expression to check for ISO 8601 date format
	const isoDateRegex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z|[+-]\d{2}:\d{2}$/;
	return isoDateRegex.test(dateString) && !Number.isNaN(new Date(dateString).getTime());
};

/**
 * Converts 14-digit numeric string to datetime format
 * @param dateString
 * e.g. input "19700101232221" -> "1970-01-01-23:22:21"
 */
const convertToISODatetime = (dateString: string): string => {
	const YYYY: string = dateString.substring(0, 4);
	const MM: string = dateString.substring(4, 6);
	const DD: string = dateString.substring(6, 8);
	const hh: string = dateString.substring(8, 10);
	const mm: string = dateString.substring(10, 12);
	const ss: string = dateString.substring(12, 14);
	return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}`;
};

/**
 * Get datetime UTC 0 value
 * @returns string
 * e.g. 2024-09-22 03:29:58 in Asia/Seoul
 */
export const setDatetimeUTCZero = (dateString: string = new Date().toISOString(), isStartDate = true): string | undefined => {
	const DATE_START_END = {
		start: { year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, datetime: "19700101000000" },
		end: { year: 2038, month: 12, day: 31, hour: 3, minute: 14, second: 7, millisecond: 0, datetime: "20381231235959" },
	};

	// Get 14-digit numeric string to datetime format
	const resultDate: string = convertToISODatetime(bindString(isStartDate ? DATE_START_END.start.datetime : DATE_START_END.end.datetime, getNumericCharacters(dateString)));

	// Set date
	const now: Date = new Date(resultDate);
	if (Number.isNaN(now.getTime())) return undefined;

	// Set UTC 0 and create date
	return now.toISOString().split(".")[0].replace(/T/gi, " ").replace(/Z/gi, ""); // isISOFormat
};
