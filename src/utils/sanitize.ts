import DOMPurify from "dompurify";

type Primitive = string | number | boolean | null | undefined;
type JsonValue = Primitive | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}

type JsonArray = JsonValue[];

/**
 * Recursively sanitizes strings in any deeply nested object or array.
 * Other types are left untouched.
 */
export function sanitizeDeep<T extends JsonValue>(input: T): T {
  if (typeof input === "string") {
    return DOMPurify.sanitize(input) as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeDeep(item)) as T;
  }

  if (typeof input === "object" && input !== null) {
    const result: Record<string, JsonValue> = {};
    for (const key in input) {
      result[key] = sanitizeDeep(input[key]);
    }
    return result as T;
  }

  return input;
}

export const sanitizeFlatStrings = <T extends Record<string, string>>(
  input: T
): Record<keyof T, string> => {
  const clean: Partial<Record<keyof T, string>> = {};

  for (const key in input) {
    clean[key] = DOMPurify.sanitize(input[key]);
  }

  return clean as Record<keyof T, string>;
};




// export const sanitizeFlatStrings = <T extends Record<string, string>>(input: T): { [K in keyof T]: string } => {
//   const clean = {} as { [K in keyof T]: string };
//   for (const key in input) {
//     clean[key] = DOMPurify.sanitize(input[key]);
//   }
//   return clean;
// };
