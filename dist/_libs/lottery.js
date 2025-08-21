"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lottery = exports.isValidProbabilityInput = void 0;
/**
 * Validates probability input parameters
 *
 * @param probability - Number of successful outcomes
 * @param outOf - Total number of possible outcomes
 * @returns true if inputs are valid, false otherwise
 */
const isValidProbabilityInput = (probability, outOf) => {
    // Check for valid numbers
    if (!Number.isFinite(probability) || !Number.isFinite(outOf)) {
        return false;
    }
    // Check for positive values
    if (probability < 0 || outOf <= 0) {
        return false;
    }
    // Probability cannot be greater than total outcomes
    if (probability > outOf) {
        return false;
    }
    return true;
};
exports.isValidProbabilityInput = isValidProbabilityInput;
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
const lottery = (probability = 1, outOf = 100) => {
    // Input validation
    if (!(0, exports.isValidProbabilityInput)(probability, outOf)) {
        return false;
    }
    // Calculate probability as a decimal (0-1)
    const probabilityDecimal = probability / outOf;
    // Generate random number and compare
    return Math.random() < probabilityDecimal;
};
exports.lottery = lottery;
//# sourceMappingURL=lottery.js.map