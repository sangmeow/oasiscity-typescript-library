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
  setOneIfEmpty: () => setOneIfEmpty,
  setZeroIfEmpty: () => setZeroIfEmpty
});
module.exports = __toCommonJS(isEmpty_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEmpty,
  isNotEmpty,
  setOneIfEmpty,
  setZeroIfEmpty
});
