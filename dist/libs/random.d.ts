declare const randomNumber: (min: number, max: number) => number;
declare const randomeNumberWithPadZeros: (min: number, max: number, pad: number) => string;
declare const randomString: (length: number) => string;
declare const randomStringNumber: (length: number) => string;
declare const randomBoolean: () => boolean;
declare const randomDate: (start: Date, end: Date) => Date;

export { randomBoolean, randomDate, randomNumber, randomString, randomStringNumber, randomeNumberWithPadZeros };
