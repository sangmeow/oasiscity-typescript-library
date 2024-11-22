declare const isEmpty: (value: any) => boolean;
declare const isNotEmpty: (value: any) => boolean;
declare const setZeroIfEmpty: (value: any) => number | typeof value;
declare const setOneIfEmpty: (value: any) => number | typeof value;

export { isEmpty, isNotEmpty, setOneIfEmpty, setZeroIfEmpty };
