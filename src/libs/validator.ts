import type { dataTypes } from "../interface/Json.interface";

export const isObjectEmpty = (data: dataTypes, key: string): boolean => {
	// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
	if (!data?.hasOwnProperty(key)) return true;
	return isEmpty(data[key]);
};

export const isEmpty = (value: dataTypes): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string" && value.trim() === "") return true;
	if (Array.isArray(value) && value.length === 0) return true;
	if (typeof value === "object" && Object.keys(value).length === 0) return true;
	return false;
};

export const isNotEmpty = (value: dataTypes): boolean => {
	if (value === null || value === undefined) return false;
	if (typeof value === "string" && value.trim() === "") return false;
	if (Array.isArray(value) && value.length === 0) return false;
	if (typeof value === "object" && Object.keys(value).length === 0) return false;
	return true;
};

export const isNumericOnly = (value: string): boolean => {
	return /^\d+$/.test(value);
};

export const isAlphabeticOnly = (value: string): boolean => {
	return /^[a-zA-Z]+$/.test(value);
};

export const isNumAlphabeticOnly = (value: string): boolean => {
	return /^[a-zA-Z0-9]+$/.test(value);
};
