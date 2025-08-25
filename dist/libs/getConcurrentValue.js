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

// src/libs/getConcurrentValue.ts
var getConcurrentValue_exports = {};
__export(getConcurrentValue_exports, {
  getConcurrentDateHourValue: () => getConcurrentDateHourValue,
  getConcurrentDateTimeValue: () => getConcurrentDateTimeValue,
  getConcurrentDateValue: () => getConcurrentDateValue,
  getConcurrentValue: () => getConcurrentValue
});
module.exports = __toCommonJS(getConcurrentValue_exports);
var getConcurrentValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = now.getUTCMilliseconds().toString().padStart(3, "0");
  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return `${dateTimeString}_${milliseconds}`;
};
var getConcurrentDateTimeValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return `${dateTimeString}`;
};
var getConcurrentDateHourValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}_${hours}`;
  return `${dateTimeString}`;
};
var getConcurrentDateValue = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  const dateTimeString = `${year}${month}${day}`;
  return `${dateTimeString}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConcurrentDateHourValue,
  getConcurrentDateTimeValue,
  getConcurrentDateValue,
  getConcurrentValue
});
