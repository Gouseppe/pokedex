export function capitalize(string: string) {
  return string.replace(/^\w| \w/g, (char) => char.toUpperCase());
}
