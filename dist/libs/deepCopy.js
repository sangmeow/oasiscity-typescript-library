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

// src/libs/deepCopy.ts
var deepCopy_exports = {};
__export(deepCopy_exports, {
  deepCopy: () => deepCopy,
  deepCopyStrict: () => deepCopyStrict,
  isDeepCopyable: () => isDeepCopyable
});
module.exports = __toCommonJS(deepCopy_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deepCopy,
  deepCopyStrict,
  isDeepCopyable
});
