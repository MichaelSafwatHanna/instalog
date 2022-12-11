export class PageKeyConverter {
  constructor(public prefix: string) {}

  toKey(index: number): string {
    if (index < 0) throw new RangeError("Index must be zero or greater.");
    return `${this.prefix}${index}`;
  }

  toIndex(key: string): number {
    if (!key.startsWith(this.prefix))
      throw Error(`Key must start with prefix: "${this.prefix}".`);

    const index = key.replace(this.prefix, "");
    const parsedIndex = parseInt(index);

    if (isNaN(parsedIndex) || parsedIndex < 0)
      throw Error("Key does not contain a valid index.");

    return parsedIndex;
  }
}
