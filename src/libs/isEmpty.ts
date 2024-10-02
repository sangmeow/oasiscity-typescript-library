/* eslint-disable  @typescript-eslint/no-explicit-any */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isEmpty = (value: any): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string" && value.trim() === "") return true;
	if (Array.isArray(value) && value.length === 0) return true;
	if (typeof value === "object" && Object.keys(value).length === 0) return true;
	return false;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNotEmpty = (value: any): boolean => {
	if (value === null || value === undefined) return false;
	if (typeof value === "string" && value.trim() === "") return false;
	if (Array.isArray(value) && value.length === 0) return false;
	if (typeof value === "object" && Object.keys(value).length === 0) return false;
	return true;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setZeroIfEmpty = (value: any): number | typeof value => {
	if (value === null || value === undefined) return 0;
	if (typeof value === "string" && value.trim() === "") return 0;
	if (Array.isArray(value) && value.length === 0) return 0;
	if (typeof value === "object" && Object.keys(value).length === 0) return 0;
	return value;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setOneIfEmpty = (value: any): number | typeof value => {
	if (value === null || value === undefined) return 1;
	if (typeof value === "string" && value.trim() === "") return 1;
	if (Array.isArray(value) && value.length === 0) return 1;
	if (typeof value === "object" && Object.keys(value).length === 0) return 1;
	return value;
};
