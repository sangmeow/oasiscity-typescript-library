/* eslint-disable  @typescript-eslint/no-explicit-any */

import { isNotEmpty } from "./isEmpty";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isEqualString = (input: any, target: string): boolean => {
	return typeof input === "string" && input === target;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isEqualNumber = (input: any, target: number): boolean => {
	return typeof input === "number" && input === target;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNotEqualString = (input: any, target: string): boolean => {
	return typeof input !== "string" || input !== target;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNotEqualNumber = (input: any, target: number): boolean => {
	return typeof input !== "number" || input !== target;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isEqual = (input: any, target: any): boolean => {
	return isNotEmpty(input) && typeof input === typeof target && input === target;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isString = (value: any): boolean => {
	return typeof value === "string";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNumber = (value: any): boolean => {
	return typeof value === "number";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isBoolean = (value: any): boolean => {
	return typeof value === "boolean";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isNull = (value: any): boolean => {
	return value === null;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isUndefined = (value: any): boolean => {
	return value === undefined;
};
