/**
 * Returns true is date string is valid date
 * @param dateString
 * @returns true is date string is valid date
 *
 * Date formate : [YYYY-MM-DD,YYYY_MM_dd,YYYY.MM.dd,YYYY/MM/dd,]
 */
declare const isValidDate: (dateString: string) => boolean;
/**
 * Returns true is time string is valid time
 * @param timeString
 * @returns
 *
 * Time format : [HH:MM:SS,HH:MM:SSS]
 */
declare const isValidTime: (timeString: string) => boolean;
/**
 * Returns is YYYY-MM-DD HH:MM:SS format
 *
 * @param datetime - string format to validate
 * @returns true if string format is YYYY-MM-DD HH:MM:SS format
 *
 * Parameter value must be string.
 */
declare const isVaidDatetime: (datetime: string) => boolean;

export { isVaidDatetime, isValidDate, isValidTime };
