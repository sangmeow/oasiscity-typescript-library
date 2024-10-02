import { removeEmptyStringQueryParams } from "./removeEmptyQueryValues";

const testList: { title: string; input: string; output: string }[] = [
	{
		title: "TEST-001",
		input: "param1=value1&param2=value2&param3=value3&param4=value4",
		output: "param1=value1&param2=value2&param3=value3&param4=value4",
	},
	{
		title: "TEST-002",
		input: "param1&param2=&param3=value3&param4=value4",
		output: "param3=value3&param4=value4",
	},
	{
		title: "TEST-003",
		input: "param1=value1&param2&param3=value3&param4=",
		output: "param1=value1&param3=value3",
	},
	{
		title: "TEST-004",
		input: "param1=value1=1234&param2=&param3=value3&param4=",
		output: "param1=value1=1234&param3=value3",
	},
	{
		title: "TEST-***",
		input: "param1=value1&param2=value2&param3=value3&param4=value4",
		output: "param1=value1&param2=value2&param3=value3&param4=value4",
	},
];

describe("removeEmptyStringQueryParams :", () => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	testList.forEach((i) => {
		test(i.title, () => {
			expect(removeEmptyStringQueryParams(i.input)).toBe(i.output);
		});
	});
});
