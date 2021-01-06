export default function uniqueItems<T = any>(items: Array<T>) {
  return Array.from(new Set(items));
}
