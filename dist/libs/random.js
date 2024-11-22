"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomJsonArray = exports.randomJson = exports.randomObject = exports.randomArray = exports.randomDate = exports.randomBoolean = exports.randomString = exports.randomNumber = void 0;
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomNumber = randomNumber;
const randomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.randomString = randomString;
const randomBoolean = () => {
    return Math.random() < 0.5;
};
exports.randomBoolean = randomBoolean;
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
exports.randomDate = randomDate;
const randomArray = (length, callback) => {
    return Array.from({ length }, callback);
};
exports.randomArray = randomArray;
const randomObject = (length, callback) => {
    return Array.from({ length }, callback).reduce((acc, curr) => (Object.assign(Object.assign({}, acc), curr)), {});
};
exports.randomObject = randomObject;
const randomJson = (length) => {
    return (0, exports.randomObject)(length, () => {
        const key = (0, exports.randomString)(10);
        const value = (0, exports.randomBoolean)() ? (0, exports.randomString)(10) : (0, exports.randomJson)(3);
        return { [key]: value };
    });
};
exports.randomJson = randomJson;
const randomJsonArray = (length) => {
    return (0, exports.randomArray)(length, () => (0, exports.randomJson)(3));
};
exports.randomJsonArray = randomJsonArray;
//# sourceMappingURL=random.js.map