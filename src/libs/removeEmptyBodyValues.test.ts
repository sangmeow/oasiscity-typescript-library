import type { JSONObject } from "../interface/Json.interface";
import { removeEmptyBodyValues, removeEmptyNestedBodyValues } from "./removeEmptyBodyValues";

const testList: { title: string; input: JSONObject; output: JSONObject }[] = [
	{
		title: "TEST-001",
		input: {
			id: 1,
			name: 2,
			value1: "",
			value2: " ",
		},
		output: {
			id: 1,
			name: 2,
		},
	},
	{
		title: "TEST-002",
		input: {
			id: 1,
			name: 2,
			value1: null,
			value2: "meow",
		},
		output: {
			id: 1,
			name: 2,
			value2: "meow",
		},
	},
	{
		title: "TEST-***",
		input: {
			id: 1,
			name: 2,
			value1: null,
			value2: undefined,
		},
		output: {
			id: 1,
			name: 2,
		},
	},
];

describe("removeEmptyQuery :", () => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	testList.forEach((i) => {
		test(i.title, () => {
			expect(removeEmptyBodyValues(i.input)).toStrictEqual(i.output);
		});
	});
});

const testNestedObject: JSONObject = {
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

const outputNestedJson: JSONObject = {
	title: "TEST-001",
	input: {
		id: 1,
		name: "meow",
		value5: 0,
		value8: {
			value8Key: "value8value",
		},
		value9: ["SUN", "MOON", "EARTH"],
		value10: {
			id: 1,
			name: "meow",
			value5: 0,
			value8: {
				value8Key: "value8value",
			},
			value9: ["SUN", "MOON", "EARTH"],
			value10: {
				id: 1,
				name: "meow",
				value5: 0,
				value8: {
					value8Key: "value8value",
				},
				value9: ["SUN", "MOON", "EARTH"],
			},
		},
	},
	output: {
		id: 1,
		name: 2,
	},
};

describe("removeEmptyQuery :", () => {
	test("removeEmptyNestedBodyValues", () => {
		expect(removeEmptyNestedBodyValues(testNestedObject)).toStrictEqual(outputNestedJson);
	});
});
