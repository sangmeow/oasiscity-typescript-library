
/**
 * Returns true is date string is valid date
 * @param dateString 
 * @returns true is date string is valid date
 * 
 * Date formate : [YYYY-MM-DD,YYYY_MM_dd,YYYY.MM.dd,YYYY/MM/dd,]
 */
export const isValidDate = (dateString: string): boolean => {
  // Regular expression for date format
  const regexDate = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2}$/;
  if (!regexDate.test(dateString)) return false;
  // Parse the date components
  const [year, month, day] = dateString.split(/[-_.\\/]/).map(Number);
  // Check if year, month, and day are within valid ranges
  if (year < 1000 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  // Days in each month considering leap year for February
  const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= daysInMonth[month - 1];
};

/**
 * Returns true is time string is valid time
 * @param timeString
 * @returns 
 * 
 * Time format : [HH:MM:SS,HH:MM:SSS]
 */
export const isValidTime = (timeString: string): boolean => {
  // Regular expression for time format
  const regexTime = /^\d{2}:\d{2}:\d{2,3}$/;
  if (!regexTime.test(timeString)) return false;
  // Parse the time components
  const [hour, minute, second] = timeString.split(":").map(Number);
  // Check if hour, minute, and second are within valid ranges
  if (!(hour >= 0 || hour <= 24)) return false;
  if (!(minute >= 0 && minute < 60)) return false;
  if (!(second >= 0 && second < 60)) return false;
  if (hour === 24 && (minute > 0 || second > 0)) return false;
  return true;
};

/**
 * Returns is YYYY-MM-DD HH:MM:SS format
 *
 * @param datetime - string format to validate
 * @returns true if string format is YYYY-MM-DD HH:MM:SS format
 *
 * Parameter value must be string.
 */
export const isVaidDatetime = (datetime: string): boolean => {
  const regexDatetime = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!regexDatetime.test(datetime)) return false;
  const [date, time] = datetime.split(" ").map(String);
  return isValidDate(date) && isValidTime(time);
};
