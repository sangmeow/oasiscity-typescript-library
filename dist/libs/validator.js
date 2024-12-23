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

// src/libs/validator.ts
var validator_exports = {};
__export(validator_exports, {
  isAlphabeticOnly: () => isAlphabeticOnly,
  isNumAlphabeticOnly: () => isNumAlphabeticOnly,
  isNumericOnly: () => isNumericOnly,
  isObjectEmpty: () => isObjectEmpty
});
module.exports = __toCommonJS(validator_exports);

// src/libs/isEmpty.ts
var isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
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
  isAlphabeticOnly,
  isNumAlphabeticOnly,
  isNumericOnly,
  isObjectEmpty
});
