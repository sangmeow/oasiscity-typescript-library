/**
 * Configuration options for URL query parameter cleaning
 */
interface CleanUrlOptions {
    /** Remove parameters with null-like values (default: true) */
    removeNull?: boolean;
    /** Remove parameters with undefined-like values (default: true) */
    removeUndefined?: boolean;
    /** Remove parameters with empty string values (default: true) */
    removeEmptyStrings?: boolean;
    /** Remove parameters with whitespace-only values (default: true) */
    removeWhitespaceOnly?: boolean;
    /** Remove parameters with zero values (default: false) */
    removeZeros?: boolean;
    /** Remove parameters with false values (default: false) */
    removeFalse?: boolean;
    /** Custom predicate to determine if a parameter should be removed */
    customPredicate?: (key: string, value: string) => boolean;
    /** Specific parameter names to remove regardless of value */
    removeKeys?: string[];
    /** Specific parameter names to keep regardless of value */
    preserveKeys?: string[];
    /** Whether to decode URI components before checking (default: true) */
    decodeValues?: boolean;
    /** Whether to sort parameters alphabetically (default: false) */
    sortParameters?: boolean;
}
/**
 * Result of URL parsing and validation
 */
interface UrlParseResult {
    /** Whether the URL is valid */
    isValid: boolean;
    /** The parsed URL object (null if invalid) */
    url: URL | null;
    /** Error message if URL is invalid */
    error?: string;
    /** The base URL without query parameters */
    baseUrl?: string;
    /** Query parameters as object */
    params?: Record<string, string>;
}
/**
 * Safely parses a URL string and returns detailed information
 *
 * @param urlString - URL string to parse
 * @param baseUrl - Base URL to use for relative URLs
 * @returns Detailed parsing result
 *
 * @example
 * parseUrl('https://example.com/path?a=1&b=2')
 * // { isValid: true, url: URL {...}, baseUrl: 'https://example.com/path', params: { a: '1', b: '2' } }
 */
export declare const parseUrl: (urlString: string, baseUrl?: string) => UrlParseResult;
/**
 * Removes empty or unwanted query parameters from a URL
 * Enhanced version of the original removeEmptyUrlQueryParams function
 *
 * @param urlString - URL string to clean
 * @param options - Configuration options for cleaning behavior
 * @returns Cleaned URL string
 *
 * @example
 * // Basic usage (removes empty strings and whitespace-only values)
 * cleanUrlQueryParams('https://example.com?a=1&b=&c=  &d=test')
 * // Result: 'https://example.com?a=1&d=test'
 *
 * // Custom options
 * cleanUrlQueryParams(
 *   'https://example.com?a=0&b=false&c=null&d=test',
 *   { removeZeros: true, removeFalse: true, removeNull: true }
 * )
 * // Result: 'https://example.com?d=test'
 *
 * // Remove specific keys
 * cleanUrlQueryParams(
 *   'https://example.com?debug=1&temp=data&id=123',
 *   { removeKeys: ['debug', 'temp'] }
 * )
 * // Result: 'https://example.com?id=123'
 */
export declare const cleanUrlQueryParams: (urlString: string, options?: CleanUrlOptions) => string;
/**
 * Adds or updates query parameters in a URL
 *
 * @param urlString - Base URL string
 * @param params - Parameters to add/update
 * @param options - Additional options
 * @returns URL with updated parameters
 *
 * @example
 * addQueryParams('https://example.com?a=1', { b: '2', c: '3' })
 * // Result: 'https://example.com?a=1&b=2&c=3'
 *
 * addQueryParams('https://example.com?a=1', { a: '2' }) // Updates existing
 * // Result: 'https://example.com?a=2'
 */
export declare const addQueryParams: (urlString: string, params: Record<string, string | number | boolean>, options?: Pick<CleanUrlOptions, "sortParameters">) => string;
/**
 * Removes specific query parameters from a URL
 *
 * @param urlString - URL string to modify
 * @param keysToRemove - Array of parameter names to remove
 * @returns URL with specified parameters removed
 *
 * @example
 * removeQueryParams('https://example.com?a=1&b=2&c=3', ['b', 'c'])
 * // Result: 'https://example.com?a=1'
 */
export declare const removeQueryParams: (urlString: string, keysToRemove: string[]) => string;
/**
 * Extracts query parameters as a typed object
 *
 * @param urlString - URL string to parse
 * @returns Object containing query parameters
 *
 * @example
 * getQueryParams('https://example.com?name=John&age=30&active=true')
 * // Result: { name: 'John', age: '30', active: 'true' }
 */
export declare const getQueryParams: (urlString: string) => Record<string, string>;
/**
 * Gets a specific query parameter value
 *
 * @param urlString - URL string to parse
 * @param paramName - Name of the parameter to get
 * @param defaultValue - Default value if parameter not found
 * @returns Parameter value or default
 *
 * @example
 * getQueryParam('https://example.com?name=John&age=30', 'name') // 'John'
 * getQueryParam('https://example.com?name=John', 'email', 'unknown') // 'unknown'
 */
export declare const getQueryParam: (urlString: string, paramName: string, defaultValue?: string) => string;
/**
 * Checks if a URL has specific query parameters
 *
 * @param urlString - URL string to check
 * @param paramNames - Parameter names to check for
 * @returns true if all specified parameters exist
 *
 * @example
 * hasQueryParams('https://example.com?a=1&b=2', ['a', 'b']) // true
 * hasQueryParams('https://example.com?a=1', ['a', 'b']) // false
 */
export declare const hasQueryParams: (urlString: string, paramNames: string[]) => boolean;
/**
 * Merges query parameters from multiple URLs
 *
 * @param urls - Array of URL strings to merge parameters from
 * @param conflictResolution - How to handle parameter conflicts ('first', 'last', 'combine')
 * @returns Object with merged parameters
 *
 * @example
 * mergeQueryParams([
 *   'https://example.com?a=1&b=2',
 *   'https://other.com?b=3&c=4'
 * ], 'last')
 * // Result: { a: '1', b: '3', c: '4' }
 */
export declare const mergeQueryParams: (urls: string[], conflictResolution?: "first" | "last" | "combine") => Record<string, string>;
/**
 * Validates URL format and structure
 *
 * @param urlString - URL string to validate
 * @param options - Validation options
 * @returns Validation result with details
 *
 * @example
 * validateUrl('https://example.com/path?param=value')
 * // Result: { isValid: true, errors: [], normalizedUrl: '...' }
 */
export declare const validateUrl: (urlString: string, options?: {
    requireHttps?: boolean;
    allowedDomains?: string[];
    maxQueryParams?: number;
}) => {
    isValid: boolean;
    errors: string[];
    normalizedUrl?: string;
};
/**
 * Normalizes a URL by cleaning parameters and applying consistent formatting
 *
 * @param urlString - URL string to normalize
 * @param options - Normalization options
 * @returns Normalized URL string
 *
 * @example
 * normalizeUrl('HTTPS://EXAMPLE.COM/Path?b=2&a=1&empty=')
 * // Result: 'https://example.com/Path?a=1&b=2'
 */
export declare const normalizeUrl: (urlString: string, options?: CleanUrlOptions & {
    lowercaseHostname?: boolean;
    sortParameters?: boolean;
}) => string;
export {};
//# sourceMappingURL=removeEmptyQueryValues.d.ts.map