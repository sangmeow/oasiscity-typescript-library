import { JSONObject } from '../interface/Json.interface.js';

/**
 * Removes keys with null, undefined, or empty string values from a JSON object.
 * @param obj
 * @returns
 */
declare const removeEmptyBodyValues: (obj: JSONObject | null) => JSONObject;
declare const removeEmptyNestedBodyValues: (obj: JSONObject | null) => JSONObject;

export { removeEmptyBodyValues, removeEmptyNestedBodyValues };
