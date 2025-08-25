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
declare const truncString: (str: string, length?: number, padString?: string) => string;

export { truncString };
