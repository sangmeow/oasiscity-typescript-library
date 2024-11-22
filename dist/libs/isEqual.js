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
  isBoolean: () => isBoolean,
  isEqual: () => isEqual,
  isEqualNumber: () => isEqualNumber,
  isEqualString: () => isEqualString,
  isNotEqualNumber: () => isNotEqualNumber,
  isNotEqualString: () => isNotEqualString,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isString: () => isString,
  isUndefined: () => isUndefined
});
module.exports = __toCommonJS(isEqual_exports);

// src/libs/isEmpty.ts
var isNotEmpty = (value) => {
  if (value === null || value === void 0) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) return false;
  return true;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isBoolean,
  isEqual,
  isEqualNumber,
  isEqualString,
  isNotEqualNumber,
  isNotEqualString,
  isNull,
  isNumber,
  isString,
  isUndefined
});
