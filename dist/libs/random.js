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

// src/libs/random.ts
var random_exports = {};
__export(random_exports, {
  randomBoolean: () => randomBoolean,
  randomDate: () => randomDate,
  randomNumber: () => randomNumber,
  randomString: () => randomString,
  randomStringNumber: () => randomStringNumber,
  randomeNumberWithPadZeros: () => randomeNumberWithPadZeros
});
module.exports = __toCommonJS(random_exports);
var randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var randomeNumberWithPadZeros = (min, max, pad) => {
  const randomNumber2 = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber2.toString().padStart(pad, "0");
};
var randomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var randomStringNumber = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
var randomBoolean = () => {
  return Math.random() < 0.5;
};
var randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  randomBoolean,
  randomDate,
  randomNumber,
  randomString,
  randomStringNumber,
  randomeNumberWithPadZeros
});
