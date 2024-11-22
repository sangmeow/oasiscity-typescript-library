/**
 * Get numeric characters from string
 * @param inputString
 * e.g. 'a1b2c3d4' -> '1234'
 */
declare const getNumericCharacters: (inputString: string) => string;
/**
 * Bind string
 * @param srcString
 * @param replaceString
 * e.g. input "19700101232221" and "20201212" results "20201212232221"
 */
declare const bindString: (srcString: string, replaceString: string) => string;

export { bindString, getNumericCharacters };
