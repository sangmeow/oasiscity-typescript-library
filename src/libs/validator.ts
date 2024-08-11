import type { variables } from "../interface/Json.interface";

export const isObjectEmpty = (data: variables, key: string): boolean => {
	// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
	if (!data?.hasOwnProperty(key)) return true;
	return isEmpty(data[key]);
};

export const isEmpty = (value: variables): boolean => {
	if (value === null || value === undefined) return true;
	if (typeof value === "string" && value.trim() === "") return true;
	if (Array.isArray(value) && value.length === 0) return true;
	if (typeof value === "object" && Object.keys(value).length === 0) return true;
	return false;
};

export const isNotEmpty = (value: variables): boolean => {
	if (value === null || value === undefined) return false;
	if (typeof value === "string" && value.trim() === "") return false;
	if (Array.isArray(value) && value.length === 0) return false;
	if (typeof value === "object" && Object.keys(value).length === 0) return false;
	return true;
};
