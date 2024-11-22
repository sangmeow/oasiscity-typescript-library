/**
 * Removes keys with null, undefined, or empty string values from url string.
 * @param url string
 * @returns url string with empty string values removed
 */
declare const removeEmptyUrlQueryParams: (url: string) => string;
declare const removeEmptyStringQueryParams: (url: string) => string;

export { removeEmptyStringQueryParams, removeEmptyUrlQueryParams };
