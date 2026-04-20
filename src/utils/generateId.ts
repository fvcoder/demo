export function generateId(prefix: string = "id") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
