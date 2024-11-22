/**
 * Get numeric characters from string
 * @param inputString
 * e.g. 'a1b2c3d4' -> '1234'
 */
export const getNumericCharacters = (inputString: string): string => {
	return inputString.replace(/\D/g, "");
};

/**
 * Bind string
 * @param srcString
 * @param replaceString
 * e.g. input "19700101232221" and "20201212" results "20201212232221"
 */
export const bindString = (srcString: string, replaceString: string): string => {
	const srcArray: string[] = srcString.split("");
	const replacementArray: string[] = replaceString.split("");
	for (let i = 0; i < replacementArray.length; i++) {
		srcArray[i] = replacementArray[i];
	}
	return srcArray.join("");
};
