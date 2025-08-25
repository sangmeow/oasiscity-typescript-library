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

// src/libs/lottery.ts
var lottery_exports = {};
__export(lottery_exports, {
  isValidProbabilityInput: () => isValidProbabilityInput,
  lottery: () => lottery
});
module.exports = __toCommonJS(lottery_exports);
var isValidProbabilityInput = (probability, outOf) => {
  if (!Number.isFinite(probability) || !Number.isFinite(outOf)) {
    return false;
  }
  if (probability < 0 || outOf <= 0) {
    return false;
  }
  if (probability > outOf) {
    return false;
  }
  return true;
};
var lottery = (probability = 1, outOf = 100) => {
  if (!isValidProbabilityInput(probability, outOf)) {
    return false;
  }
  const probabilityDecimal = probability / outOf;
  return Math.random() < probabilityDecimal;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidProbabilityInput,
  lottery
});
