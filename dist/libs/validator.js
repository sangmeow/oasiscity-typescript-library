"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotEmpty = exports.isEmpty = exports.isObjectEmpty = void 0;
const isObjectEmpty = (data, key) => {
    if (!data.hasOwnProperty(key))
        return true;
    return (0, exports.isEmpty)(data[key]);
};
exports.isObjectEmpty = isObjectEmpty;
const isEmpty = (value) => {
    if (value === null || value === undefined)
        return true;
    if (typeof value === 'string' && value.trim() === '')
        return true;
    if (Array.isArray(value) && value.length === 0)
        return true;
    if (typeof value === 'object' && Object.keys(value).length === 0)
        return true;
    return false;
};
exports.isEmpty = isEmpty;
const isNotEmpty = (value) => {
    if (value === null || value === undefined)
        return false;
    if (typeof value === 'string' && value.trim() === '')
        return false;
    if (Array.isArray(value) && value.length === 0)
        return false;
    if (typeof value === 'object' && Object.keys(value).length === 0)
        return false;
    return true;
};
exports.isNotEmpty = isNotEmpty;
//# sourceMappingURL=validator.js.map