import { parseDateTime } from "./parseDateTime";

describe("parseDateTime", () => {
  describe("Date input", () => {
    it("should return the same Date object when Date is passed", () => {
      const inputDate = new Date(2024, 2, 15, 14, 30, 45);
      const result = parseDateTime(inputDate);
      expect(result).toBe(inputDate);
    });
  });

  describe("Number input", () => {
    it("should parse 4-digit number as YYYY format", () => {
      const result = parseDateTime(2024);
      expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0, 0));
    });

    it("should parse 6-digit number as YYYYMM format", () => {
      const result = parseDateTime(202403);
      expect(result).toEqual(new Date(2024, 2, 1, 0, 0, 0, 0));
    });

    it("should parse 8-digit number as YYYYMMDD format", () => {
      const result = parseDateTime(20240315);
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should parse 14-digit number as YYYYMMDDHHMMSS format", () => {
      const result = parseDateTime(20240315143045);
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });
  });

  describe("String input - basic formats", () => {
    it("should parse YYYY format", () => {
      const result = parseDateTime("2024");
      expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0, 0));
    });

    it("should parse YYYYMM format", () => {
      const result = parseDateTime("202403");
      expect(result).toEqual(new Date(2024, 2, 1, 0, 0, 0, 0));
    });

    it("should parse YYYYMMDD format", () => {
      const result = parseDateTime("20240315");
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should parse YYYYMMDDHH format", () => {
      const result = parseDateTime("2024031514");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 0, 0, 0));
    });

    it("should parse YYYYMMDDHHMM format", () => {
      const result = parseDateTime("202403151430");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 0, 0));
    });

    it("should parse YYYYMMDDHHMMSS format", () => {
      const result = parseDateTime("20240315143045");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });
  });

  describe("String input - with special characters", () => {
    it("should parse date with hyphens", () => {
      const result = parseDateTime("2024-03-15");
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should parse date with slashes", () => {
      const result = parseDateTime("2024/03/15");
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should parse date with dots", () => {
      const result = parseDateTime("2024.03.15");
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should parse datetime with spaces and colons", () => {
      const result = parseDateTime("2024-03-15 14:30:45");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });

    it("should parse ISO-like format with T", () => {
      const result = parseDateTime("2024-03-15T14:30:45");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });

    it("should parse date with Korean characters", () => {
      const result = parseDateTime("2024년 03월 15일 14시 30분 45초");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });

    it("should parse mixed special characters", () => {
      const result = parseDateTime("2024.03/15-14:30");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 0, 0));
    });

    it("should parse with extra spaces and tabs", () => {
      const result = parseDateTime("  2024  03  15  14  30  45  ");
      expect(result).toEqual(new Date(2024, 2, 15, 14, 30, 45, 0));
    });
  });

  describe("Edge cases", () => {
    it("should handle February 29th in leap year", () => {
      const result = parseDateTime("20240229");
      expect(result).toEqual(new Date(2024, 1, 29, 0, 0, 0, 0));
    });

    it("should handle December 31st", () => {
      const result = parseDateTime("20241231");
      expect(result).toEqual(new Date(2024, 11, 31, 0, 0, 0, 0));
    });

    it("should handle midnight time", () => {
      const result = parseDateTime("20240315000000");
      expect(result).toEqual(new Date(2024, 2, 15, 0, 0, 0, 0));
    });

    it("should handle end of day time", () => {
      const result = parseDateTime("20240315235959");
      expect(result).toEqual(new Date(2024, 2, 15, 23, 59, 59, 0));
    });
  });

  describe("Error cases", () => {
    it("should throw error for empty string", () => {
      expect(() => parseDateTime("")).toThrow("Invalid date format: no numbers found");
    });

    it("should throw error for string with no numbers", () => {
      expect(() => parseDateTime("abc-def-ghi")).toThrow("Invalid date format: no numbers found");
    });

    it("should throw error for unsupported format length", () => {
      expect(() => parseDateTime("20243")).toThrow("Unsupported date format: 20243");
    });

    it("should throw error for too long format", () => {
      expect(() => parseDateTime("202403151430456789")).toThrow(
        "Unsupported date format: 202403151430456789",
      );
    });

    it("should throw error for 1-digit input", () => {
      expect(() => parseDateTime("1")).toThrow("Unsupported date format: 1");
    });

    it("should throw error for 3-digit input", () => {
      expect(() => parseDateTime("202")).toThrow("Unsupported date format: 202");
    });

    it("should throw error for special characters only", () => {
      expect(() => parseDateTime("---///")).toThrow("Invalid date format: no numbers found");
    });
  });

  describe("Month validation (implicit)", () => {
    it("should handle month 01", () => {
      const result = parseDateTime("202401");
      expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0, 0));
    });

    it("should handle month 12", () => {
      const result = parseDateTime("202412");
      expect(result).toEqual(new Date(2024, 11, 1, 0, 0, 0, 0));
    });
  });

  describe("Year edge cases", () => {
    it("should handle year 1000", () => {
      const result = parseDateTime("1000");
      expect(result).toEqual(new Date(1000, 0, 1, 0, 0, 0, 0));
    });

    it("should handle year 9999", () => {
      const result = parseDateTime("9999");
      expect(result).toEqual(new Date(9999, 0, 1, 0, 0, 0, 0));
    });
  });
});
