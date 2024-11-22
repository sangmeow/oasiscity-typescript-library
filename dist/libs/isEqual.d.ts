declare const isEqualString: (input: any, target: string) => boolean;
declare const isEqualNumber: (input: any, target: number) => boolean;
declare const isNotEqualString: (input: any, target: string) => boolean;
declare const isNotEqualNumber: (input: any, target: number) => boolean;
declare const isEqual: (input: any, target: any) => boolean;
declare const isString: (value: any) => boolean;
declare const isNumber: (value: any) => boolean;
declare const isBoolean: (value: any) => boolean;
declare const isNull: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;

export { isBoolean, isEqual, isEqualNumber, isEqualString, isNotEqualNumber, isNotEqualString, isNull, isNumber, isString, isUndefined };
