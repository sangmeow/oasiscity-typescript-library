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

// src/libs/isEmpty.ts
var isEmpty_exports = {};
__export(isEmpty_exports, {
  isEmpty: () => isEmpty,
  isNotEmpty: () => isNotEmpty,
  isNotEmptyGuard: () => isNotEmptyGuard,
  setDefaultIfEmpty: () => setDefaultIfEmpty,
  setOneIfEmpty: () => setOneIfEmpty,
  setZeroIfEmpty: () => setZeroIfEmpty
});
module.exports = __toCommonJS(isEmpty_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEmpty,
  isNotEmpty,
  isNotEmptyGuard,
  setDefaultIfEmpty,
  setOneIfEmpty,
  setZeroIfEmpty
});
