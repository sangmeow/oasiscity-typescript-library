"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  deepCopy: () => deepCopy,
  deepCopyStrict: () => deepCopyStrict,
  isDeepCopyable: () => isDeepCopyable,
  isValidDate: () => isValidDate,
  parseDateTime: () => parseDateTime
});
module.exports = __toCommonJS(src_exports);

// src/libs/deepCopy.ts
var deepCopy = (target, visited) => {
  const visitedMap = visited != null ? visited : /* @__PURE__ */ new WeakMap();
  if (target === null || target === void 0) {
    return target;
  }
  const targetType = typeof target;
  if (targetType !== "object" && targetType !== "function") {
    return target;
  }
  if (targetType === "function") {
    return target;
  }
  const targetObj = target;
  if (visitedMap.has(targetObj)) {
    return visitedMap.get(targetObj);
  }
  if (target instanceof Date) {
    const dateCopy = new Date(target.getTime());
    visitedMap.set(targetObj, dateCopy);
    return dateCopy;
  }
  if (target instanceof RegExp) {
    const regexCopy = new RegExp(target.source, target.flags);
    visitedMap.set(targetObj, regexCopy);
    return regexCopy;
  }
  if (target instanceof Error) {
    const ErrorConstructor = target.constructor;
    const errorCopy = new ErrorConstructor(target.message);
    const errorInstance = errorCopy;
    if (target.stack) {
      errorInstance.stack = target.stack;
    }
    if (target.name) {
      errorInstance.name = target.name;
    }
    visitedMap.set(targetObj, errorCopy);
    return errorCopy;
  }
  if (target instanceof ArrayBuffer) {
    const bufferCopy = target.slice(0);
    visitedMap.set(targetObj, bufferCopy);
    return bufferCopy;
  }
  if (ArrayBuffer.isView(target) && !(target instanceof DataView)) {
    const TypedArrayConstructor = target.constructor;
    const typedArrayTarget = target;
    const bufferCopy = typedArrayTarget.buffer.slice(0);
    const typedArrayCopy = new TypedArrayConstructor(bufferCopy);
    visitedMap.set(targetObj, typedArrayCopy);
    return typedArrayCopy;
  }
  if (target instanceof DataView) {
    const bufferCopy = target.buffer.slice(0);
    const dataViewCopy = new DataView(bufferCopy, target.byteOffset, target.byteLength);
    visitedMap.set(targetObj, dataViewCopy);
    return dataViewCopy;
  }
  if (Array.isArray(target)) {
    const arrayCopy = [];
    visitedMap.set(targetObj, arrayCopy);
    for (let i = 0; i < target.length; i++) {
      arrayCopy[i] = deepCopy(target[i], visitedMap);
    }
    return arrayCopy;
  }
  if (target instanceof Map) {
    const mapCopy = /* @__PURE__ */ new Map();
    visitedMap.set(targetObj, mapCopy);
    for (const [key, value] of target.entries()) {
      mapCopy.set(deepCopy(key, visitedMap), deepCopy(value, visitedMap));
    }
    return mapCopy;
  }
  if (target instanceof Set) {
    const setCopy = /* @__PURE__ */ new Set();
    visitedMap.set(targetObj, setCopy);
    for (const value of target.values()) {
      setCopy.add(deepCopy(value, visitedMap));
    }
    return setCopy;
  }
  if (target instanceof WeakMap) {
    const weakMapCopy = /* @__PURE__ */ new WeakMap();
    visitedMap.set(targetObj, weakMapCopy);
    return weakMapCopy;
  }
  if (target instanceof WeakSet) {
    const weakSetCopy = /* @__PURE__ */ new WeakSet();
    visitedMap.set(targetObj, weakSetCopy);
    return weakSetCopy;
  }
  const copy = Object.create(Object.getPrototypeOf(targetObj));
  visitedMap.set(targetObj, copy);
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      ;
      copy[key] = deepCopy(
        target[key],
        visitedMap
      );
    }
  }
  const propertyDescriptors = Object.getOwnPropertyDescriptors(target);
  for (const key of Object.keys(propertyDescriptors)) {
    const descriptor = propertyDescriptors[key];
    if (!descriptor.enumerable && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      Object.defineProperty(copy, key, __spreadProps(__spreadValues({}, descriptor), {
        value: deepCopy(descriptor.value, visitedMap)
      }));
    }
  }
  const symbolKeys = Object.getOwnPropertySymbols(target);
  for (const symbolKey of symbolKeys) {
    const descriptor = Object.getOwnPropertyDescriptor(target, symbolKey);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      Object.defineProperty(copy, symbolKey, __spreadProps(__spreadValues({}, descriptor), {
        value: deepCopy(descriptor.value, visitedMap)
      }));
    }
  }
  return copy;
};
var isDeepCopyable = (value) => {
  if (value === null || value === void 0) return true;
  const valueType = typeof value;
  if (valueType !== "object" && valueType !== "function") return true;
  if (valueType === "function") return false;
  if (typeof Element !== "undefined" && value instanceof Element) return false;
  if (typeof Node !== "undefined" && value instanceof Node) return false;
  if (typeof Window !== "undefined" && value instanceof Window) return false;
  return true;
};
var deepCopyStrict = (target) => {
  const checkCopyable = (value, path = "root") => {
    if (!isDeepCopyable(value)) {
      throw new Error(`Non-copyable value found at path: ${path}`);
    }
    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          checkCopyable(value[index], `${path}[${index}]`);
        }
      } else if (value instanceof Map) {
        let index = 0;
        for (const [key, val] of value.entries()) {
          checkCopyable(key, `${path}.keys[${index}]`);
          checkCopyable(val, `${path}.values[${index}]`);
          index++;
        }
      } else if (value instanceof Set) {
        let index = 0;
        for (const val of value.values()) {
          checkCopyable(val, `${path}.values[${index}]`);
          index++;
        }
      } else {
        for (const [key, val] of Object.entries(value)) {
          checkCopyable(val, `${path}.${key}`);
        }
      }
    }
  };
  checkCopyable(target);
  return deepCopy(target);
};

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

// src/libs/parseDateTime.ts
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
  deepCopy,
  deepCopyStrict,
  isDeepCopyable,
  isValidDate,
  parseDateTime
});
