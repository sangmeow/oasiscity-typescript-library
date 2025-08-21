/**
 * Options for string replacement functions
 */
interface StringReplaceOptions {
    /** Starting position for replacement (default: 0) */
    startPosition?: number;
    /** Whether to pad with original characters if replacement is shorter (default: true) */
    padWithOriginal?: boolean;
    /** Character to use for padding if replacement is longer (default: truncate) */
    paddingChar?: string;
}
/**
 * Replaces characters in a string starting from a specific position
 * Enhanced version of the original bindString function
 *
 * @param sourceString - The original string to modify
 * @param replacementString - The string to insert/replace with
 * @param options - Additional options for replacement
 * @returns Modified string with replacement applied
 *
 * @example
 * bindString('19700101232221', '20201212') // '20201212232221'
 * bindString('abcdefgh', 'XYZ', { startPosition: 2 }) // 'abXYZfgh'
 * bindString('abc', 'WXYZ', { paddingChar: '0' }) // 'WXYZ'
 */
export declare const bindString: (sourceString: string, replacementString: string, options?: StringReplaceOptions) => string;
/**
 * Inserts a string at a specific position without replacing existing characters
 *
 * @param sourceString - The original string
 * @param insertString - The string to insert
 * @param position - Position to insert at (default: 0)
 * @returns String with inserted content
 *
 * @example
 * insertString('Hello World', 'Beautiful ', 6) // 'Hello Beautiful World'
 * insertString('abc', 'XYZ', 1) // 'aXYZbc'
 */
export declare const insertString: (sourceString: string, insertString: string, position?: number) => string;
/**
 * Replaces a substring with another string
 *
 * @param sourceString - The original string
 * @param searchString - The substring to find and replace
 * @param replacementString - The replacement string
 * @param replaceAll - Whether to replace all occurrences (default: false)
 * @returns String with replacements applied
 *
 * @example
 * replaceSubstring('hello world hello', 'hello', 'hi') // 'hi world hello'
 * replaceSubstring('hello world hello', 'hello', 'hi', true) // 'hi world hi'
 */
export declare const replaceSubstring: (sourceString: string, searchString: string, replacementString: string, replaceAll?: boolean) => string;
/**
 * Masks characters in a string, typically for sensitive data
 *
 * @param inputString - The string to mask
 * @param maskChar - Character to use for masking (default: '*')
 * @param visibleStart - Number of characters to keep visible at start (default: 0)
 * @param visibleEnd - Number of characters to keep visible at end (default: 0)
 * @returns Masked string
 *
 * @example
 * maskString('1234567890', '*', 2, 2) // '12******90'
 * maskString('john@email.com', 'X', 1, 4) // 'jXXXXX.com'
 */
export declare const maskString: (inputString: string, maskChar?: string, visibleStart?: number, visibleEnd?: number) => string;
/**
 * Pads a string to a specific length with a specified character
 *
 * @param inputString - The string to pad
 * @param targetLength - Target length for the string
 * @param padChar - Character to use for padding (default: ' ')
 * @param padStart - Whether to pad at start (true) or end (false, default)
 * @returns Padded string
 *
 * @example
 * padString('123', 6, '0', true) // '000123'
 * padString('hello', 10, '.', false) // 'hello.....'
 */
export declare const padString: (inputString: string, targetLength: number, padChar?: string, padStart?: boolean) => string;
/**
 * Truncates a string to a maximum length with optional ellipsis
 *
 * @param inputString - The string to truncate
 * @param maxLength - Maximum length of the result
 * @param ellipsis - String to append when truncated (default: '...')
 * @param truncateAtWord - Whether to truncate at word boundaries (default: false)
 * @returns Truncated string
 *
 * @example
 * truncateString('This is a long sentence', 10) // 'This is...'
 * truncateString('This is a long sentence', 10, '...', true) // 'This is...'
 */
export declare const truncateString: (inputString: string, maxLength: number, ellipsis?: string, truncateAtWord?: boolean) => string;
export {};
//# sourceMappingURL=string.d.ts.map