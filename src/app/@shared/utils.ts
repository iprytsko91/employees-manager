export function getStringArrayFromEnum<T>(enumObj: T): string[] {
  return Object.values(enumObj);
}
