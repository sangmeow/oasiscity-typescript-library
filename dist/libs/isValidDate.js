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

// src/libs/isValidDate.ts
var isValidDate_exports = {};
__export(isValidDate_exports, {
  isValidDate: () => isValidDate
});
module.exports = __toCommonJS(isValidDate_exports);

// src/libs/isValidDateTime.ts
var isValidDateTime = (input) => {
  if (input === void 0 || input === null) {
    return true;
  }
  try {
    let dateObj;
    if (input instanceof Date) {
      dateObj = new Date(input.getTime());
    } else if (typeof input === "number") {
      dateObj = new Date(input);
    } else if (typeof input === "string") {
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        return false;
      }
      const dashDatePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
      const slashDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
      const hasDash = trimmedInput.includes("-");
      const hasSlash = trimmedInput.includes("/");
      const hasConsistentSeparator = !(hasDash && hasSlash);
      if (!hasConsistentSeparator) {
        return false;
      }
      const incompletePatterns = [
        /^\d{4}$/,
        // Just year: "2024"
        /^\d{4}[-/]\d{1,2}$/,
        // Year-month: "2024-08" or "2024/08"
        /^\d{1,2}[-/]\d{1,2}$/
        // Month-day: "08-21" or "08/21"
      ];
      if (incompletePatterns.some((pattern) => pattern.test(trimmedInput))) {
        return false;
      }
      const invalidSeparatorPattern = /^\d{4}[._]\d{1,2}[._]\d{1,2}$/;
      if (invalidSeparatorPattern.test(trimmedInput)) {
        return false;
      }
      const datetimePattern = /^\d{4}-\d{1,2}-\d{1,2}[T ]\d{1,2}:\d{1,2}:\d{1,2}/;
      if (datetimePattern.test(trimmedInput)) {
        const timeMatch = trimmedInput.match(/[T ](\d{1,2}):(\d{1,2}):(\d{1,2})/);
        if (timeMatch) {
          const hours = Number.parseInt(timeMatch[1], 10);
          const minutes = Number.parseInt(timeMatch[2], 10);
          const seconds = Number.parseInt(timeMatch[3], 10);
          if (hours >= 24 || minutes >= 60 || seconds >= 60) {
            return false;
          }
        }
      }
      if (dashDatePattern.test(trimmedInput)) {
        const parts = trimmedInput.split("-");
        const year = Number.parseInt(parts[0], 10);
        const month = Number.parseInt(parts[1], 10);
        const day = Number.parseInt(parts[2], 10);
        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        dateObj = /* @__PURE__ */ new Date(`${normalizedDate}T00:00:00`);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
          return false;
        }
      } else if (slashDatePattern.test(trimmedInput)) {
        const parts = trimmedInput.split("/");
        const year = Number.parseInt(parts[0], 10);
        const month = Number.parseInt(parts[1], 10);
        const day = Number.parseInt(parts[2], 10);
        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        dateObj = /* @__PURE__ */ new Date(`${normalizedDate}T00:00:00`);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
          return false;
        }
      } else {
        dateObj = new Date(trimmedInput);
      }
    } else {
      return false;
    }
    return !Number.isNaN(dateObj.getTime());
  } catch (error) {
    return false;
  }
};

// src/libs/isValidDate.ts
var isValidDate = (input) => {
  return isValidDateTime(input);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidDate
});
