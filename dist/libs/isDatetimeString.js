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

// src/libs/isDatetimeString.ts
var isDatetimeString_exports = {};
__export(isDatetimeString_exports, {
  isVaidDatetime: () => isVaidDatetime,
  isValidDate: () => isValidDate,
  isValidTime: () => isValidTime
});
module.exports = __toCommonJS(isDatetimeString_exports);
var isValidDate = (dateString) => {
  const regexDate = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2}$/;
  if (!regexDate.test(dateString)) return false;
  const [year, month, day] = dateString.split(/[-_.\\/]/).map(Number);
  if (year < 1e3 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= daysInMonth[month - 1];
};
var isValidTime = (timeString) => {
  const regexTime = /^\d{2}:\d{2}:\d{2,3}$/;
  if (!regexTime.test(timeString)) return false;
  const [hour, minute, second] = timeString.split(":").map(Number);
  if (!(hour >= 0 || hour <= 24)) return false;
  if (!(minute >= 0 && minute < 60)) return false;
  if (!(second >= 0 && second < 60)) return false;
  if (hour === 24 && (minute > 0 || second > 0)) return false;
  return true;
};
var isVaidDatetime = (datetime) => {
  const regexDatetime = /^\d{4}[-_.\\/]\d{2}[-_.\\/]\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!regexDatetime.test(datetime)) return false;
  const [date, time] = datetime.split(" ").map(String);
  return isValidDate(date) && isValidTime(time);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isVaidDatetime,
  isValidDate,
  isValidTime
});
