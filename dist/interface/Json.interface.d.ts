export type dataTypes = string | number | boolean | null | undefined | JSONObject | JSONArray;
export interface JSONObject {
    [x: string]: dataTypes | JSONObject | JSONArray;
}
export interface JSONArray extends Array<dataTypes> {
}
//# sourceMappingURL=Json.interface.d.ts.map