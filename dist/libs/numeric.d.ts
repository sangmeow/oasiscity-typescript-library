/**
 * Options for character extraction functions
 */
interface CharacterExtractionOptions {
    /** Whether to preserve order of characters (default: true) */
    preserveOrder?: boolean;
    /** Whether to remove duplicates (default: false) */
    removeDuplicates?: boolean;
    /** Maximum number of characters to return (default: unlimited) */
    maxLength?: number;
}
/**
 * Extracts numeric characters from a string
 *
 * @param inputString - The input string to process
 * @param options - Additional options for extraction
 * @returns String containing only numeric characters (0-9)
 *
 * @example
 * getNumericCharacters('a1b2c3d4') // '1234'
 * getNumericCharacters('price: $29.99') // '2999'
 * getNumericCharacters('abc123def456', { maxLength: 3 }) // '123'
 * getNumericCharacters('112233', { removeDuplicates: true }) // '123'
 */
declare const getNumericCharacters: (inputString: string, options?: CharacterExtractionOptions) => string;
/**
 * Extracts alphanumeric characters from a string
 *
 * @param inputString - The input string to process
 * @param options - Additional options for extraction
 * @returns String containing only alphanumeric characters
 *
 * @example
 * getAlphanumericCharacters('Hello@123#World!') // 'Hello123World'
 */
declare const getAlphanumericCharacters: (inputString: string, options?: CharacterExtractionOptions) => string;

export { getAlphanumericCharacters, getNumericCharacters };
