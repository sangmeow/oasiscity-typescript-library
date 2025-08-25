"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createInstanceGuard: () => createInstanceGuard,
  deepCopy: () => deepCopy,
  deepCopyStrict: () => deepCopyStrict,
  getAlphanumericCharacters: () => getAlphanumericCharacters,
  getConcurrentDateHourValue: () => getConcurrentDateHourValue,
  getConcurrentDateTimeValue: () => getConcurrentDateTimeValue,
  getConcurrentDateValue: () => getConcurrentDateValue,
  getConcurrentValue: () => getConcurrentValue,
  getNumericCharacters: () => getNumericCharacters,
  hasMethod: () => hasMethod,
  hasProperty: () => hasProperty,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isDate: () => isDate,
  isDeepCopyable: () => isDeepCopyable,
  isDeepEqual: () => isDeepEqual,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isEqualBoolean: () => isEqualBoolean,
  isEqualNumber: () => isEqualNumber,
  isEqualString: () => isEqualString,
  isFiniteNumber: () => isFiniteNumber,
  isFunction: () => isFunction,
  isInRange: () => isInRange,
  isInteger: () => isInteger,
  isLooseEqual: () => isLooseEqual,
  isNotEmpty: () => isNotEmpty,
  isNotEmptyGuard: () => isNotEmptyGuard,
  isNotEqualNumber: () => isNotEqualNumber,
  isNotEqualString: () => isNotEqualString,
  isNull: () => isNull,
  isNullish: () => isNullish,
  isNumber: () => isNumber,
  isOneOf: () => isOneOf,
  isPlainObject: () => isPlainObject,
  isString: () => isString,
  isUndefined: () => isUndefined,
  isValidDate: () => isValidDate,
  isValidProbabilityInput: () => isValidProbabilityInput,
  lottery: () => lottery,
  matchesPattern: () => matchesPattern,
  parseDateTime: () => parseDateTime,
  setDefaultIfEmpty: () => setDefaultIfEmpty,
  setOneIfEmpty: () => setOneIfEmpty,
  setZeroIfEmpty: () => setZeroIfEmpty,
  truncString: () => truncString
});
module.exports = __toCommonJS(src_exports);

// src/libs/deepCopy.ts
var deepCopy = (target, visited) => {
  const visitedMap = visited != null ? visited : /* @__PURE__ */ new WeakMap();
  if (target === null || target === void 0) {
    return target;
  }
  const targetType = typeof target;
  if (targetType !== "object" && targetType !== "function") {
    return target;
  }
  if (targetType === "function") {
    return target;
  }
  const targetObj = target;
  if (visitedMap.has(targetObj)) {
    return visitedMap.get(targetObj);
  }
  if (target instanceof Date) {
    const dateCopy = new Date(target.getTime());
    visitedMap.set(targetObj, dateCopy);
    return dateCopy;
  }
  if (target instanceof RegExp) {
    const regexCopy = new RegExp(target.source, target.flags);
    visitedMap.set(targetObj, regexCopy);
    return regexCopy;
  }
  if (target instanceof Error) {
    const ErrorConstructor = target.constructor;
    const errorCopy = new ErrorConstructor(target.message);
    const errorInstance = errorCopy;
    if (target.stack) {
      errorInstance.stack = target.stack;
    }
    if (target.name) {
      errorInstance.name = target.name;
    }
    visitedMap.set(targetObj, errorCopy);
    return errorCopy;
  }
  if (target instanceof ArrayBuffer) {
    const bufferCopy = target.slice(0);
    visitedMap.set(targetObj, bufferCopy);
    return bufferCopy;
  }
  if (ArrayBuffer.isView(target) && !(target instanceof DataView)) {
    const TypedArrayConstructor = target.constructor;
    const typedArrayTarget = target;
    const bufferCopy = typedArrayTarget.buffer.slice(0);
    const typedArrayCopy = new TypedArrayConstructor(bufferCopy);
    visitedMap.set(targetObj, typedArrayCopy);
    return typedArrayCopy;
  }
  if (target instanceof DataView) {
    const bufferCopy = target.buffer.slice(0);
    const dataViewCopy = new DataView(bufferCopy, target.byteOffset, target.byteLength);
    visitedMap.set(targetObj, dataViewCopy);
    return dataViewCopy;
  }
  if (Array.isArray(target)) {
    const arrayCopy = [];
    visitedMap.set(targetObj, arrayCopy);
    for (let i = 0; i < target.length; i++) {
      arrayCopy[i] = deepCopy(target[i], visitedMap);
    }
    return arrayCopy;
  }
  if (target instanceof Map) {
    const mapCopy = /* @__PURE__ */ new Map();
    visitedMap.set(targetObj, mapCopy);
    for (const [key, value] of target.entries()) {
      mapCopy.set(deepCopy(key, visitedMap), deepCopy(value, visitedMap));
    }
    return mapCopy;
  }
  if (target instanceof Set) {
    const setCopy = /* @__PURE__ */ new Set();
    visitedMap.set(targetObj, setCopy);
    for (const value of target.values()) {
      setCopy.add(deepCopy(value, visitedMap));
    }
    return setCopy;
  }
  if (target instanceof WeakMap) {
    const weakMapCopy = /* @__PURE__ */ new WeakMap();
    visitedMap.set(targetObj, weakMapCopy);
    return weakMapCopy;
  }
  if (target instanceof WeakSet) {
    const weakSetCopy = /* @__PURE__ */ new WeakSet();
    visitedMap.set(targetObj, weakSetCopy);
    return weakSetCopy;
  }
  const copy = Object.create(Object.getPrototypeOf(targetObj));
  visitedMap.set(targetObj, copy);
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      ;
      copy[key] = deepCopy(
        target[key],
        visitedMap
      );
    }
  }
  const propertyDescriptors = Object.getOwnPropertyDescriptors(target);
  for (const key of Object.keys(propertyDescriptors)) {
    const descriptor = propertyDescriptors[key];
    if (!descriptor.enumerable && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      Object.defineProperty(copy, key, __spreadProps(__spreadValues({}, descriptor), {
        value: deepCopy(descriptor.value, visitedMap)
      }));
    }
  }
  const symbolKeys = Object.getOwnPropertySymbols(target);
  for (const symbolKey of symbolKeys) {
    const descriptor = Object.getOwnPropertyDescriptor(target, symbolKey);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      Object.defineProperty(copy, symbolKey, __spreadProps(__spreadValues({}, descriptor), {
        value: deepCopy(descriptor.value, visitedMap)
      }));
    }
  }
  return copy;
};
var isDeepCopyable = (value) => {
  if (value === null || value === void 0) return true;
  const valueType = typeof value;
  if (valueType !== "object" && valueType !== "function") return true;
  if (valueType === "function") return false;
  if (typeof Element !== "undefined" && value instanceof Element) return false;
  if (typeof Node !== "undefined" && value instanceof Node) return false;
  if (typeof Window !== "undefined" && value instanceof Window) return false;
  return true;
};
var deepCopyStrict = (target) => {
  const checkCopyable = (value, path = "root") => {
    if (!isDeepCopyable(value)) {
      throw new Error(`Non-copyable value found at path: ${path}`);
    }
    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          checkCopyable(value[index], `${path}[${index}]`);
        }
      } else if (value instanceof Map) {
        let index = 0;
        for (const [key, val] of value.entries()) {
          checkCopyable(key, `${path}.keys[${index}]`);
          checkCopyable(val, `${path}.values[${index}]`);
          index++;
        }
      } else if (value instanceof Set) {
        let index = 0;
        for (const val of value.values()) {
          checkCopyable(val, `${path}.values[${index}]`);
          index++;
        }
      } else {
        for (const [key, val] of Object.entries(value)) {
          checkCopyable(val, `${path}.${key}`);
        }
      }
    }
  };
  checkCopyable(target);
  return deepCopy(target);
};

// src/libs/getConcurrentValue.ts
var getConcurrentValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = now.getUTCMilliseconds().toString().padStart(3, "0");
  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return `${dateTimeString}_${milliseconds}`;
};
var getConcurrentDateTimeValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return `${dateTimeString}`;
};
var getConcurrentDateHourValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}_${hours}`;
  return `${dateTimeString}`;
};
var getConcurrentDateValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}`;
  return `${dateTimeString}`;
};

// src/libs/isValidDateTime.ts
var isValidDateTime = (input) => {
  if (input === void 0 || input === null) {
    return true;
  }
  try {
    let dateObj;
    if (input instanceof Date) {
      dateObj = new Date(input.getTime());
    } else if (typeof input === "number") {
      dateObj = new Date(input);
    } else if (typeof input === "string") {
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        return false;
      }
      const dashDatePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
      const slashDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
      const hasDash = trimmedInput.includes("-");
      const hasSlash = trimmedInput.includes("/");
      const hasConsistentSeparator = !(hasDash && hasSlash);
      if (!hasConsistentSeparator) {
        return false;
      }
      const incompletePatterns = [
        /^\d{4}$/,
        // Just year: "2024"
        /^\d{4}[-/]\d{1,2}$/,
        // Year-month: "2024-08" or "2024/08"
        /^\d{1,2}[-/]\d{1,2}$/
        // Month-day: "08-21" or "08/21"
      ];
      if (incompletePatterns.some((pattern) => pattern.test(trimmedInput))) {
        return false;
      }
      const invalidSeparatorPattern = /^\d{4}[._]\d{1,2}[._]\d{1,2}$/;
      if (invalidSeparatorPattern.test(trimmedInput)) {
        return false;
      }
      const datetimePattern = /^\d{4}-\d{1,2}-\d{1,2}[T ]\d{1,2}:\d{1,2}:\d{1,2}/;
      if (datetimePattern.test(trimmedInput)) {
        const timeMatch = trimmedInput.match(/[T ](\d{1,2}):(\d{1,2}):(\d{1,2})/);
        if (timeMatch) {
          const hours = Number.parseInt(timeMatch[1], 10);
          const minutes = Number.parseInt(timeMatch[2], 10);
          const seconds = Number.parseInt(timeMatch[3], 10);
          if (hours >= 24 || minutes >= 60 || seconds >= 60) {
            return false;
          }
        }
      }
      if (dashDatePattern.test(trimmedInput)) {
        const parts = trimmedInput.split("-");
        const year = Number.parseInt(parts[0], 10);
        const month = Number.parseInt(parts[1], 10);
        const day = Number.parseInt(parts[2], 10);
        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        dateObj = /* @__PURE__ */ new Date(`${normalizedDate}T00:00:00`);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
          return false;
        }
      } else if (slashDatePattern.test(trimmedInput)) {
        const parts = trimmedInput.split("/");
        const year = Number.parseInt(parts[0], 10);
        const month = Number.parseInt(parts[1], 10);
        const day = Number.parseInt(parts[2], 10);
        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        dateObj = /* @__PURE__ */ new Date(`${normalizedDate}T00:00:00`);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
          return false;
        }
      } else {
        dateObj = new Date(trimmedInput);
      }
    } else {
      return false;
    }
    return !Number.isNaN(dateObj.getTime());
  } catch (error) {
    return false;
  }
};

// src/libs/isValidDate.ts
var isValidDate = (input) => {
  return isValidDateTime(input);
};

// src/libs/parseDateTime.ts
var parseDateTime = (input) => {
  if (input instanceof Date) {
    return input;
  }
  let dateStr = typeof input === "number" ? input.toString() : input;
  if (typeof input === "string") {
    dateStr = dateStr.replace(/[^0-9]/g, "");
  }
  if (!dateStr) {
    throw new Error("Invalid date format: no numbers found");
  }
  switch (dateStr.length) {
    case 4: {
      const year = Number.parseInt(dateStr, 10);
      return new Date(year, 0, 1, 0, 0, 0, 0);
    }
    case 6: {
      const yearMonth = dateStr;
      const year6 = Number.parseInt(yearMonth.substring(0, 4), 10);
      const month6 = Number.parseInt(yearMonth.substring(4, 6), 10);
      return new Date(year6, month6 - 1, 1, 0, 0, 0, 0);
    }
    case 8: {
      const yearMonthDay = dateStr;
      const year8 = Number.parseInt(yearMonthDay.substring(0, 4), 10);
      const month8 = Number.parseInt(yearMonthDay.substring(4, 6), 10);
      const day8 = Number.parseInt(yearMonthDay.substring(6, 8), 10);
      return new Date(year8, month8 - 1, day8, 0, 0, 0, 0);
    }
    case 10: {
      const year10 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month10 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day10 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour10 = Number.parseInt(dateStr.substring(8, 10), 10);
      return new Date(year10, month10 - 1, day10, hour10, 0, 0, 0);
    }
    case 12: {
      const year12 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month12 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day12 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour12 = Number.parseInt(dateStr.substring(8, 10), 10);
      const minute12 = Number.parseInt(dateStr.substring(10, 12), 10);
      return new Date(year12, month12 - 1, day12, hour12, minute12, 0, 0);
    }
    case 14: {
      const year14 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month14 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day14 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour14 = Number.parseInt(dateStr.substring(8, 10), 10);
      const minute14 = Number.parseInt(dateStr.substring(10, 12), 10);
      const second14 = Number.parseInt(dateStr.substring(12, 14), 10);
      return new Date(year14, month14 - 1, day14, hour14, minute14, second14, 0);
    }
    default:
      throw new Error(`Unsupported date format: ${dateStr}`);
  }
};

// src/libs/truncString.ts
var truncString = (str, length, padString = "_") => {
  if (typeof str !== "string") {
    throw new Error("First parameter must be a string.");
  }
  if (length !== void 0 && typeof length !== "number") {
    throw new Error("Length must be a number.");
  }
  console.log(padString);
  if (typeof padString !== "string" || padString.length === 0 || padString === void 0 || padString === null) {
    throw new Error("Padding string must be a string. It cannot be an empty string.");
  }
  if (padString === "") {
    throw new Error("Padding string cannot be an empty string.");
  }
  if (length === void 0 || length === 0) {
    return str;
  }
  if (length < 0) {
    const absLength = Math.abs(length);
    if (absLength >= str.length) {
      return "";
    }
    return str.slice(0, str.length - absLength);
  }
  if (str.length > length) {
    return str.slice(0, length);
  } else if (str.length < length) {
    const paddingNeeded = length - str.length;
    const fullPadding = padString.repeat(Math.ceil(paddingNeeded / padString.length));
    return str + fullPadding.slice(0, paddingNeeded);
  } else {
    return str;
  }
};

// src/libs/isEmpty.ts
var checkIsEmpty = (value) => {
  if (value === null || value === void 0) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim() === "";
  }
  if (typeof value === "number") {
    return Number.isNaN(value);
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map) {
    return value.size === 0;
  }
  if (value instanceof Set) {
    return value.size === 0;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime());
  }
  if (typeof value === "object" && value.constructor === Object) {
    return Object.keys(value).length === 0;
  }
  return false;
};
var isEmpty = (value) => {
  return checkIsEmpty(value);
};
var isNotEmpty = (value) => {
  return !checkIsEmpty(value);
};
var setZeroIfEmpty = (value) => {
  return checkIsEmpty(value) ? 0 : value;
};
var setOneIfEmpty = (value) => {
  return checkIsEmpty(value) ? 1 : value;
};
var setDefaultIfEmpty = (value, defaultValue) => {
  return checkIsEmpty(value) ? defaultValue : value;
};
var isNotEmptyGuard = (value) => {
  return !checkIsEmpty(value);
};

// src/libs/isEqual.ts
var isString = (value) => {
  return typeof value === "string";
};
var isNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};
var isFiniteNumber = (value) => {
  return typeof value === "number" && Number.isFinite(value);
};
var isInteger = (value) => {
  return typeof value === "number" && Number.isInteger(value);
};
var isBoolean = (value) => {
  return typeof value === "boolean";
};
var isNull = (value) => {
  return value === null;
};
var isUndefined = (value) => {
  return value === void 0;
};
var isNullish = (value) => {
  return value === null || value === void 0;
};
var isArray = (value) => {
  return Array.isArray(value);
};
var isPlainObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && value.constructor === Object;
};
var isFunction = (value) => {
  return typeof value === "function";
};
var isDate = (value) => {
  return value instanceof Date;
};
var isEqualString = (input, target) => {
  return isString(input) && input === target;
};
var isEqualNumber = (input, target) => {
  return isNumber(input) && input === target;
};
var isEqualBoolean = (input, target) => {
  return isBoolean(input) && input === target;
};
var isNotEqualString = (input, target) => {
  return !isString(input) || input !== target;
};
var isNotEqualNumber = (input, target) => {
  return !isNumber(input) || input !== target;
};
var isEqual = (input, target) => {
  return isNotEmpty(input) && isNotEmpty(target) && input === target;
};
var isLooseEqual = (input, target) => {
  return input == target;
};
var isDeepEqual = (input, target) => {
  if (input === target) {
    return true;
  }
  if (isNullish(input) && isNullish(target)) {
    return input === target;
  }
  if (isNullish(input) || isNullish(target)) {
    return false;
  }
  if (typeof input !== typeof target) {
    return false;
  }
  if (isArray(input) && isArray(target)) {
    if (input.length !== target.length) {
      return false;
    }
    return input.every((item, index) => isDeepEqual(item, target[index]));
  }
  if (input instanceof Date && target instanceof Date) {
    return input.getTime() === target.getTime();
  }
  if (input instanceof RegExp && target instanceof RegExp) {
    return input.toString() === target.toString();
  }
  if (isPlainObject(input) && isPlainObject(target)) {
    const inputKeys = Object.keys(input);
    const targetKeys = Object.keys(target);
    if (inputKeys.length !== targetKeys.length) {
      return false;
    }
    return inputKeys.every(
      (key) => targetKeys.includes(key) && isDeepEqual(input[key], target[key])
    );
  }
  return input === target;
};
var isOneOf = (value, options) => {
  return options.includes(value);
};
var isInRange = (value, min, max) => {
  return isNumber(value) && value >= min && value <= max;
};
var matchesPattern = (value, pattern) => {
  if (!isString(value)) {
    return false;
  }
  if (pattern instanceof RegExp) {
    return pattern.test(value);
  }
  return value.includes(pattern);
};
var hasProperty = (value, property) => {
  return typeof value === "object" && value !== null && property in value;
};
var hasMethod = (value, methodName) => {
  return hasProperty(value, methodName) && isFunction(value[methodName]);
};
var createInstanceGuard = (constructor) => {
  return (value) => {
    return value instanceof constructor;
  };
};

// src/libs/lottery.ts
var isValidProbabilityInput = (probability, outOf) => {
  if (!Number.isFinite(probability) || !Number.isFinite(outOf)) {
    return false;
  }
  if (probability < 0 || outOf <= 0) {
    return false;
  }
  if (probability > outOf) {
    return false;
  }
  return true;
};
var lottery = (probability = 1, outOf = 100) => {
  if (!isValidProbabilityInput(probability, outOf)) {
    return false;
  }
  const probabilityDecimal = probability / outOf;
  return Math.random() < probabilityDecimal;
};

// src/libs/numeric.ts
var getNumericCharacters = (inputString, options = {}) => {
  if (typeof inputString !== "string") {
    throw new TypeError("Input must be a string");
  }
  const { preserveOrder = true, removeDuplicates = false, maxLength } = options;
  let result = inputString.replace(/\D/g, "");
  if (removeDuplicates) {
    if (preserveOrder) {
      result = [...new Set(result)].join("");
    } else {
      result = Array.from(new Set(result)).sort().join("");
    }
  }
  if (maxLength !== void 0) {
    if (maxLength <= 0) {
      result = "";
    } else {
      result = result.slice(0, maxLength);
    }
  }
  return result;
};
var getAlphanumericCharacters = (inputString, options = {}) => {
  if (typeof inputString !== "string") {
    throw new TypeError("Input must be a string");
  }
  const { preserveOrder = true, removeDuplicates = false, maxLength } = options;
  let result = inputString.replace(/[^a-zA-Z0-9]/g, "");
  if (removeDuplicates) {
    if (preserveOrder) {
      result = [...new Set(result)].join("");
    } else {
      result = Array.from(new Set(result)).sort().join("");
    }
  }
  if (maxLength !== void 0 && maxLength > 0) {
    result = result.slice(0, maxLength);
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInstanceGuard,
  deepCopy,
  deepCopyStrict,
  getAlphanumericCharacters,
  getConcurrentDateHourValue,
  getConcurrentDateTimeValue,
  getConcurrentDateValue,
  getConcurrentValue,
  getNumericCharacters,
  hasMethod,
  hasProperty,
  isArray,
  isBoolean,
  isDate,
  isDeepCopyable,
  isDeepEqual,
  isEmpty,
  isEqual,
  isEqualBoolean,
  isEqualNumber,
  isEqualString,
  isFiniteNumber,
  isFunction,
  isInRange,
  isInteger,
  isLooseEqual,
  isNotEmpty,
  isNotEmptyGuard,
  isNotEqualNumber,
  isNotEqualString,
  isNull,
  isNullish,
  isNumber,
  isOneOf,
  isPlainObject,
  isString,
  isUndefined,
  isValidDate,
  isValidProbabilityInput,
  lottery,
  matchesPattern,
  parseDateTime,
  setDefaultIfEmpty,
  setOneIfEmpty,
  setZeroIfEmpty,
  truncString
});
