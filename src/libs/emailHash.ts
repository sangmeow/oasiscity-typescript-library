/**
 * Generates a hash value from an email address by converting alphabetic characters
 * in the local part (before @) to numbers and calculating modulo 26.
 *
 * @param email - The email address to hash
 * @returns A number between 0-25 representing the hash value
 * @throws {Error} When email is not a valid string or format
 *
 * @example
 * ```typescript
 * emailHash('test@example.com'); // Returns hash based on 'test'
 * emailHash('abc@domain.org');   // a=0, b=1, c=2 → (0+1+2) % 26 = 3
 * ```
 */
export function emailHash(email: string): number {
  // Validate input parameter type and presence
  if (!email || typeof email !== 'string') {
    throw new Error('Email must be a non-empty string');
  }

  // Validate email format using regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Extract the local part (username) before the @ symbol
  const localPart = email.split('@')[0];

  // Calculate sum by converting each alphabetic character to its position (a=0, b=1, ..., z=25)
  let sum = 0;
  for (const char of localPart.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      // Convert character to number: 'a'=0, 'b'=1, ..., 'z'=25
      sum += char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
  }

  // Return the remainder when divided by 26 (0-25 range)
  return sum % 26;
}