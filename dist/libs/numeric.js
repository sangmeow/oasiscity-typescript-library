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
  bindString: () => bindString,
  getNumericCharacters: () => getNumericCharacters
});
module.exports = __toCommonJS(numeric_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bindString,
  getNumericCharacters
});
