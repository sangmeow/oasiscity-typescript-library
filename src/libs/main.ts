import type { JSONObject } from "../interface/Json.interface";
import { removeEmptyNestedBodyValues } from "./removeEmptyBodyValues";

const testList: JSONObject = {
	title: "TEST-001",
	input: {
		id: 1,
		name: "meow",
		value1: "",
		value2: " ",
		value3: undefined,
		value4: null,
		value5: 0,
		value6: {},
		value7: [],
		value8: { value8Key: "value8value" },
		value9: ["SUN", "MOON", "EARTH"],
		value10: {
			id: 1,
			name: "meow",
			value1: "",
			value2: " ",
			value3: undefined,
			value4: null,
			value5: 0,
			value6: {},
			value7: [],
			value8: { value8Key: "value8value" },
			value9: ["SUN", "MOON", "EARTH"],
			value10: {
				id: 1,
				name: "meow",
				value1: "",
				value2: " ",
				value3: undefined,
				value4: null,
				value5: 0,
				value6: {},
				value7: [],
				value8: { value8Key: "value8value" },
				value9: ["SUN", "MOON", "EARTH"],
			},
		},
	},
	output: {
		id: 1,
		name: 2,
	},
};

console.log(JSON.stringify(removeEmptyNestedBodyValues(testList), null, 2));
