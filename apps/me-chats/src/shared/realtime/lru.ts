export class LruSet {
  private max: number;
  private map = new Map<string, true>();

  constructor(max = 1000) {
    this.max = max;
  }

  has(id: string) {
    return this.map.has(id);
  }

  add(id: string) {
    if (this.map.has(id)) return;

    this.map.set(id, true);
    if (this.map.size > this.max) {
      const firstKey = this.map.keys().next().value as string | undefined;
      if (firstKey) this.map.delete(firstKey);
    }
  }
}
