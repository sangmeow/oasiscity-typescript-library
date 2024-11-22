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

// src/libs/removeEmptyBodyValues.ts
var removeEmptyBodyValues_exports = {};
__export(removeEmptyBodyValues_exports, {
  removeEmptyBodyValues: () => removeEmptyBodyValues,
  removeEmptyNestedBodyValues: () => removeEmptyNestedBodyValues
});
module.exports = __toCommonJS(removeEmptyBodyValues_exports);

// src/libs/isEmpty.ts
var isNotEmpty = (value) => {
  if (value === null || value === void 0) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) return false;
  return true;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeEmptyBodyValues,
  removeEmptyNestedBodyValues
});
