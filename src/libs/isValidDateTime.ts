/**
 * Validates if the input is a valid date/time value
 * @param input - The input value to validate (string, number, or Date)
 * @returns true if the input is a valid date/time, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateTime(); // true (uses current date/time)
 * isValidDateTime('2024-08-21'); // true (date only, time defaults to 00:00:00)
 * isValidDateTime('2024-08-21T14:30:00'); // true (full date/time)
 * isValidDateTime(new Date()); // true (Date object)
 * isValidDateTime(Date.now()); // true (timestamp)
 * isValidDateTime('invalid-date'); // false (invalid format)
 * isValidDateTime(''); // false (empty string)
 * ```
 */
export const isValidDateTime = (input?: string | number | Date): boolean => {
  // If no input provided, use current date/time (always valid)
  if (input === undefined || input === null) {
    return true
  }

  try {
    let dateObj: Date

    if (input instanceof Date) {
      dateObj = new Date(input.getTime())
    } else if (typeof input === 'number') {
      dateObj = new Date(input)
    } else if (typeof input === 'string') {
      // Handle string input
      const trimmedInput = input.trim()

      // Check for empty string
      if (!trimmedInput) {
        return false
      }

      // Check if only date is provided - separate patterns for dash and slash
      const dashDatePattern = /^\d{4}-\d{1,2}-\d{1,2}$/
      const slashDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/

      // Check for consistent separator usage (no mixing - and /)
      const hasDash = trimmedInput.includes('-')
      const hasSlash = trimmedInput.includes('/')
      const hasConsistentSeparator = !(hasDash && hasSlash)

      // Reject mixed separators immediately
      if (!hasConsistentSeparator) {
        return false
      }

      // Check for incomplete date formats (year only, year-month only, etc.)
      const incompletePatterns = [
        /^\d{4}$/, // Just year: "2024"
        /^\d{4}[-/]\d{1,2}$/, // Year-month: "2024-08" or "2024/08"
        /^\d{1,2}[-/]\d{1,2}$/, // Month-day: "08-21" or "08/21"
      ]

      if (incompletePatterns.some((pattern) => pattern.test(trimmedInput))) {
        return false
      }

      // Check for invalid separators (dot, underscore, etc.)
      // Only allow dash, slash, or standard datetime formats
      const invalidSeparatorPattern = /^\d{4}[._]\d{1,2}[._]\d{1,2}$/
      if (invalidSeparatorPattern.test(trimmedInput)) {
        return false
      }

      // Check for datetime with invalid time components
      const datetimePattern = /^\d{4}-\d{1,2}-\d{1,2}[T ]\d{1,2}:\d{1,2}:\d{1,2}/
      if (datetimePattern.test(trimmedInput)) {
        // Extract time components for validation
        const timeMatch = trimmedInput.match(/[T ](\d{1,2}):(\d{1,2}):(\d{1,2})/)
        if (timeMatch) {
          const hours = Number.parseInt(timeMatch[1], 10)
          const minutes = Number.parseInt(timeMatch[2], 10)
          const seconds = Number.parseInt(timeMatch[3], 10)

          // Validate time ranges
          if (hours >= 24 || minutes >= 60 || seconds >= 60) {
            return false
          }
        }
      }

      if (dashDatePattern.test(trimmedInput)) {
        // Normalize dash format (pad single digits) and set time to 00:00:00
        const parts = trimmedInput.split('-')
        const year = Number.parseInt(parts[0], 10)
        const month = Number.parseInt(parts[1], 10)
        const day = Number.parseInt(parts[2], 10)

        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
        dateObj = new Date(`${normalizedDate}T00:00:00`)

        // Strict validation: check if the created date matches the input
        if (
          dateObj.getFullYear() !== year ||
          dateObj.getMonth() + 1 !== month ||
          dateObj.getDate() !== day
        ) {
          return false
        }
      } else if (slashDatePattern.test(trimmedInput)) {
        // Normalize slash format (pad single digits), convert to dash format and add time
        const parts = trimmedInput.split('/')
        const year = Number.parseInt(parts[0], 10)
        const month = Number.parseInt(parts[1], 10)
        const day = Number.parseInt(parts[2], 10)

        const normalizedDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
        dateObj = new Date(`${normalizedDate}T00:00:00`)

        // Strict validation: check if the created date matches the input
        if (
          dateObj.getFullYear() !== year ||
          dateObj.getMonth() + 1 !== month ||
          dateObj.getDate() !== day
        ) {
          return false
        }
      } else {
        dateObj = new Date(trimmedInput)
      }
    } else {
      return false
    }

    // Check for Invalid Date
    return !Number.isNaN(dateObj.getTime())
  } catch (error) {
    return false
  }
}
