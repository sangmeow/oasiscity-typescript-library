export const randomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomeNumberWithPadZeros = (min: number, max: number, pad: number) => {
	const randomNumber: number = Math.floor(Math.random() * (max - min + 1) + min);
	return randomNumber.toString().padStart(pad, "0");
};

export const randomString = (length: number): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const randomStringNumber = (length: number): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const randomBoolean = (): boolean => {
	return Math.random() < 0.5;
};

export const randomDate = (start: Date, end: Date): Date => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
