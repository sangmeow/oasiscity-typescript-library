/**
 * Generates a unique concurrent value based on the current UTC time.
 * 
 * @description 
 * This function converts the current UTC time to a string in YYYYMMDDHHMMSS_sss format.
 * Even when executed concurrently, it can generate unique values by distinguishing them 
 * at the millisecond level.
 * 
 * @returns {string} UTC-based time string (format: YYYYMMDDHHMMSS_sss)
 * @example
 * // August 23, 2025 14:30:45.123 UTC
 * getConcurrentValue(); // "20250823143045_123"
 * 
 * @since 1.0.0
 */
export const getConcurrentValue = (): string => {
    const now = new Date();
    
    // Extract UTC time components and format them appropriately
    const year: string = now.getUTCFullYear().toString();
    const month: string = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day: string = now.getUTCDate().toString().padStart(2, '0');
    const hours: string = now.getUTCHours().toString().padStart(2, '0');
    const minutes: string = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds: string = now.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds: string = now.getUTCMilliseconds().toString().padStart(3, '0'); // Pad 0-999 range to 3 digits
    
    // Generate date/time string in YYYYMMDDHHMMSS format
    const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;

    // Final format: YYYYMMDDHHMMSS_sss
    return `${dateTimeString}_${milliseconds}`;
};

export const getConcurrentDateTimeValue = (): string => {
    const now = new Date();
    
    // Extract UTC time components and format them appropriately
    const year: string = now.getUTCFullYear().toString();
    const month: string = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day: string = now.getUTCDate().toString().padStart(2, '0');
    const hours: string = now.getUTCHours().toString().padStart(2, '0');
    const minutes: string = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds: string = now.getUTCSeconds().toString().padStart(2, '0');
    
    // Generate date/time string in YYYYMMDDHHMMSS format
    const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;

    // Final format: YYYYMMDDHHMMSS
    return `${dateTimeString}`;
};

export const getConcurrentDateHourValue = (): string => {
    const now = new Date();
    
    // Extract UTC time components and format them appropriately
    const year: string = now.getUTCFullYear().toString();
    const month: string = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day: string = now.getUTCDate().toString().padStart(2, '0');
    const hours: string = now.getUTCHours().toString().padStart(2, '0');
    
    // Generate date/time string in YYYYMMDD-HH format
    const dateTimeString = `${year}${month}${day}_${hours}`;

    // Final format: YYYYMMDD
    return `${dateTimeString}`;
};

export const getConcurrentDateValue = (): string => {
    const now = new Date();
    
    // Extract UTC time components and format them appropriately
    const year: string = now.getUTCFullYear().toString();
    const month: string = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11, so add 1
    const day: string = now.getUTCDate().toString().padStart(2, '0');
    
    // Generate date/time string in YYYYMMDD format
    const dateTimeString = `${year}${month}${day}`;

    // Final format: YYYYMMDD
    return `${dateTimeString}`;
};
