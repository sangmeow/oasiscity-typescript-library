import { isValidDateTime } from "./isValidDateTime"; // Adjust the import path as needed

describe("isValidDateTime", () => {
  describe("No input (undefined/null)", () => {
    it("should return true when no input is provided", () => {
      expect(isValidDateTime()).toBe(true);
    });

    it("should return true when undefined is provided", () => {
      expect(isValidDateTime(undefined)).toBe(true);
    });

    it("should return true when null is provided", () => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect(isValidDateTime(null as any)).toBe(true);
    });
  });

  describe("Date object input", () => {
    it("should return true for valid Date object", () => {
      const validDate = new Date("2024-08-21T14:30:00");
      expect(isValidDateTime(validDate)).toBe(true);
    });

    it("should return true for current Date object", () => {
      const now = new Date();
      expect(isValidDateTime(now)).toBe(true);
    });

    it("should return false for invalid Date object", () => {
      const invalidDate = new Date("invalid-date");
      expect(isValidDateTime(invalidDate)).toBe(false);
    });

    it("should return true for edge case dates", () => {
      const date1 = new Date("1970-01-01T00:00:00Z"); // Unix epoch
      const date2 = new Date("2038-01-19T03:14:07Z"); // Year 2038 problem
      expect(isValidDateTime(date1)).toBe(true);
      expect(isValidDateTime(date2)).toBe(true);
    });
  });

  describe("Number input (timestamp)", () => {
    it("should return true for valid timestamp", () => {
      const timestamp = Date.now();
      expect(isValidDateTime(timestamp)).toBe(true);
    });

    it("should return true for Unix epoch timestamp", () => {
      expect(isValidDateTime(0)).toBe(true);
    });

    it("should return true for positive timestamp", () => {
      expect(isValidDateTime(1692625800000)).toBe(true); // 2023-08-21T14:30:00Z
    });

    it("should return false for invalid timestamp", () => {
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      expect(isValidDateTime(NaN)).toBe(false);
    });

    it("should return false for extremely large number", () => {
      expect(isValidDateTime(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });
  });

  describe("String input - Date only formats", () => {
    it("should return true for YYYY-MM-DD format", () => {
      expect(isValidDateTime("2024-08-21")).toBe(true);
      expect(isValidDateTime("2024-01-01")).toBe(true);
      expect(isValidDateTime("2024-12-31")).toBe(true);
    });

    it("should return true for YYYY/MM/DD format", () => {
      expect(isValidDateTime("2024/08/21")).toBe(true);
      expect(isValidDateTime("2024/01/01")).toBe(true);
      expect(isValidDateTime("2024/12/31")).toBe(true);
    });

    it("should return true for single digit month/day", () => {
      expect(isValidDateTime("2024-8-21")).toBe(true);
      expect(isValidDateTime("2024/1/1")).toBe(true);
    });

    it("should return false for invalid date-only formats", () => {
      expect(isValidDateTime("24-08-21")).toBe(false); // Wrong year format
      expect(isValidDateTime("2024-13-01")).toBe(false); // Invalid month
      expect(isValidDateTime("2024-02-30")).toBe(false); // Invalid day for February
    });
  });

  describe("String input - Full datetime formats", () => {
    it("should return true for ISO format", () => {
      expect(isValidDateTime("2024-08-21T14:30:00")).toBe(true);
      expect(isValidDateTime("2024-08-21T00:00:00")).toBe(true);
      expect(isValidDateTime("2024-08-21T23:59:59")).toBe(true);
    });

    it("should return true for ISO format with timezone", () => {
      expect(isValidDateTime("2024-08-21T14:30:00Z")).toBe(true);
      expect(isValidDateTime("2024-08-21T14:30:00+09:00")).toBe(true);
      expect(isValidDateTime("2024-08-21T14:30:00-05:00")).toBe(true);
    });

    it("should return true for space-separated datetime", () => {
      expect(isValidDateTime("2024-08-21 14:30:00")).toBe(true);
      expect(isValidDateTime("2024/08/21 14:30:00")).toBe(true);
    });

    it("should return true for various valid datetime strings", () => {
      expect(isValidDateTime("Aug 21, 2024")).toBe(true);
      expect(isValidDateTime("August 21, 2024 14:30:00")).toBe(true);
      expect(isValidDateTime("21 Aug 2024")).toBe(true);
    });
  });

  describe("String input - Invalid formats", () => {
    it("should return false for empty string", () => {
      expect(isValidDateTime("")).toBe(false);
    });

    it("should return false for whitespace-only string", () => {
      expect(isValidDateTime("   ")).toBe(false);
      expect(isValidDateTime("\t\n")).toBe(false);
    });

    it("should return false for completely invalid strings", () => {
      expect(isValidDateTime("invalid-date")).toBe(false);
      expect(isValidDateTime("not-a-date")).toBe(false);
      expect(isValidDateTime("abc123")).toBe(false);
    });

    it("should return false for partial dates", () => {
      expect(isValidDateTime("2024")).toBe(false);
      expect(isValidDateTime("2024-08")).toBe(false);
      expect(isValidDateTime("08-21")).toBe(false);
    });

    it("should return false for invalid separators", () => {
      expect(isValidDateTime("2024.08.21")).toBe(false);
      expect(isValidDateTime("2024_08_21")).toBe(false);
    });
  });

  describe("Edge cases and error handling", () => {
    it("should return false for unsupported input types", () => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect(isValidDateTime(true as any)).toBe(false);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect(isValidDateTime(false as any)).toBe(false);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect(isValidDateTime({} as any)).toBe(false);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      expect(isValidDateTime([] as any)).toBe(false);
    });

    it("should handle leap year correctly", () => {
      expect(isValidDateTime("2024-02-29")).toBe(true); // 2024 is a leap year
      expect(isValidDateTime("2023-02-29")).toBe(false); // 2023 is not a leap year
    });

    it("should handle month boundaries correctly", () => {
      expect(isValidDateTime("2024-01-31")).toBe(true);
      expect(isValidDateTime("2024-04-31")).toBe(false); // April has only 30 days
      expect(isValidDateTime("2024-06-31")).toBe(false); // June has only 30 days
    });

    it("should handle time boundaries correctly", () => {
      expect(isValidDateTime("2024-08-21T23:59:59")).toBe(true);
      expect(isValidDateTime("2024-08-21T24:00:00")).toBe(false); // Invalid hour
      expect(isValidDateTime("2024-08-21T23:60:00")).toBe(false); // Invalid minute
      expect(isValidDateTime("2024-08-21T23:59:60")).toBe(false); // Invalid second
    });
  });

  describe("String trimming behavior", () => {
    it("should handle strings with leading/trailing whitespace", () => {
      expect(isValidDateTime("  2024-08-21  ")).toBe(true);
      expect(isValidDateTime("\t2024-08-21T14:30:00\n")).toBe(true);
      expect(isValidDateTime("  2024/08/21  ")).toBe(true);
    });

    it("should reject strings that are only whitespace after trimming", () => {
      expect(isValidDateTime("   ")).toBe(false);
      expect(isValidDateTime("\t\n\r")).toBe(false);
    });
  });
});
