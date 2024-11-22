type dataTypes = string | number | boolean | null | undefined | JSONObject | JSONArray;
interface JSONObject {
    [x: string]: dataTypes | JSONObject | JSONArray;
}
interface JSONArray extends Array<dataTypes> {
}

export type { JSONArray, JSONObject, dataTypes };
