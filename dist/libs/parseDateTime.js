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

// src/libs/parseDateTime.ts
var parseDateTime_exports = {};
__export(parseDateTime_exports, {
  parseDateTime: () => parseDateTime
});
module.exports = __toCommonJS(parseDateTime_exports);
var parseDateTime = (input) => {
  if (input instanceof Date) {
    return input;
  }
  let dateStr = typeof input === "number" ? input.toString() : input;
  if (typeof input === "string") {
    dateStr = dateStr.replace(/[^0-9]/g, "");
  }
  if (!dateStr) {
    throw new Error("Invalid date format: no numbers found");
  }
  switch (dateStr.length) {
    case 4: {
      const year = Number.parseInt(dateStr, 10);
      return new Date(year, 0, 1, 0, 0, 0, 0);
    }
    case 6: {
      const yearMonth = dateStr;
      const year6 = Number.parseInt(yearMonth.substring(0, 4), 10);
      const month6 = Number.parseInt(yearMonth.substring(4, 6), 10);
      return new Date(year6, month6 - 1, 1, 0, 0, 0, 0);
    }
    case 8: {
      const yearMonthDay = dateStr;
      const year8 = Number.parseInt(yearMonthDay.substring(0, 4), 10);
      const month8 = Number.parseInt(yearMonthDay.substring(4, 6), 10);
      const day8 = Number.parseInt(yearMonthDay.substring(6, 8), 10);
      return new Date(year8, month8 - 1, day8, 0, 0, 0, 0);
    }
    case 10: {
      const year10 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month10 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day10 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour10 = Number.parseInt(dateStr.substring(8, 10), 10);
      return new Date(year10, month10 - 1, day10, hour10, 0, 0, 0);
    }
    case 12: {
      const year12 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month12 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day12 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour12 = Number.parseInt(dateStr.substring(8, 10), 10);
      const minute12 = Number.parseInt(dateStr.substring(10, 12), 10);
      return new Date(year12, month12 - 1, day12, hour12, minute12, 0, 0);
    }
    case 14: {
      const year14 = Number.parseInt(dateStr.substring(0, 4), 10);
      const month14 = Number.parseInt(dateStr.substring(4, 6), 10);
      const day14 = Number.parseInt(dateStr.substring(6, 8), 10);
      const hour14 = Number.parseInt(dateStr.substring(8, 10), 10);
      const minute14 = Number.parseInt(dateStr.substring(10, 12), 10);
      const second14 = Number.parseInt(dateStr.substring(12, 14), 10);
      return new Date(year14, month14 - 1, day14, hour14, minute14, second14, 0);
    }
    default:
      throw new Error(`Unsupported date format: ${dateStr}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseDateTime
});
