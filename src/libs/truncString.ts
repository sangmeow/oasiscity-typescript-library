/**
 * Truncates or pads a string to a specified length.
 * 
 * @param str - The input string to process
 * @param length - The target length. If undefined/0, returns original string.
 *                 If negative, removes characters from the end.
 *                 If positive, truncates or pads to reach target length.
 * @param padString - The string used for padding when the input is shorter than target length.
 *                    Defaults to '_'. Cannot be empty or null/undefined.
 * @returns The processed string (truncated or padded)
 * 
 * @throws {Error} When str is not a string
 * @throws {Error} When length is provided but not a number
 * @throws {Error} When padString is not a valid non-empty string
 * 
 * @example
 * // Truncate a long string
 * truncString("Hello World", 5) // Returns "Hello"
 * 
 * @example
 * // Pad a short string
 * truncString("Hi", 5, "*") // Returns "Hi***"
 * 
 * @example
 * // Remove characters from end
 * truncString("Hello", -2) // Returns "Hel"
 */
export const truncString = (str: string, length?: number, padString: string = '_'): string => {
  // Input validation - ensure first parameter is a string
  if (typeof str !== 'string') {
    throw new Error('First parameter must be a string.');
  }
  
  // Validate length parameter if provided
  if (length !== undefined && typeof length !== 'number') {
    throw new Error('Length must be a number.');
  }

  // Debug log for padding string (consider removing in production)
  console.log(padString);
  
  // Validate padding string - must be non-empty string
  if (typeof padString !== 'string' || padString.length === 0 || padString === undefined as any || padString === null) {
    throw new Error('Padding string must be a string. It cannot be an empty string.');
  }
  
  // Additional check for empty string (redundant but explicit)
  if (padString === '') {
    throw new Error('Padding string cannot be an empty string.');
  }
  
  // Return original string if length is undefined or 0
  if (length === undefined || length === 0) {
    return str;
  }
  
  // Handle negative length - remove characters from the end
  if (length < 0) {
    const absLength = Math.abs(length);
    // If removal length exceeds string length, return empty string
    if (absLength >= str.length) {
      return '';
    }
    // Remove specified number of characters from the end
    return str.slice(0, str.length - absLength);
  }
  
  // Handle positive length cases
  if (str.length > length) {
    // Truncate string if it's longer than target length
    return str.slice(0, length);
  } else if (str.length < length) {
    // Pad string if it's shorter than target length
    const paddingNeeded = length - str.length;
    // Repeat padding string enough times to cover needed length
    const fullPadding = padString.repeat(Math.ceil(paddingNeeded / padString.length));
    // Trim padding to exact needed length and append to original string
    return str + fullPadding.slice(0, paddingNeeded);
  } else {
    // Return as-is if length matches exactly
    return str;
  }
};