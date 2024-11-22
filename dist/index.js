"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
  addDays: () => addDays,
  addHours: () => addHours,
  bindString: () => bindString,
  currentDatetimeFormat: () => currentDatetimeFormat,
  deepCopy: () => deepCopy,
  getDatetimeString: () => getDatetimeString,
  getDatetimeUtcDate: () => getDatetimeUtcDate,
  getDatetimeUtcString: () => getDatetimeUtcString,
  getNumericCharacters: () => getNumericCharacters,
  getTimezoneOffset: () => getTimezoneOffset,
  getTimezoneOffsetHour: () => getTimezoneOffsetHour,
  hasPassDatetime: () => hasPassDatetime,
  isAlphabeticOnly: () => isAlphabeticOnly,
  isBoolean: () => isBoolean,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isEqualNumber: () => isEqualNumber,
  isEqualString: () => isEqualString,
  isNotEmpty: () => isNotEmpty,
  isNotEqualNumber: () => isNotEqualNumber,
  isNotEqualString: () => isNotEqualString,
  isNull: () => isNull,
  isNumAlphabeticOnly: () => isNumAlphabeticOnly,
  isNumber: () => isNumber,
  isNumericOnly: () => isNumericOnly,
  isObjectEmpty: () => isObjectEmpty,
  isString: () => isString,
  isUndefined: () => isUndefined,
  isVaidDatetime: () => isVaidDatetime,
  isValidDate: () => isValidDate,
  isValidTime: () => isValidTime,
  lottery: () => lottery,
  randomBoolean: () => randomBoolean,
  randomDate: () => randomDate,
  randomNumber: () => randomNumber,
  randomString: () => randomString,
  randomStringNumber: () => randomStringNumber,
  randomeNumberWithPadZeros: () => randomeNumberWithPadZeros,
  removeEmptyBodyValues: () => removeEmptyBodyValues,
  removeEmptyNestedBodyValues: () => removeEmptyNestedBodyValues,
  removeEmptyStringQueryParams: () => removeEmptyStringQueryParams,
  removeEmptyUrlQueryParams: () => removeEmptyUrlQueryParams,
  setOneIfEmpty: () => setOneIfEmpty,
  setZeroIfEmpty: () => setZeroIfEmpty
});
module.exports = __toCommonJS(src_exports);

// src/libs/currentDatetimeFormat.ts
var currentDatetimeFormat = (date = /* @__PURE__ */ new Date()) => {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
var addDays = (date = /* @__PURE__ */ new Date(), days = 0) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
var addHours = (date = /* @__PURE__ */ new Date(), hours = 0) => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

// src/libs/deepCopy.ts
var deepCopy = (target) => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime());
  }
  if (Array.isArray(target)) {
    const cp = [];
    for (const v of target) {
      cp.push(v);
    }
    return cp.map((n) => deepCopy(n));
  }
  if (typeof target === "object" && target !== {}) {
    const cp = __spreadValues({}, target);
    for (const k of Object.keys(cp)) {
      cp[k] = deepCopy(cp[k]);
    }
    return cp;
  }
  return target;
};

// src/libs/isDatetimeString.ts
var isValidDate = (dateString) => {
  const regexDate = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2}$/;
  if (!regexDate.test(dateString)) return false;
  const [year, month, day] = dateString.split(/[-_.\\/]/).map(Number);
  if (year < 1e3 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= daysInMonth[month - 1];
};
var isValidTime = (timeString) => {
  const regexTime = /^\d{2}:\d{2}:\d{2,3}$/;
  if (!regexTime.test(timeString)) return false;
  const [hour, minute, second] = timeString.split(":").map(Number);
  if (!(hour >= 0 || hour <= 24)) return false;
  if (!(minute >= 0 && minute < 60)) return false;
  if (!(second >= 0 && second < 60)) return false;
  if (hour === 24 && (minute > 0 || second > 0)) return false;
  return true;
};
var isVaidDatetime = (datetime) => {
  const regexDatetime = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!regexDatetime.test(datetime)) return false;
  const [date, time] = datetime.split(" ").map(String);
  return isValidDate(date) && isValidTime(time);
};

// src/libs/hasPassDatetime.ts
var hasPassDatetime = (datetime) => {
  if (!(isValidDate(datetime) || isVaidDatetime(datetime))) return true;
  return new Date(datetime) <= /* @__PURE__ */ new Date();
};

// src/libs/isEmpty.ts
var isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};
var isNotEmpty = (value) => {
  if (value === null || value === void 0) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) return false;
  return true;
};
var setZeroIfEmpty = (value) => {
  if (value === null || value === void 0) return 0;
  if (typeof value === "string" && value.trim() === "") return 0;
  if (Array.isArray(value) && value.length === 0) return 0;
  if (typeof value === "object" && Object.keys(value).length === 0) return 0;
  return value;
};
var setOneIfEmpty = (value) => {
  if (value === null || value === void 0) return 1;
  if (typeof value === "string" && value.trim() === "") return 1;
  if (Array.isArray(value) && value.length === 0) return 1;
  if (typeof value === "object" && Object.keys(value).length === 0) return 1;
  return value;
};

// src/libs/isEqual.ts
var isEqualString = (input, target) => {
  return typeof input === "string" && input === target;
};
var isEqualNumber = (input, target) => {
  return typeof input === "number" && input === target;
};
var isNotEqualString = (input, target) => {
  return typeof input !== "string" || input !== target;
};
var isNotEqualNumber = (input, target) => {
  return typeof input !== "number" || input !== target;
};
var isEqual = (input, target) => {
  return isNotEmpty(input) && typeof input === typeof target && input === target;
};
var isString = (value) => {
  return typeof value === "string";
};
var isNumber = (value) => {
  return typeof value === "number";
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

// src/libs/lottery.ts
var lottery = (probability = 1, outOf = 100) => {
  return probability <= 0 || outOf <= 0 ? false : Math.floor(Math.random() * (outOf - probability + 1) + probability) <= probability;
};

// src/libs/numeric.ts
var getNumericCharacters = (inputString) => {
  return inputString.replace(/\D/g, "");
};
var bindString = (srcString, replaceString) => {
  const srcArray = srcString.split("");
  const replacementArray = replaceString.split("");
  for (let i = 0; i < replacementArray.length; i++) {
    srcArray[i] = replacementArray[i];
  }
  return srcArray.join("");
};

// src/libs/random.ts
var randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var randomeNumberWithPadZeros = (min, max, pad) => {
  const randomNumber2 = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber2.toString().padStart(pad, "0");
};
var randomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var randomStringNumber = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var randomBoolean = () => {
  return Math.random() < 0.5;
};
var randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// src/libs/removeEmptyBodyValues.ts
var removeEmptyBodyValues = (obj) => {
  const result = {};
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
var removeEmptyNestedBodyValues = (obj) => {
  const output = {};
  for (const key in obj) {
    const value = obj[key];
    if (isNotEmpty(value)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        output[key] = removeEmptyNestedBodyValues(value);
      } else {
        output[key] = value;
      }
    }
  }
  return output;
};

// src/libs/removeEmptyQueryValues.ts
var removeEmptyUrlQueryParams = (url) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  for (const [key, value] of params.entries()) {
    if (value.trim() === "") {
      params.delete(key);
    }
  }
  urlObj.search = params.toString();
  return urlObj.toString();
};
var removeEmptyStringQueryParams = (url) => {
  const keyValueString = url.replace(/\?s/gi, "").split("&");
  const KeyValueList = [];
  for (const i of keyValueString) {
    const value = i.split(/=/);
    if (value[0] && value[1]) KeyValueList.push(`${value[0]}=${value.slice(1).join("=")}`);
  }
  return KeyValueList.join("&");
};

// src/libs/utcDatetime.ts
var getTimezoneOffset = () => {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset();
};
var getTimezoneOffsetHour = () => {
  return getTimezoneOffset() / 60;
};
var getDatetimeUtcDate = () => {
  return /* @__PURE__ */ new Date();
};
var getDatetimeUtcString = () => {
  return (/* @__PURE__ */ new Date()).toISOString();
};
var getDatetimeString = () => {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/T/gi, " ").replace(/Z/gi, "");
};

// src/libs/validator.ts
var isObjectEmpty = (data, key) => {
  if (!(data == null ? void 0 : data.hasOwnProperty(key))) return true;
  return isEmpty(data[key]);
};
var isNumericOnly = (value) => {
  return /^\d+$/.test(value);
};
var isAlphabeticOnly = (value) => {
  return /^[a-zA-Z]+$/.test(value);
};
var isNumAlphabeticOnly = (value) => {
  return /^[a-zA-Z0-9]+$/.test(value);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addDays,
  addHours,
  bindString,
  currentDatetimeFormat,
  deepCopy,
  getDatetimeString,
  getDatetimeUtcDate,
  getDatetimeUtcString,
  getNumericCharacters,
  getTimezoneOffset,
  getTimezoneOffsetHour,
  hasPassDatetime,
  isAlphabeticOnly,
  isBoolean,
  isEmpty,
  isEqual,
  isEqualNumber,
  isEqualString,
  isNotEmpty,
  isNotEqualNumber,
  isNotEqualString,
  isNull,
  isNumAlphabeticOnly,
  isNumber,
  isNumericOnly,
  isObjectEmpty,
  isString,
  isUndefined,
  isVaidDatetime,
  isValidDate,
  isValidTime,
  lottery,
  randomBoolean,
  randomDate,
  randomNumber,
  randomString,
  randomStringNumber,
  randomeNumberWithPadZeros,
  removeEmptyBodyValues,
  removeEmptyNestedBodyValues,
  removeEmptyStringQueryParams,
  removeEmptyUrlQueryParams,
  setOneIfEmpty,
  setZeroIfEmpty
});
