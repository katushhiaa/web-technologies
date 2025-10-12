export class StorageService {
  constructor(private readonly win: Window = window) {}

  save<T>(key: string, value: T): void {
    this.win.localStorage.setItem(key, JSON.stringify(value));
  }
  load<T>(key: string, fallback: T): T {
    const raw = this.win.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  }

  remove(key: string): void {
    this.win.localStorage.removeItem(key);
  }
  clearAll(): void {
    this.win.localStorage.clear();
  }
}
