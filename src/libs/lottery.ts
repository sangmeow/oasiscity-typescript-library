/**
 * Get probalility of
 * @param probability
 * @param outOf
 * @returns probability result
 */
export const lottery = (probability = 1, outOf = 100): boolean => {
	return probability <= 0 || outOf <= 0 ? false : Math.floor(Math.random() * (outOf - probability + 1) + probability) <= probability;
};
