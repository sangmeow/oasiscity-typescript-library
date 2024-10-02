import { isNotEmpty } from "./isEmpty";
import type { JSONObject } from "../interface/Json.interface";

/**
 * Removes keys with null, undefined, or empty string values from a JSON object.
 * @param obj
 * @returns
 */
export const removeEmptyBodyValues = (obj: JSONObject | null): JSONObject => {
	const result: JSONObject = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			if (isNotEmpty(value)) {
				result[key] = typeof value === "object" && !Array.isArray(value) ? removeEmptyBodyValues(value) : value;
			}
		}
	}

	return result;
};
