# parseDateTime API Documentation

## Overview

The `parseDateTime` function is a utility function that converts various types of date input values into JavaScript `Date` objects.

## Function Signature

```typescript
parseDateTime(input: string | number | Date): Date
```

## Parameters

### `input`

- **Type**: `string | number | Date`
- **Description**: Date input value to be converted
- **Required**: Yes

## Return Value

- **Type**: `Date`
- **Description**: Converted JavaScript Date object

## Supported Formats

The function supports the following date formats:

| Format           | Length    | Example          | Description                                        |
| ---------------- | --------- | ---------------- | -------------------------------------------------- |
| `YYYY`           | 4 digits  | `2024`           | January 1st of the specified year at 00:00:00      |
| `YYYYMM`         | 6 digits  | `202401`         | 1st day of the specified year-month at 00:00:00    |
| `YYYYMMDD`       | 8 digits  | `20240115`       | Specified year-month-day at 00:00:00               |
| `YYYYMMDDHH`     | 10 digits | `2024011515`     | Specified year-month-day-hour at 00:00             |
| `YYYYMMDDHHMM`   | 12 digits | `202401151530`   | Specified year-month-day-hour-minute at 00 seconds |
| `YYYYMMDDHHMMSS` | 14 digits | `20240115153045` | Specified year-month-day-hour-minute-second        |

## How It Works

1. **Date object input**: Returns as-is if already a Date object
2. **Number input**: Converts to string then processes
3. **String input**: Removes all non-numeric characters then processes
4. **Length-based parsing**: Parses according to the appropriate date format based on the numeric string length

## Usage Examples

```typescript
// Date object input
const date1 = parseDateTime(new Date("2024-01-15"));
// Returns: The input Date object as-is

// Number input
const date2 = parseDateTime(20240115);
// Returns: January 15, 2024 at 00:00:00

// String input (with special characters)
const date3 = parseDateTime("2024-01-15 15:30:45");
// Returns: January 15, 2024 at 15:30:45

// Various string lengths
const date4 = parseDateTime("2024"); // January 1, 2024 at 00:00:00
const date5 = parseDateTime("202401"); // January 1, 2024 at 00:00:00
const date6 = parseDateTime("20240115"); // January 15, 2024 at 00:00:00
const date7 = parseDateTime("2024011515"); // January 15, 2024 at 15:00:00
```

## Error Handling

The function throws an `Error` in the following cases:

### 1. Empty string or string with no numbers

```typescript
parseDateTime(""); // Error: "Invalid date format: no numbers found"
parseDateTime("abc"); // Error: "Invalid date format: no numbers found"
```

### 2. Unsupported string length

```typescript
parseDateTime("123"); // Error: "Unsupported date format: 123"
parseDateTime("12345"); // Error: "Unsupported date format: 12345"
parseDateTime("123456789"); // Error: "Unsupported date format: 123456789"
```

## Important Notes

- Month values start from 0 (following JavaScript Date object conventions)
- All non-numeric characters are automatically removed from input strings
- Missing time components default to 0
- Timezone is set to local time

## Use Cases

- Converting various date string formats to unified Date objects
- Parsing date data from API responses or user input
- Converting between legacy system date formats and modern JavaScript Date objects
