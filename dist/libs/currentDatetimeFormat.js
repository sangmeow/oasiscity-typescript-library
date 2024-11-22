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

// src/libs/currentDatetimeFormat.ts
var currentDatetimeFormat_exports = {};
__export(currentDatetimeFormat_exports, {
  addDays: () => addDays,
  addHours: () => addHours,
  currentDatetimeFormat: () => currentDatetimeFormat
});
module.exports = __toCommonJS(currentDatetimeFormat_exports);
var currentDatetimeFormat = (date = /* @__PURE__ */ new Date()) => {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
var addDays = (date = /* @__PURE__ */ new Date(), days = 0) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
var addHours = (date = /* @__PURE__ */ new Date(), hours = 0) => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addDays,
  addHours,
  currentDatetimeFormat
});
