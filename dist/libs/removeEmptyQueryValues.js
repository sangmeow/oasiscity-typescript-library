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

// src/libs/removeEmptyQueryValues.ts
var removeEmptyQueryValues_exports = {};
__export(removeEmptyQueryValues_exports, {
  removeEmptyStringQueryParams: () => removeEmptyStringQueryParams,
  removeEmptyUrlQueryParams: () => removeEmptyUrlQueryParams
});
module.exports = __toCommonJS(removeEmptyQueryValues_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeEmptyStringQueryParams,
  removeEmptyUrlQueryParams
});
