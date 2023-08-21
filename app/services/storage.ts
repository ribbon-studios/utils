import { isNonNullable } from '../utils/guards';

export class ScopedStorage<T extends string> {
  private scope: T;

  constructor(scope: T) {
    this.scope = scope;
  }

  set(key: string, value?: string | null) {
    if (isNonNullable(value)) {
      localStorage.setItem(this.key(key), value);
    } else {
      localStorage.removeItem(this.key(key));
    }
  }

  get(key: string): string | null {
    return localStorage.getItem(this.key(key));
  }

  key<K extends string>(key: K): `${T}:${K}` {
    return `${this.scope}:${key}`;
  }
}
