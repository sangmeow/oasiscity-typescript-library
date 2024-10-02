import type { JSONObject } from "../interface/Json.interface";
import { removeEmptyBodyValues } from "./removeEmptyBodyValues";

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
