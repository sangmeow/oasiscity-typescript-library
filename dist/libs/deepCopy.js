"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

// src/libs/deepCopy.ts
var deepCopy_exports = {};
__export(deepCopy_exports, {
  deepCopy: () => deepCopy
});
module.exports = __toCommonJS(deepCopy_exports);
var deepCopy = (target) => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime());
  }
  if (Array.isArray(target)) {
    const cp = [];
    for (const v of target) {
      cp.push(v);
    }
    return cp.map((n) => deepCopy(n));
  }
  if (typeof target === "object" && target !== {}) {
    const cp = __spreadValues({}, target);
    for (const k of Object.keys(cp)) {
      cp[k] = deepCopy(cp[k]);
    }
    return cp;
  }
  return target;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deepCopy
});
