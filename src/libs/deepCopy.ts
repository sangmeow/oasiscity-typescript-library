import type { JSONObject } from "../interface/Json.interface";

/**
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export const deepCopy = <T>(target: T): T => {
	if (target === null) {
		return target;
	}
	if (target instanceof Date) {
		return new Date(target.getTime()) as never;
	}
	if (Array.isArray(target)) {
		const cp = [] as never[];
		for (const v of target as never[]) {
			cp.push(v);
		}
		return cp.map((n: never) => deepCopy<never>(n)) as never;
	}
	if (typeof target === "object" && target !== ({} as JSONObject)) {
		const cp = { ...(target as { [key: string]: never }) } as { [key: string]: never };
		for (const k of Object.keys(cp)) {
			cp[k] = deepCopy<never>(cp[k]);
		}
		return cp as T;
	}
	return target;
};
