"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUrl = exports.validateUrl = exports.mergeQueryParams = exports.hasQueryParams = exports.getQueryParam = exports.getQueryParams = exports.removeQueryParams = exports.addQueryParams = exports.cleanUrlQueryParams = exports.parseUrl = void 0;
// =============================================================================
// Core URL Query Parameter Functions
// =============================================================================
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
const parseUrl = (urlString, baseUrl) => {
    try {
        if (typeof urlString !== 'string') {
            return {
                isValid: false,
                url: null,
                error: 'URL must be a string'
            };
        }
        const trimmedUrl = urlString.trim();
        if (!trimmedUrl) {
            return {
                isValid: false,
                url: null,
                error: 'URL cannot be empty'
            };
        }
        let url;
        try {
            url = new URL(trimmedUrl, baseUrl);
        }
        catch (e) {
            // Try to handle URLs without protocol
            if (!trimmedUrl.includes('://') && !trimmedUrl.startsWith('//')) {
                url = new URL(`http://${trimmedUrl}`, baseUrl);
            }
            else {
                throw e;
            }
        }
        const params = {};
        for (const [key, value] of url.searchParams.entries()) {
            params[key] = value;
        }
        return {
            isValid: true,
            url,
            baseUrl: `${url.origin}${url.pathname}`,
            params
        };
    }
    catch (error) {
        return {
            isValid: false,
            url: null,
            error: error instanceof Error ? error.message : 'Invalid URL'
        };
    }
};
exports.parseUrl = parseUrl;
/**
 * Determines if a query parameter value should be removed based on options
 */
const shouldRemoveParameter = (key, value, options) => {
    const { removeNull = true, removeUndefined = true, removeEmptyStrings = true, removeWhitespaceOnly = true, removeZeros = false, removeFalse = false, customPredicate, removeKeys = [], preserveKeys = [], decodeValues = true } = options;
    // Preserve specific keys
    if (preserveKeys.includes(key)) {
        return false;
    }
    // Remove specific keys
    if (removeKeys.includes(key)) {
        return true;
    }
    // Custom predicate takes precedence
    if (customPredicate && customPredicate(key, value)) {
        return true;
    }
    const processedValue = decodeValues ? decodeURIComponent(value) : value;
    // Check for null-like values
    if (removeNull && (processedValue === 'null' || processedValue === 'NULL')) {
        return true;
    }
    // Check for undefined-like values
    if (removeUndefined && (processedValue === 'undefined' || processedValue === 'UNDEFINED')) {
        return true;
    }
    // Check for empty strings
    if (removeEmptyStrings && processedValue === '') {
        return true;
    }
    // Check for whitespace-only values
    if (removeWhitespaceOnly && processedValue.trim() === '') {
        return true;
    }
    // Check for zeros
    if (removeZeros && (processedValue === '0' || processedValue === '0.0')) {
        return true;
    }
    // Check for false values
    if (removeFalse && (processedValue.toLowerCase() === 'false')) {
        return true;
    }
    return false;
};
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
const cleanUrlQueryParams = (urlString, options = {}) => {
    const parseResult = (0, exports.parseUrl)(urlString);
    if (!parseResult.isValid || !parseResult.url) {
        throw new Error(`Invalid URL: ${parseResult.error || 'Unknown error'}`);
    }
    const { url } = parseResult;
    const { sortParameters = false } = options;
    // Create new URLSearchParams to rebuild query string
    const cleanParams = new URLSearchParams();
    // Process existing parameters
    const entries = Array.from(url.searchParams.entries());
    for (const [key, value] of entries) {
        if (!shouldRemoveParameter(key, value, options)) {
            cleanParams.append(key, value);
        }
    }
    // Sort parameters if requested
    if (sortParameters) {
        const sortedEntries = Array.from(cleanParams.entries()).sort(([a], [b]) => a.localeCompare(b));
        cleanParams.forEach((_, key) => cleanParams.delete(key));
        sortedEntries.forEach(([key, value]) => cleanParams.append(key, value));
    }
    // Rebuild URL
    url.search = cleanParams.toString();
    return url.toString();
};
exports.cleanUrlQueryParams = cleanUrlQueryParams;
// =============================================================================
// Advanced URL Manipulation Functions
// =============================================================================
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
const addQueryParams = (urlString, params, options = {}) => {
    const parseResult = (0, exports.parseUrl)(urlString);
    if (!parseResult.isValid || !parseResult.url) {
        throw new Error(`Invalid URL: ${parseResult.error || 'Unknown error'}`);
    }
    const { url } = parseResult;
    const { sortParameters = false } = options;
    // Add/update parameters
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
    });
    // Sort if requested
    if (sortParameters) {
        const entries = Array.from(url.searchParams.entries()).sort(([a], [b]) => a.localeCompare(b));
        url.search = new URLSearchParams(entries).toString();
    }
    return url.toString();
};
exports.addQueryParams = addQueryParams;
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
const removeQueryParams = (urlString, keysToRemove) => {
    return (0, exports.cleanUrlQueryParams)(urlString, {
        removeKeys: keysToRemove,
        removeEmptyStrings: false // Only remove specified keys
    });
};
exports.removeQueryParams = removeQueryParams;
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
const getQueryParams = (urlString) => {
    const parseResult = (0, exports.parseUrl)(urlString);
    return parseResult.params || {};
};
exports.getQueryParams = getQueryParams;
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
const getQueryParam = (urlString, paramName, defaultValue = '') => {
    var _a;
    const params = (0, exports.getQueryParams)(urlString);
    return (_a = params[paramName]) !== null && _a !== void 0 ? _a : defaultValue;
};
exports.getQueryParam = getQueryParam;
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
const hasQueryParams = (urlString, paramNames) => {
    const params = (0, exports.getQueryParams)(urlString);
    return paramNames.every(name => name in params);
};
exports.hasQueryParams = hasQueryParams;
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
const mergeQueryParams = (urls, conflictResolution = 'last') => {
    const merged = {};
    for (const url of urls) {
        const params = (0, exports.getQueryParams)(url);
        Object.entries(params).forEach(([key, value]) => {
            if (key in merged) {
                switch (conflictResolution) {
                    case 'first':
                        // Keep existing value
                        break;
                    case 'last':
                        merged[key] = value;
                        break;
                    case 'combine':
                        merged[key] = `${merged[key]},${value}`;
                        break;
                }
            }
            else {
                merged[key] = value;
            }
        });
    }
    return merged;
};
exports.mergeQueryParams = mergeQueryParams;
// =============================================================================
// Utility Functions
// =============================================================================
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
const validateUrl = (urlString, options = {}) => {
    const errors = [];
    const parseResult = (0, exports.parseUrl)(urlString);
    if (!parseResult.isValid) {
        errors.push(parseResult.error || 'Invalid URL format');
        return { isValid: false, errors };
    }
    const { url, params } = parseResult;
    const { requireHttps = false, allowedDomains = [], maxQueryParams } = options;
    // Check protocol
    if (requireHttps && url.protocol !== 'https:') {
        errors.push('HTTPS protocol required');
    }
    // Check domain
    if (allowedDomains.length > 0 && !allowedDomains.includes(url.hostname)) {
        errors.push(`Domain '${url.hostname}' not in allowed list`);
    }
    // Check query parameter count
    if (maxQueryParams !== undefined && Object.keys(params).length > maxQueryParams) {
        errors.push(`Too many query parameters (max: ${maxQueryParams})`);
    }
    return {
        isValid: errors.length === 0,
        errors,
        normalizedUrl: errors.length === 0 ? url.toString() : undefined
    };
};
exports.validateUrl = validateUrl;
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
const normalizeUrl = (urlString, options = {}) => {
    const { lowercaseHostname = true, sortParameters = true } = options, cleanOptions = __rest(options, ["lowercaseHostname", "sortParameters"]);
    // First clean the parameters
    let normalized = (0, exports.cleanUrlQueryParams)(urlString, Object.assign(Object.assign({}, cleanOptions), { sortParameters }));
    // Normalize hostname case
    if (lowercaseHostname) {
        const parseResult = (0, exports.parseUrl)(normalized);
        if (parseResult.isValid && parseResult.url) {
            parseResult.url.hostname = parseResult.url.hostname.toLowerCase();
            normalized = parseResult.url.toString();
        }
    }
    return normalized;
};
exports.normalizeUrl = normalizeUrl;
//# sourceMappingURL=removeEmptyQueryValues.js.map