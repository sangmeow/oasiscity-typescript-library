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

// src/libs/numeric.ts
var numeric_exports = {};
__export(numeric_exports, {
  getAlphanumericCharacters: () => getAlphanumericCharacters,
  getNumericCharacters: () => getNumericCharacters
});
module.exports = __toCommonJS(numeric_exports);
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
  getAlphanumericCharacters,
  getNumericCharacters
});
