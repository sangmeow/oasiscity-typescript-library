# DateTime Validator API Documentation

## `isValidDateTime`

Validates if the input is a valid date/time value.

### Signature

```typescript
function isValidDateTime(input?: string | number | Date): boolean;
```

### Parameters

| Parameter | Type                       | Optional | Description                                                      |
| --------- | -------------------------- | -------- | ---------------------------------------------------------------- |
| `input`   | `string \| number \| Date` | ✓        | The input value to validate. If omitted, uses current date/time. |

### Return Value

| Type      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| `boolean` | Returns `true` if the input is a valid date/time, `false` otherwise. |

### Supported Formats

#### ✅ Valid Formats

**Date Object**

- `new Date()`
- `new Date('2024-08-21')`

**Timestamp (Number)**

- `Date.now()`
- `1692633600000`

**String Formats**

- **ISO Date**: `'2024-08-21'`
- **ISO DateTime**: `'2024-08-21T14:30:00'`
- **Slash Format**: `'2024/08/21'`
- **Single Digit Support**: `'2024-8-21'`, `'2024/8/21'`

#### ❌ Invalid Formats

**Empty/Null Values**

- `''` (empty string)
- `null`

**Incomplete Dates**

- `'2024'` (year only)
- `'2024-08'` (year-month only)
- `'08-21'` (month-day only)

**Mixed Separators**

- `'2024-08/21'`
- `'2024/08-21'`

**Invalid Separators**

- `'2024.08.21'`
- `'2024_08_21'`

**Invalid Time Components**

- `'2024-08-21T25:30:00'` (hours > 23)
- `'2024-08-21T14:60:00'` (minutes > 59)
- `'2024-08-21T14:30:60'` (seconds > 59)

**Invalid Date Values**

- `'2024-02-30'` (February 30th doesn't exist)
- `'2024-13-01'` (13th month doesn't exist)
- `'invalid-date'`

### Usage Examples

```typescript
import { isValidDateTime } from "./datetime-validator";

// ✅ Valid cases
isValidDateTime(); // true (current date/time)
isValidDateTime("2024-08-21"); // true (date only, time defaults to 00:00:00)
isValidDateTime("2024-08-21T14:30:00"); // true (full date/time)
isValidDateTime("2024/08/21"); // true (slash format)
isValidDateTime("2024-8-21"); // true (single digit)
isValidDateTime(new Date()); // true (Date object)
isValidDateTime(Date.now()); // true (timestamp)

// ❌ Invalid cases
isValidDateTime("invalid-date"); // false (invalid format)
isValidDateTime(""); // false (empty string)
isValidDateTime("2024"); // false (incomplete date)
isValidDateTime("2024-13-01"); // false (invalid month)
isValidDateTime("2024-02-30"); // false (non-existent date)
isValidDateTime("2024-08/21"); // false (mixed separators)
isValidDateTime("2024.08.21"); // false (invalid separator)
isValidDateTime("2024-08-21T25:00:00"); // false (invalid time)
```

### Error Handling

The function uses internal try-catch blocks to handle all exceptions gracefully. It will never throw an error and will always return `false` for any problematic input.

### Special Behaviors

1. **Current Date/Time**: When no parameter is provided, it always returns `true`.

2. **Default Time**: When only a date is provided (e.g., `'2024-08-21'`), the time is automatically set to `00:00:00`.

3. **Strict Validation**: The function performs strict validation by checking if the created Date object matches the exact input values. For example, `'2024-02-30'` would automatically convert to `'2024-03-01'` in JavaScript, but this function treats it as invalid.

4. **Separator Consistency**: Date strings cannot mix dashes (`-`) and slashes (`/`) as separators.

### Performance Notes

- Uses regex pattern matching for fast format validation
- Date object creation only occurs for inputs that pass initial validation
- Memory-efficient validation process

### TypeScript Integration

This function is fully typed and provides excellent IntelliSense support in TypeScript environments. The return type is strictly `boolean`, making it perfect for use in conditional statements and type guards.

```typescript
// Type-safe usage example
const userInput: unknown = getUserInput();

if (typeof userInput === "string" && isValidDateTime(userInput)) {
  // userInput is now known to be a valid date string
  const date = new Date(userInput);
  // Safe to use date object
}
```
