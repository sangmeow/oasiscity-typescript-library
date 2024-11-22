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

// src/libs/utcDatetime.ts
var utcDatetime_exports = {};
__export(utcDatetime_exports, {
  getDatetimeString: () => getDatetimeString,
  getDatetimeUtcDate: () => getDatetimeUtcDate,
  getDatetimeUtcString: () => getDatetimeUtcString,
  getTimezoneOffset: () => getTimezoneOffset,
  getTimezoneOffsetHour: () => getTimezoneOffsetHour
});
module.exports = __toCommonJS(utcDatetime_exports);
var getTimezoneOffset = () => {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset();
};
var getTimezoneOffsetHour = () => {
  return getTimezoneOffset() / 60;
};
var getDatetimeUtcDate = () => {
  return /* @__PURE__ */ new Date();
};
var getDatetimeUtcString = () => {
  return (/* @__PURE__ */ new Date()).toISOString();
};
var getDatetimeString = () => {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/T/gi, " ").replace(/Z/gi, "");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDatetimeString,
  getDatetimeUtcDate,
  getDatetimeUtcString,
  getTimezoneOffset,
  getTimezoneOffsetHour
});
