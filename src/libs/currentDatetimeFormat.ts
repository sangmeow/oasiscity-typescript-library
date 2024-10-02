/**
 * Get current datetime string value
 *
 * @param datetime - string format to validate
 * @param start - set start time if true
 * @returns YYYY-MM-DD HH:MM:SS format or false if validation error
 *
 * Parameter value must be date.
 * const now = currentDatetimeFormat(new Date());
 */
export const currentDatetimeFormat = (date: Date = new Date()): string => {
	const now = new Date(date);
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	//const milliseconds = String(now.getMilliseconds());
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Add days
 * @param date
 * @param days
 * @returns
 */
export const addDays = (date: Date = new Date(), days = 0): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

/**
 * Add hours
 */
export const addHours = (date: Date = new Date(), hours = 0): Date => {
	const result = new Date(date);
	result.setHours(result.getHours() + hours);
	return result;
};
