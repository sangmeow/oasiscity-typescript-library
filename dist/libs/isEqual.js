"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/libs/isEqual.ts
var isEqual_exports = {};
__export(isEqual_exports, {
  createInstanceGuard: () => createInstanceGuard,
  hasMethod: () => hasMethod,
  hasProperty: () => hasProperty,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isDate: () => isDate,
  isDeepEqual: () => isDeepEqual,
  isEqual: () => isEqual,
  isEqualBoolean: () => isEqualBoolean,
  isEqualNumber: () => isEqualNumber,
  isEqualString: () => isEqualString,
  isFiniteNumber: () => isFiniteNumber,
  isFunction: () => isFunction,
  isInRange: () => isInRange,
  isInteger: () => isInteger,
  isLooseEqual: () => isLooseEqual,
  isNotEqualNumber: () => isNotEqualNumber,
  isNotEqualString: () => isNotEqualString,
  isNull: () => isNull,
  isNullish: () => isNullish,
  isNumber: () => isNumber,
  isOneOf: () => isOneOf,
  isPlainObject: () => isPlainObject,
  isString: () => isString,
  isUndefined: () => isUndefined,
  matchesPattern: () => matchesPattern
});
module.exports = __toCommonJS(isEqual_exports);

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
var isNotEmpty = (value) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInstanceGuard,
  hasMethod,
  hasProperty,
  isArray,
  isBoolean,
  isDate,
  isDeepEqual,
  isEqual,
  isEqualBoolean,
  isEqualNumber,
  isEqualString,
  isFiniteNumber,
  isFunction,
  isInRange,
  isInteger,
  isLooseEqual,
  isNotEqualNumber,
  isNotEqualString,
  isNull,
  isNullish,
  isNumber,
  isOneOf,
  isPlainObject,
  isString,
  isUndefined,
  matchesPattern
});
