import { ScopedStorage } from './storage';
// import { Bubbles } from '../dynamic/utils-bubbles.js';

export class ScopedHistory<T extends string> {
  private storage: ScopedStorage<T>;
  index: number | null = null;
  private _list: string[];

  constructor(scope: T) {
    this.storage = new ScopedStorage(scope);
    this._list = JSON.parse(this.storage.get('history') || '[]');
  }

  add(command: string): void {
    this.list.unshift(command);
    this.store(this.list);
    this.reset();
  }

  next(): string {
    if (this.index === null) {
      this.index = 0;
    } else if (this.index >= this.list.length - 1) {
      this.index = this.list.length - 1;
      // Bubbles.Instance.add({
      //   message: `We've hit the edge of the universe, nothing to see here...`,
      // });
    } else {
      this.index = this.index + 1;
    }

    return this.list[this.index];
  }

  previous(): string | undefined {
    if (this.index === null || this.index <= -1) {
      this.index = -1;
      // Bubbles.Instance.add({
      //   message: `We'll you've got to start somewhere!`,
      // });
    } else {
      this.index = this.index - 1;
    }

    return this.list[this.index];
  }

  reset(): void {
    this.index = null;
  }

  clear(): void {
    this._list = [];
    this.store(this._list);
  }

  store(history: string[]): void {
    this.storage.set('history', JSON.stringify(history));
  }

  get list(): string[] {
    return this._list;
  }
}

export const History = new ScopedHistory('utils.rains.cafe');
