import type { dataTypes } from "../interface/Json.interface";
import { isEmpty } from "./isEmpty";

export const isObjectEmpty = (data: dataTypes, key: string): boolean => {
	// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
	if (!data?.hasOwnProperty(key)) return true;
	return isEmpty(data[key]);
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
