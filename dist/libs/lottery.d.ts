/**
 * Validates probability input parameters
 *
 * @param probability - Number of successful outcomes
 * @param outOf - Total number of possible outcomes
 * @returns true if inputs are valid, false otherwise
 */
declare const isValidProbabilityInput: (probability: number, outOf: number) => boolean;
/**
 * Determines if a random event occurs based on probability
 *
 * @param probability - Number of successful outcomes (must be positive)
 * @param outOf - Total number of possible outcomes (must be positive and >= probability)
 * @returns true if the random event occurs, false otherwise
 *
 * @example
 * // 30% chance (30 out of 100)
 * lottery(30, 100) // returns boolean
 *
 * // 1 in 6 chance (like a dice roll)
 * lottery(1, 6) // returns boolean
 *
 * // 50% chance
 * lottery(1, 2) // returns boolean
 *
 * // Invalid inputs return false
 * lottery(-1, 100) // returns false
 * lottery(10, 5) // returns false (probability > outOf)
 */
declare const lottery: (probability?: number, outOf?: number) => boolean;

export { isValidProbabilityInput, lottery };
