import { dataTypes } from '../interface/Json.interface.js';

declare const isObjectEmpty: (data: dataTypes, key: string) => boolean;
declare const isNumericOnly: (value: string) => boolean;
declare const isAlphabeticOnly: (value: string) => boolean;
declare const isNumAlphabeticOnly: (value: string) => boolean;

export { isAlphabeticOnly, isNumAlphabeticOnly, isNumericOnly, isObjectEmpty };
