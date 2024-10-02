/**
 * Removes keys with null, undefined, or empty string values from url string.
 * @param url string
 * @returns url string with empty string values removed
 */
export const removeEmptyUrlQueryParams = (url: string): string => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  for (const [key, value] of params.entries()) {
    if (value.trim() === "") {
      params.delete(key);
    }
  }

  urlObj.search = params.toString();

  return urlObj.toString();
};

export const removeEmptyStringQueryParams = (url: string): string => {
  // remove ? characters and whitespaces and split by & character
  const keyValueString: string[] = url.replace(/\?s/gi, "").split("&");
  const KeyValueList: string[] = [];
  keyValueString.forEach((i) => {
    const value: string[] = i.split(/=/);
    if (value[0] && value[1]) KeyValueList.push(`${value[0]}=${value.slice(1).join("=")}`);
  });
  return KeyValueList.join("&");
};
