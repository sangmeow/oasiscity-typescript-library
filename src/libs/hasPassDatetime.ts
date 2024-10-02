import { isValidDate, isVaidDatetime } from "./isDatetimeString";

/**
 * Has datetime passed
 * @param datetime
 * @returns true if time passed or invalid
 *
 * It depends on time at server.
 */
export const hasPassDatetime = (datetime: string): boolean => {
	if (!(isValidDate(datetime) || isVaidDatetime(datetime))) return true;
	return new Date(datetime) <= new Date();
};
