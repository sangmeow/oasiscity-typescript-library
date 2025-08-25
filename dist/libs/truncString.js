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

// src/libs/truncString.ts
var truncString_exports = {};
__export(truncString_exports, {
  truncString: () => truncString
});
module.exports = __toCommonJS(truncString_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  truncString
});
