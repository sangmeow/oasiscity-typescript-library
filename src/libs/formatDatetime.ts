import { isValidDate, isVaidDatetime } from "./isDatetimeString";

/**
 * Returns is YYYY-MM-DD HH:MM:SS format
 *
 * @param datetime - string format to validate
 * @param start - set start time if true
 * @returns YYYY-MM-DD HH:MM:SS format or false if validation error
 *
 * Parameter value must be string.
 */
export const formatDatetime = (datetime: string, start: boolean): boolean | string => {
	if (!(isValidDate(datetime) || isVaidDatetime(datetime))) return false;
	if (isValidDate(datetime)) return start ? `${datetime} 00:00:00` : `${datetime} 23:59:59`;
	return datetime;
};
