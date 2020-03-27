export function chunk<T>(array: T[], length: number): T[][] {
  let chunks = [],
    i = 0,
    n = array.length;

  while (i < n) {
    chunks.push(array.slice(i, (i += length)));
  }

  return chunks;
}
